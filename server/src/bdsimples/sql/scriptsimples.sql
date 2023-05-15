CREATE TABLE product (
    id CHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    price NUMERIC(8,2),
    img VARCHAR(100),
    category VARCHAR(40)
);

CREATE TABLE user (
    id CHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(150) UNIQUE,
    password CHAR(8)
);