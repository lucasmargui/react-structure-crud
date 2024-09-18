# Creating the project

This repository contains a basic CRUD application built with Next.js and TypeScript.

<details>
<summary>Click to show details about </summary>

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

</details>

# Database Connection

To integrate a MySQL database with a React application, we often opt for MySQL over SQL Server when using Windows Authentication, mainly due to compatibility and ease of setup.

<details>
<summary>Click to show details about </summary>

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

</details>


# Create Models

React does not provide a model structure to work with, but we can use interfaces to define the structure of classes

<details>
<summary>Click to show details about </summary>

### Main Differences 

- ***Persistence***: Models directly deal with data persistence in databases. TypeScript interfaces are just descriptions of types and have no interaction with persistence.
- ***Validation***: Models provide built-in validation mechanisms. In TypeScript, validations need to be done separately if necessary.
- ***Availability***: Models exist both in the backend and in the database. Interfaces only exist during development time to ensure typing, and are removed when converted to JavaScript

![image](https://github.com/user-attachments/assets/77cd3aca-1269-4877-a3ee-3bec56f7cdb3)


</details>

# Migrations

React does not have a migration structure like backend frameworks (e.g., Django, Rails) because it is a frontend library focused on building user interfaces rather than managing databases or data persistence.

# Template Inheritance

For each route in Next.js, you can define two main files:

1. **`page.tsx` or `page.js`**: This file defines the main content of the route. When a user accesses the corresponding route, the component exported from `page.tsx` will be rendered.

2. **`layout.tsx` or `layout.js`**: This file defines the layout for the route and its descendant routes. The layout serves as a "wrapping" structure for the page and can include common elements such as headers, footers, and sidebars.


<details>
<summary>Click to show details about </summary>
  

## Layout (Master Page):

If a route has a `layout.tsx`, all routes descending from that route will inherit the same layout. This means that:

- The page component (defined in `page.tsx`) will be rendered within the layout.

![image](https://github.com/user-attachments/assets/f3cee1d2-6631-4458-9cee-88a521489cd7)

- Any sub-route (child route) will also be wrapped by the layout, maintaining interface consistency.

![image](https://github.com/user-attachments/assets/c20a1ebc-5909-4f8d-bdad-0bff15847083)


##  Rendering Content

- The `/` route will render the content defined in `page.tsx`, wrapped by the layout defined in `layout.tsx`
- The `/materials` subroute will also be rendered within the same layout as `/`, automatically inheriting it

 ![image](https://github.com/user-attachments/assets/0b773e6e-b765-4478-bfb8-148848975b20)


</details>

# Controller

API Routes in Next.js allow you to handle server-side logic and data processing similarly to how controllers work in MVC frameworks.

<details>
<summary>Click to show details about </summary>


### 1. Creating an API Route

Create an API Route by adding a file inside the `src/app/` directory. For example, create `src/app/api/data`:

![image](https://github.com/user-attachments/assets/c78d966a-0735-4ed4-863e-f896e2960e3b)


### 2. Organizing Logic with Services 

For better organization, you can create services to handle business logic separately from your API routes.

![image](https://github.com/user-attachments/assets/4b7846d1-5fec-4b47-baf3-0b315a16b226)


![image](https://github.com/user-attachments/assets/0e5daad9-48d8-4f48-a3f2-bd75f2604283)


### 3. Consuming the API Route in a React Component

You can make requests to the API route from your React components using fetch or libraries like axios.


![image](https://github.com/user-attachments/assets/b1eb8074-8426-4c95-8fa1-c5816ec66b2b)

</details>

# Routes

Next.js provides a powerful routing system based on the file system, which simplifies the creation and management of routes in your application.

<details>
<summary>Click to show details about </summary>

## Basic Routing

In Next.js, routes are defined by the file structure inside the `pages` directory. Each JavaScript file in this directory automatically maps to a route.

**File Structure:**

![image](https://github.com/user-attachments/assets/ad58cf6c-7eec-42c9-8b8d-f2977a0c1805)

- ROUTE: `/` maps to `page.tsx`
- ROUTE: `/materials` maps to `materials/page.tsx`
- ROUTE: `/orders` maps to `orders/page.tsx`


## Nested Routes

You can create nested routes by creating subfolders inside the pages directory.

**File Structure:**

![image](https://github.com/user-attachments/assets/1dd03fa6-2699-42b4-9eed-1892fd91df9c)

- ROUTE: `/materials/create` maps to `materials/create/page.tsx`
- ROUTE: `/materials/` maps to `materials/page.tsx`

## Dynamic Routes

Dynamic routes are created by using brackets ([]) in the file or folder names. This allows you to define parameters in the URL.

**File Structure:**

![image](https://github.com/user-attachments/assets/1dd03fa6-2699-42b4-9eed-1892fd91df9c)

- ROUTE: `/materials/5/edit` -> `materials/[id]/edit/page.tsx`

</details>

# Views

In Next.js, each file in the `pages` directory corresponds to a route in your application.

<details>
<summary>Click to show details about </summary>

## Pages and Routes

- `/page.tsx` maps to `/`
- `materials/page.tsx` maps to `/materials`
- `materials/edit/[id]/page.tsx` maps to `/posts/:id`, where `:id` is a dynamic parameter

## Components

Views in Next.js are typically composed of React components. These components can be reused across pages to modularize your application.

![image](https://github.com/user-attachments/assets/fdf7c067-7ec4-4845-9a76-a61e3d8c3d20)

## Styling

CSS Modules: Style each component with its own CSS file, scoped to the component.

![image](https://github.com/user-attachments/assets/a4effacb-1e2b-4405-b5b7-1c4e989a81a2)

![image](https://github.com/user-attachments/assets/ba92a842-b13e-4547-a33f-f7440f7cec95)

</details>


# Test

In this section, we outline the process for creating and running tests within the React JS project. Testing is crucial for ensuring that components and functionality work as intended, helping to catch issues before deployment.

<details>
<summary>Click to show details about </summary>

## Creating Tests in the Project

- **Setup Testing Environment:** Ensure that Jest and any necessary testing libraries (e.g., React Testing Library) are installed and configured.
- **Writing Tests:** Write test cases for your React components and functions. Use Jest’s testing functions along with React Testing Library’s utilities to test components in isolation and in combination.
- **Running Tests:** Regularly execute tests to verify that all components and functionality are working correctly.
- **Reviewing Results:** Analyze the test results to identify and fix any issues that arise.

![image](https://github.com/user-attachments/assets/a29ae417-99ec-44e3-8e48-435bca16c5c9)


## Component Test: FORM

### Loading State

![image](https://github.com/user-attachments/assets/0b6a2ef7-ab52-47a1-99bd-bd8feb68e2af)

- **Purpose**: Verify that a loading spinner is displayed initially when creating a new item.
- **Description**: This test checks if the component shows a loading spinner at the start of the creation process and ensures that the spinner is no longer present after loading.

### Initial Rendering of the Form

![image](https://github.com/user-attachments/assets/fbd080f4-2af6-45c2-8e8b-f0e9810167e9)

- **Purpose**: Ensure that all expected fields and buttons are present when rendering the creation form.
- **Description**: Confirms the presence of input fields and the create button (`Create`) in the form.

### Validation of Required Fields

![image](https://github.com/user-attachments/assets/23a8203e-d792-4aff-84c0-dd87bb391c37)


- **Purpose**: Ensure that error messages are displayed when required fields are missing.
- **Description**: Simulates form submission without filling in required fields and verifies that the correct error messages are shown.

### User Interaction

![image](https://github.com/user-attachments/assets/edb25e1c-c1aa-4747-a752-3c6ac4c9dd56)

- **Purpose**: Test if form fields can be interacted with and if values are correctly updated.
- **Description**: Simulates changing values in various input fields and checks if the updated values are correctly reflected.


### Submit State

![image](https://github.com/user-attachments/assets/823902e9-f3f1-41ff-a106-f397e7dfd3c9)

- **Purpose**: Verify the form's behavior when submitted with filled values.
- **Description**: Simulates filling out the form fields and submitting the form, then checks if a success message (`Created success`) is displayed after submission.


## Component Test: Table

### Data Fetching and Rendering

![image](https://github.com/user-attachments/assets/5b0e4215-71b4-453c-be67-4d6243d772ab)

- **Purpose**: Verify that data is fetched and rendered correctly.
- **Description**: This test mocks the data fetching function to return predefined data (`mockData`) and checks if the data is displayed correctly in the table.

### Loading Spinner

![image](https://github.com/user-attachments/assets/9517fdb7-f04b-4d00-a292-f4382be878c8)

- **Purpose**: Ensure that a loading spinner is displayed while data is being fetched.
- **Description**: This test mocks the data fetching function and verifies that a loading spinner is shown while data is being fetched and that it disappears once the data has been loaded.

### Data Filtering

![image](https://github.com/user-attachments/assets/827913ab-8497-41a0-bad7-bcee086c3aa0)

- **Purpose**: Test if data is filtered correctly based on the search input.
- **Description**: This test mocks the data fetching function to return predefined data (`mockData`). It then simulates a user typing a search term and verifies that the table displays only the filtered results.


## Create MakeFile

A Makefile can be used to automate tasks such as running tests. This is useful for streamlining development workflows and ensuring consistency.

**Make test will run the commands `npm install` and `npm test`:**

- `make test` installs dependencies with `npm install` and then runs tests using `npm test`.


**`npm test` will consult package.json to determine what the test command does:**

- `npm test` checks package.json to find and execute the `test` script defined there.


**The `test` command runs `npx jest --verbose` without watchAll mode:**

- The test script runs `npx jest --verbose` without file monitoring for automatic test re-runs.

</details>

# Create Dockerfile

A Dockerfile is a script that contains a set of instructions to build a Docker image. It defines the base image, dependencies, environment variables, and commands needed to assemble the environment and run an application. By using a Dockerfile, you can automate the process of creating a consistent and portable image that can be deployed across different environment

<details>
<summary>Click to show details about </summary>

![image](https://github.com/user-attachments/assets/fa204d7c-37e2-4d4c-a55d-e8451a4d9386)



1. **FROM node:18-alpine AS build**  
   Sets the base image to Node.js 18 Alpine for the build stage.

2. **WORKDIR /app**  
   Sets the working directory to `/app`.

3. **COPY package*.json ./**  
   Copies `package.json` and `package-lock.json` files to the working directory.

4. **RUN npm ci**  
   Installs production and development dependencies using `npm ci`.

5. **COPY . .**  
   Copies all project files to the working directory.

6. **RUN npm run build**  
   Runs the build script for the application.

7. **FROM node:18-alpine AS runtime**  
   Sets a new base image for the runtime stage.

8. **WORKDIR /app**  
   Sets the working directory to `/app` again.

9. **COPY package*.json ./**  
   Copies `package.json` and `package-lock.json` files to the working directory.

10. **RUN npm ci --only=production**  
    Installs only production dependencies using `npm ci`.

11. **COPY --from=build /app/.next ./.next**  
    Copies the build output from the `.next` folder from the build stage to the runtime.

12. **COPY --from=build /app/public ./public**  
    Copies the `public` folder from the build stage to the runtime.

13. **EXPOSE 3000**  
    Exposes port 3000 for external access.

14. **USER node**  
    Sets the user to `node` for running the container.

15. **CMD ["npm", "start"]**  
    Defines the command to start the application using `npm start`.


</details>


# CI/CD

CI/CD (Continuous Integration/Continuous Deployment or Delivery) is a set of practices that automate the development, testing, and deployment of software.

<details>
<summary>Click to show details about </summary>

## Push to GitLab

```
git remote add origin https://gitlab.com/lucasmargui/react-structure-crud.git
git branch -M main
git push -uf origin main

```

## Create Pipeline

Create `gitlab-ci.yml` file, is a configuration file used by GitLab CI/CD to define the steps of your automated pipeline. It specifies stages such as build, test, and deploy, outlining the jobs to be executed in each stage

![image](https://github.com/user-attachments/assets/1800bce3-b536-477a-9bcb-6c8d21fbc70e)


The pipeline is composed of two stages:
- **Test**: Runs tests using Node.js.
- **Build**: Builds and pushes the Docker image to the registry.


![image](https://github.com/user-attachments/assets/3fb6396d-7e85-4d02-8857-d7af749f994f)


## Create Job: run_tests

The test stage runs the unit tests of the React application.

![image](https://github.com/user-attachments/assets/ac2615c5-5533-4896-8abf-26f433871418)

#### Configuration

- **Image**: `node:18-alpine`
- **Commands**:
    - Updates the Alpine package manager.
    - Installs `make`.
    - Runs tests using `make test`.

## Create Job: image

The build stage is responsible for creating a Docker image of the React application and pushing it to a Docker registry.

![image](https://github.com/user-attachments/assets/cc346d6f-484e-427e-aa5f-a80ee4b3529e)


#### Configuration

- **Image**: `docker:27.2.1-cli` - Docker CLI image used for building and pushing Docker images.
- **Services**: 
  - `docker:27.2.1-dind` - Docker-in-Docker service required for building Docker images.
- **Variables**:
  - `DOCKER_TLS_CERTDIR`: `/certs` - Directory for storing Docker TLS certificates.

#### Commands

1. **Login to Docker Registry**: Authenticate with Docker Hub using the provided credentials.
2. **Build Docker Image**: Create the Docker image using the `Dockerfile` located in the root directory of the project.
3. **Push Docker Image**: Upload the built image to Docker Hub with the specified name and tag.

</details>

![image](https://github.com/user-attachments/assets/7a94149b-3f9d-4e23-aa90-976bdbbb9416)

![image](https://github.com/user-attachments/assets/fc0ad017-83af-42f6-ab6a-a0e17e1b8618)

![image](https://github.com/user-attachments/assets/67f67fe7-b691-4d7d-ac0d-4d40fb1ada47)

![image](https://github.com/user-attachments/assets/06a85ac5-ec38-449f-b0d4-8f75a33e932b)



