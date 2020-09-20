USE transport_tracking;

CREATE TABLE root_users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    passwd VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    passwd VARCHAR(255),
    date_of_birth DATE,
    gender VARCHAR(255),
    isUpdater INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vehicles(
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_name VARCHAR(255),
    vehicle_type VARCHAR(255),
    vehicle_color VARCHAR(255),
    image_url VARCHAR(255),
    vehicle_number VARCHAR(255) 
);

CREATE TABLE updaters(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    vehicle_id INT UNIQUE,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
);

CREATE TABLE journey(
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT,
    starting_point VARCHAR(255),
    destination VARCHAR(255),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    isActive INT,
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
);

CREATE TABLE passengers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    journey_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (journey_id) REFERENCES journey(id) ON DELETE CASCADE
);
