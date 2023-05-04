import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
    async createUser(username: string, password: string, email: string, firstName: string, lastName: string): Promise<User> {
        return prisma.user.create({
            data: {
                username,
                password,
                email,
                firstName,
                lastName,
            },
        });
    }

    async login(username: string, password: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (user && user.password === password) {
            return user;
        }

        return null;
    }
    async getAllUsers(): Promise<User[]> {
        return prisma.user.findMany();
    }

    async getUserById(id: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id },
        });
    }

    async updateUser(id: string, username: string, password: string, email: string, firstName: string, lastName: string): Promise<User> {
        return prisma.user.update({
            where: { id },
            data: {
                username,
                password,
                email,
                firstName,
                lastName,
            },
        });
    }

    async deleteUser(id: string): Promise<User> {
        return prisma.user.delete({
            where: { id },
        });
    }
}

export const userRepository = new UserRepository();