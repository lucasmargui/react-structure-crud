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

![image](https://github.com/user-attachments/assets/7a94149b-3f9d-4e23-aa90-976bdbbb9416)

![image](https://github.com/user-attachments/assets/fc0ad017-83af-42f6-ab6a-a0e17e1b8618)

![image](https://github.com/user-attachments/assets/67f67fe7-b691-4d7d-ac0d-4d40fb1ada47)

![image](https://github.com/user-attachments/assets/06a85ac5-ec38-449f-b0d4-8f75a33e932b)



