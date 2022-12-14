# CS3219-AY22-23-Project

This document details how to set this repository up locally for development purposes.
Deployed application can be found [here](https://cs3219-g45-frontend-c7v7akrz2a-as.a.run.app)

## Prerequisites

In order to use the PeerPrep application locally, please ensure that you have your local MongoDB server running. It may also be helpful to have MongoDB compass installed. Once these steps are carried out, you can proceed.

## Getting Started

Clone the repo into your local environment. Each service is separated into its own sub-repository.
They are to be run seperately. Instructions on how to do this can be seen below. Before continuing,
ensure that you are in the root directory of the project. Before proceeding, run the following command:

```
$ npm i
```

## Building and Running in Parallel

This repository uses NX to allow parallel and building and running of all projects. In order to build all projects in parallel, navigate to the root of the project and execute the following command:

```
$ npm run build
```

If you intend to run the projects immediately, you may skip the command above and run the following command instead:

```
$ npm run start
```

This command runs the build step prior to starting all the projects. **Both of these commands also handle dependency installation.**

## Building and Running Individual Services

### User-Service

Before running the user-service, create a .env file in the root of the user-service and add the following lines:

```
DB_LOCAL_URI=mongodb://localhost/user_service
ENV=DEV
```

To run the user service, ensure you are in the root directory of the project and run the following commands sequentially:

```
$ cd user-service
$ npm i
```

This will install the necessary dependencies. Once that is done,
run the following command to start the user service:

```
$ npm run start
```

or start it in development mode:

```
$ npm run dev
```

To verify that the user service is running, go to the following address in your browser:

```
http://localhost:8000/api/user
```

You should see the following message:

```
Hello World from user-service
```

### Matching-Service

To run the matching service, ensure you are in the root directory of the project and run the follwing commands sequentially:

```
$ cd matching-service
$ npm i
```

This will install the necessary dependencies. Once that is done,
run the following command to start the matching service:

```
$ npm run start
```

or start it in development mode:

```
$ npm run dev
```

To verify that the user service is running, go to the following address in your browser:

```
http://localhost:8001/
```

You should see the following message:

```
Hello World from matching-service
```

### Communication-Service

To run the communication service, ensure you are in the root directory of the project and run the follwing commands sequentially:

```
$ cd communication-service
$ npm i
```

This will install the necessary dependencies. Once that is done,
run the following command to start the communication service:

```
$ npm run start
```

or start it in development mode:

```
$ npm run dev
```

To verify that the user service is running, go to the following address in your browser:

```
http://localhost:8002/
```

You should see the following message:

```
Hello World
```

### Question-Service

To run the question service, ensure you are in the root directory of the project and run the follwing commands sequentially:

```
$ cd question-service
$ npm i
```

This will install the necessary dependencies. Once that is done,
run the following command to start the question service:

```
$ npm run start
```

or start it in development mode:

```
$ npm run dev
```

To verify that the user service is running, go to the following address in your browser:

```
http://localhost:8004/
```

You should see the following message:

```
Hello World
```

**Note that Question-Service can only fetch questions from the production database.**
**Please use the deployed application to test this service.**

### Frontend

To run the matching service, ensure you are in the root directory of the project and run the follwing commands sequentially:

```
$ cd frontend
$ npm i
```

This will install the necessary dependencies. Once that is done,
run the following command to start the matching service:

```
$ npm run start
```

A developer window should launch automatically in your default web browser. If this does not happen, try visiting the following address in your browser:

```
http://localhost:3000/
```

You should see the homepage of the React app.

## Compiling, Linting, Formatting and Version Control

### Compiling

The compilation of each service is handled automatically when the service is run in either dev or production mode. Nonetheless, to compile a particular service, navigate to its directory and run the following command:

```
$ npm run build
```

### Linting

Linting is carried out automatically by Husky upon attempting to commit. However, it can also be run independently. Navigate to the root of the project and run the following command:

```
$ npm run lint
```

To run linting with automatic correction of linting errors, navigate to the root of the project and run the following command:

```
$ npm run lint:fix
```

### Formatting

Formatting is carried out automatically by Husky upon attempting to commit. However, it can also be run independently. Navigate to the root of the project and run the following command:

```
$ npm run format
```

### Version Control

As mentioned in previous sections, upon attempting to make a commit, linting and formatting processes are run. Failing these, the commit is aborted by Husky.

However, in some cases Husky may fail to run the the pre-commit shell script due to lack of executable permission. As we would like to avoid this, ensure that the the pre-commit file has executable permissions. In order to do this, navigate to the husky directory, and run the following command on Mac/Linux:

```
$ chmod +x pre-commit
```

The file should be executable by default on a Windows machine.
