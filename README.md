# Online Pizza Store Website - ReactJS Frontend, NodeJS Backend, and MySQL Database
## Introduction
This is an online pizza store website that is developed using ReactJS for the frontend, NodeJS for the backend, and MySQL for the database. The website allows customers to order pizza online and make online payments.
## Requirements
To use this website, you need to have NodeJS and MySQL installed on your computer. If you have not installed NodeJS, you can download it from the [official NodeJS website](https://nodejs.org/en). If you have not installed MySQL, you can download it from the [official MySQL website](https://www.mysql.com/).
## Installation
#### 1. Clone the repository to your computer.

```
git clone https://github.com/ductinmdt/pizza.git
```

#### 2. Install the required packages for both the frontend and the backend..
```
cd frontend
npm install
cd backend
npm install
```
#### 3. Configure your MySQL account in the .env file located in the backend directory.
```
PORT=9999
REFRESH_TOKEN_SECRET= your_refresh_token
ACCESS_TOKEN_SECRET= your_access_token
DB_USERNAME = root
DB_PASSWORD = your_password
DB_DATABASE = your_database
DB_HOST = localhost
```
## Usage
#### 1. Start the server.
```
cd backend
npm start
```
#### 2. Start the frontend.
```
cd frontend
npm start
```
#### 3. Access the website.
```
http://localhost:3000
```
#### 4. Register an account to order pizza and make online payments.
