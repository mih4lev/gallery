CREATE TABLE orders (
    order_id serial,
    order_number varchar(10) UNIQUE NOT NULL,
    order_date datetime NOT NULL,
    delivery varchar(20) NOT NULL,
    payment varchar(20) NOT NULL,
    client_name varchar(64) NOT NULL,
    client_phone varchar(20) NOT NULL,
    client_email varchar(64) NOT NULL,
    client_comment text NULL,
    client_city varchar(64) NULL,
    client_address varchar(255) NULL
);