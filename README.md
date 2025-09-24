Task Management App
Overview
This task management application is built with React, Spring Boot, Bootstrap, Sass, and PWA (Progressive Web App) technologies. The app allows users to save, modify, and delete tasks, providing a dynamic calendar for task organisation. Additionally, users can register, manage their passwords, and communicate with other registered users via chat.

Features
Task Management: Add, update, and delete tasks.

Dynamic Calendar: Organise tasks by date using a dynamic calendar view.

User Registration: Users can register for an account and receive a confirmation email upon successful registration.

Password Recovery: If users forget their password, they can request a recovery email with a token to reset it.

Authentication: The app uses JWT for secure authentication.

Password Encryption: Passwords are securely encrypted using modern encryption techniques.

Spring Security: Integrated Spring Security for added protection and user authentication.

User Interaction: Registered users can add other users to their accounts and chat with them in real-time.

LIVE DEMO: https://fullstack-project-fe.onrender.com/login#
Progressive Web App (PWA): The app is designed as a PWA, allowing users to install the app on their devices and use it offline, improving the user experience.

Technologies Used
Frontend:

React: For building the user interface.

Bootstrap: For responsive design.

Sass: For styling with enhanced features like variables and mixins.

PWA: This is for offline capabilities and the ability to install the app on devices.

Backend:

Spring Boot: For building the backend RESTful API.

Spring Security: To handle authentication and authorization.

JWT: For secure token-based authentication.

Email Service: For sending registration and password recovery emails.

Database: PostgreSQL for storing user data, tasks, and chat messages.

Setup Instructions
Prerequisites
Before running the app, make sure you have the following installed:

Node.js (version 14 or higher)

Java (version 11 or higher)

Maven (for Spring Boot)

PostgreSQL: Ensure you have PostgreSQL installed and running.

Frontend Setup
Clone the repository and navigate to the project folder:

git clone https://github.com/Serena293/fullstack-project.git cd fullstack-project

Navigate to the frontend directory and install the dependencies:

cd frontend npm install

Start the frontend project:

npm start

The frontend app will be available at http://localhost:3000.

Backend Setup
Navigate to the backend directory:

cd ../backend

Build and run the Spring Boot application:

mvn clean install mvn spring-boot:run

The backend API will be available at http://localhost:8080.

Database Configuration (PostgreSQL)
Install PostgreSQL: If you don't have PostgreSQL installed, follow the official instructions for your system.

Create a new database: Create a database for the application:

createdb your_database_plan_app

Configure application.properties: In the src/main/resources/application.properties file, update the following settings:

spring.sql.init.mode=always spring.datasource.driverClassName=org.postgresql.Driver spring.datasource.url=jdbc:postgresql://localhost:5432/your_database_plan_app spring.datasource.username=your_username spring.datasource.password=your_password

Replace your_database_plan_app, your_username, and your_password with the correct values for your PostgreSQL setup.

Security
JWT Authentication: Ensures that only authenticated users can access certain endpoints and features.

Spring Security: Provides role-based access control to restrict access to various parts of the application.

Encrypted Passwords: All user passwords are stored securely using modern encryption techniques.

Serena Ferraro
