CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
	gender CHAR NOT NULL CHECK (gender IN ('m', 'f')),
 	birthday DATE,
 	registrationDate DATE DEFAULT CURRENT_DATE
);


CREATE TABLE govs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE districts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    govID INTEGER REFERENCES govs(id) ON DELETE CASCADE
);

CREATE TABLE customer_address (
    id SERIAL PRIMARY KEY,
    customerID INTEGER REFERENCES Customer(id) ON DELETE CASCADE,
    addressLabel VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    govID INTEGER REFERENCES govs(id) ON DELETE CASCADE NOT NULL,
    districtID INTEGER REFERENCES districts(id) ON DELETE CASCADE NOT NULL,
    UNIQUE (customerID, addressLabel)
);


CREATE TABLE store (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    store_name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    rating DECIMAL(2,1) CHECK (rating BETWEEN 0 AND 5) DEFAULT 0,
    registrationDate DATE DEFAULT CURRENT_DATE,
    approved BOOLEAN DEFAULT FALSE
);



CREATE TABLE store_address (
    id SERIAL PRIMARY KEY,
    storeID INTEGER REFERENCES store(id) ON DELETE CASCADE,
    address TEXT NOT NULL,
    govID INTEGER REFERENCES govs(id) ON DELETE CASCADE,
    districtID INTEGER REFERENCES districts(id) ON DELETE CASCADE
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);


CREATE TABLE sub_category (
    id SERIAL PRIMARY KEY,
    catID INTEGER NOT NULL REFERENCES category(id) ON DELETE CASCADE,
    name VARCHAR(255) UNIQUE NOT NULL,
);


CREATE TABLE brand (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    logo TEXT DEFAULT NULL
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    storeID INTEGER REFERENCES store(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    image TEXT,
    description TEXT,
    price DECIMAL(10,2) CHECK (price >= 0) NOT NULL,
    stockQty INTEGER CHECK (stockQty >= 0) NOT NULL,
    subCategoryID INTEGER REFERENCES sub_category(id) ON DELETE CASCADE,
   	brand_id INTEGER REFERENCES brand(id) ON DELETE CASCADE,
    rating DECIMAL(2,1) CHECK (rating BETWEEN 0 AND 5) DEFAULT 0  
);

CREATE TABLE wishlist (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);


CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    userID INTEGER REFERENCES Customer(id) ON DELETE CASCADE,
    productID INTEGER REFERENCES product(id) ON DELETE CASCADE,
    rating DECIMAL(2,1) CHECK (rating BETWEEN 1 AND 5) NOT NULL,
    review TEXT,
    review_date DATE DEFAULT CURRENT_DATE,
    UNIQUE (userID, productID)
);

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    userID INTEGER REFERENCES Customer(id) ON DELETE CASCADE,
    productID INTEGER REFERENCES product(id) ON DELETE CASCADE,
    quantity INTEGER CHECK (quantity > 0) NOT NULL,
    addedDate DATE DEFAULT CURRENT_DATE
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    userID INTEGER REFERENCES Customer(id) ON DELETE CASCADE,
    orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    totalAmount DECIMAL NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'shipped', 'delivered', 'canceled')) DEFAULT 'pending'
);

CREATE TABLE order_item (
    id SERIAL PRIMARY KEY,
    orderID INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    productID INTEGER REFERENCES product(id) ON DELETE CASCADE,
    quantity INTEGER CHECK (quantity > 0) NOT NULL,
    price DECIMAL CHECK (price >= 0) NOT NULL
);



CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    role VARCHAR(50) CHECK (role IN ('admin', 'worker')) NOT NULL,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    gender CHAR CHECK (gender IN ('m', 'f')) NOT NULL,
    birthday DATE NOT NULL,
    hire_date DATE DEFAULT CURRENT_DATE,
    salary DECIMAL(10,2) CHECK (salary >= 0)
);
