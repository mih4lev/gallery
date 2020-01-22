CREATE TABLE orders (
    orderID serial,
    orderNumber varchar(10) UNIQUE NOT NULL,
    orderDate datetime NOT NULL,
    delivery varchar(20) NOT NULL,
    payment varchar(20) NOT NULL,
    clientName varchar(64) NOT NULL,
    clientPhone varchar(20) NOT NULL,
    clientEmail varchar(64) NOT NULL,
    clientComment text NULL,
    clientCity varchar(64) NULL,
    clientAddress varchar(255) NULL
);