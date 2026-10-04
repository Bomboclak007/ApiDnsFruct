create database if not exists db_teacher character set utf8mb4 collate utf8mb4_unicode_ci;
use db_teacher;

create table price_list(
    serial_no int not null,
    product_code int primary key,
    product_name varchar(100) not null,
    unit_price decimal(10,2) not null,
    unique key uk_price_list_serial_no (serial_no)
);

create table sales_accounting(
    sale_id int primary key,
    sale_date date not null,
    product_code int not null,
    product_name varchar(100) not null,
    quantity_sold int not null,
    total_cost decimal(10,2) not null,
    index idx_sales_date (sale_date),
    index idx_sales_product_code (product_code),
    constraint fk_sales_accounting_product_code foreign key (product_code) references price_list(product_code)
);

INSERT INTO price_list (serial_no, product_code, product_name, unit_price) VALUES (1, 101, 'Ноутбук базовый', 45000);
INSERT INTO price_list (serial_no, product_code, product_name, unit_price) VALUES (2, 102, 'Смартфон стандартный', 25000);
INSERT INTO price_list (serial_no, product_code, product_name, unit_price) VALUES (3, 103, 'Монитор 24 дюйма', 15000);
INSERT INTO price_list (serial_no, product_code, product_name, unit_price) VALUES (4, 104, 'Клавиатура механическая', 4500);
INSERT INTO price_list (serial_no, product_code, product_name, unit_price) VALUES (5, 105, 'Мышь беспроводная', 2500);
INSERT INTO price_list (serial_no, product_code, product_name, unit_price) VALUES (6, 106, 'Внешний жесткий диск 1ТБ', 6000);
INSERT INTO price_list (serial_no, product_code, product_name, unit_price) VALUES (7, 107, 'Сетевой фильтр', 1200);

INSERT INTO sales_accounting (sale_id, sale_date, product_code, product_name, quantity_sold, total_cost) VALUES (1, '2026-10-01', 101, 'Ноутбук базовый', 2, 90000);
INSERT INTO sales_accounting (sale_id, sale_date, product_code, product_name, quantity_sold, total_cost) VALUES (2, '2026-10-01', 102, 'Смартфон стандартный', 1, 25000);
INSERT INTO sales_accounting (sale_id, sale_date, product_code, product_name, quantity_sold, total_cost) VALUES (3, '2026-10-02', 104, 'Клавиатура механическая', 5, 22500);
INSERT INTO sales_accounting (sale_id, sale_date, product_code, product_name, quantity_sold, total_cost) VALUES (4, '2026-10-02', 107, 'Сетевой фильтр', 10, 12000);
INSERT INTO sales_accounting (sale_id, sale_date, product_code, product_name, quantity_sold, total_cost) VALUES (5, '2026-10-03', 103, 'Монитор 24 дюйма', 3, 45000);
INSERT INTO sales_accounting (sale_id, sale_date, product_code, product_name, quantity_sold, total_cost) VALUES (6, '2026-10-03', 105, 'Мышь беспроводная', 4, 10000);
INSERT INTO sales_accounting (sale_id, sale_date, product_code, product_name, quantity_sold, total_cost) VALUES (7, '2026-10-04', 106, 'Внешний жесткий диск 1ТБ', 1, 6000);
INSERT INTO sales_accounting (sale_id, sale_date, product_code, product_name, quantity_sold, total_cost) VALUES (8, '2026-10-04', 101, 'Ноутбук базовый', 1, 45000);
INSERT INTO sales_accounting (sale_id, sale_date, product_code, product_name, quantity_sold, total_cost) VALUES (9, '2026-10-05', 102, 'Смартфон стандартный', 6, 150000);
INSERT INTO sales_accounting (sale_id, sale_date, product_code, product_name, quantity_sold, total_cost) VALUES (10, '2026-10-05', 105, 'Мышь беспроводная', 8, 20000);
INSERT INTO sales_accounting (sale_id, sale_date, product_code, product_name, quantity_sold, total_cost) VALUES (11, '2026-10-06', 104, 'Клавиатура механическая', 2, 9000);
INSERT INTO sales_accounting (sale_id, sale_date, product_code, product_name, quantity_sold, total_cost) VALUES (12, '2026-10-06', 107, 'Сетевой фильтр', 7, 8400);
INSERT INTO sales_accounting (sale_id, sale_date, product_code, product_name, quantity_sold, total_cost) VALUES (13, '2026-10-07', 103, 'Монитор 24 дюйма', 1, 15000);
INSERT INTO sales_accounting (sale_id, sale_date, product_code, product_name, quantity_sold, total_cost) VALUES (14, '2026-10-07', 106, 'Внешний жесткий диск 1ТБ', 9, 54000);
INSERT INTO sales_accounting (sale_id, sale_date, product_code, product_name, quantity_sold, total_cost) VALUES (15, '2026-10-07', 102, 'Смартфон стандартный', 3, 75000);
