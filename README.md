# Creating the project

This repository contains a basic CRUD application built with Next.js and TypeScript.


### 1. Creating the Project

To create a new Next.js project, use the following command:

```bash
npx create-next-app@latest crud-next-js
```

![image](https://github.com/user-attachments/assets/0e85cecc-4d73-4ed7-8992-f996747a6a60)


### 2. Changing Module Resolution

To ensure smooth module resolution with Node.js, modify the tsconfig.json file.

Open the generated tsconfig.json file.
Find the compilerOptions section.
Add or modify the moduleResolution option as shown below:

```bash
{
  "compilerOptions": {
    "moduleResolution": "node",
    ...
  }
}
```

![image](https://github.com/user-attachments/assets/15c613f2-db48-4afc-aa64-bb6d5a35bb4b)


### 3. Starting the Development Server

After creating the project and updating tsconfig.json, you can start the development server. Make sure you're in the project directory (crud-next-js) and run:
```bash
npm run dev
```

# Database Connection

To integrate a MySQL database with a React application, we often opt for MySQL over SQL Server when using Windows Authentication, mainly due to compatibility and ease of setup.

### 1. Install mysql2

MySQL provides an easier and more platform-agnostic solution. By utilizing the mysql2 package in Node.js (which is used as a backend API for React), we can establish a more straightforward and reliable database connection without the complications of Windows Authentication.

```bash
npm install mysql2
```
```bash
npm install mysql2-promise
```

### 2. Config .env

This section describes how to configure your .env file to set up your database credentials.

```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=projeto_react
```

### 3. MySQL Database Connection Class

This module provides a function to establish a connection to a MySQL database using the `mysql2/promise` package. The connection configuration is based on environment variables.

![image](https://github.com/user-attachments/assets/f4a63d48-439c-4606-8e8f-882392df52fa)




# Create Models
# Migrations
# Template Inheritance
# Controller
# Routes
# Views


![image](https://github.com/user-attachments/assets/7a94149b-3f9d-4e23-aa90-976bdbbb9416)

![image](https://github.com/user-attachments/assets/fc0ad017-83af-42f6-ab6a-a0e17e1b8618)

![image](https://github.com/user-attachments/assets/67f67fe7-b691-4d7d-ac0d-4d40fb1ada47)

![image](https://github.com/user-attachments/assets/06a85ac5-ec38-449f-b0d4-8f75a33e932b)



