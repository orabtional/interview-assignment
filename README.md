# Todo Application

This is a simple todo application developed using TypeScript, MongoDB (using Prisma client), and Redux.

There are three main apps:
* Web
* Backend
* Database


The main commands to run the web app are:

`npm install`    # to install the dependencies

And

`npm start`      # to run the web server

The database app has a Docker that is configured with the required MongoDB settings. In order to start the docker, you will need:

`docker-compose up`

The main commands to start the server are:

`npm install`    # to install the dependencies

For the first time only, you need to run the following command to setup the database

`npx prisma generate`

After that, you can call
npm start      # to run the server