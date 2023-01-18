/* Replace with your SQL commands */
-- create table users
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(50) UNIQUE,
    user_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    numStreet VARCHAR(50) NOT NULL,
    street VARCHAR(50) NOT NULL,
    cp VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255)
)


