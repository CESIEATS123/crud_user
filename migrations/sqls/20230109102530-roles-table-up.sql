/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE roles(
id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    role VARCHAR(50) UNIQUE
)