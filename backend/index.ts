import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import errorHandlerMiddleware from './middleware/errorHandler.middleware';
import taskListRoutes from './routes/taskList.routes';
import todoItemRoutes from './routes/todoItem.routes';
import userRoutes from "./routes/user.routes";

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;
export const API_VERSION = 'v1';


// Swagger configuration
const swaggerOptions: swaggerJsDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo App API',
            version: '1.0.0',
            description: 'A Todo App API',
        },
        servers: [{ url: `http://localhost:3005/api/${API_VERSION}` }],
    },
    apis: ['./routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(`/api/${API_VERSION}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use(`/api/${API_VERSION}/users`, userRoutes);
app.use(`/api/${API_VERSION}/tasklists`, taskListRoutes);
app.use(`/api/${API_VERSION}/todoitems`, todoItemRoutes);

app.get(`/api/${API_VERSION}/health`, (req, res) => {
    res.send('API is working');
});

app.use(errorHandlerMiddleware);

async function main() {
    try {
        await prisma.$connect();
        console.log('Connected to MongoDB via Prisma');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB via Prisma:', error);
        process.exit(1);
    }
}

main();

export default app;