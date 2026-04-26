-- db/init.sql
CREATE DATABASE IF NOT EXISTS cropdata;
USE cropdata;

CREATE TABLE crop_prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    crop_name VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL
);

-- Insert mock data for Rice in Dhaka
INSERT INTO crop_prices (crop_name, region, price, date) VALUES
('Rice', 'Dhaka', 55.50, CURDATE() - INTERVAL 14 DAY),
('Rice', 'Dhaka', 55.75, CURDATE() - INTERVAL 13 DAY),
('Rice', 'Dhaka', 56.00, CURDATE() - INTERVAL 12 DAY),
('Rice', 'Dhaka', 55.90, CURDATE() - INTERVAL 11 DAY),
('Rice', 'Dhaka', 56.20, CURDATE() - INTERVAL 10 DAY),
('Rice', 'Dhaka', 56.50, CURDATE() - INTERVAL 9 DAY),
('Rice', 'Dhaka', 56.40, CURDATE() - INTERVAL 8 DAY),
('Rice', 'Dhaka', 56.80, CURDATE() - INTERVAL 7 DAY),
('Rice', 'Dhaka', 57.00, CURDATE() - INTERVAL 6 DAY),
('Rice', 'Dhaka', 57.10, CURDATE() - INTERVAL 5 DAY),
('Rice', 'Dhaka', 57.30, CURDATE() - INTERVAL 4 DAY),
('Rice', 'Dhaka', 57.25, CURDATE() - INTERVAL 3 DAY),
('Rice', 'Dhaka', 57.50, CURDATE() - INTERVAL 2 DAY),
('Rice', 'Dhaka', 57.80, CURDATE() - INTERVAL 1 DAY);

-- Insert mock data for Wheat in Chittagong
INSERT INTO crop_prices (crop_name, region, price, date) VALUES
('Wheat', 'Chittagong', 38.00, CURDATE() - INTERVAL 14 DAY),
('Wheat', 'Chittagong', 38.20, CURDATE() - INTERVAL 13 DAY),
('Wheat', 'Chittagong', 38.10, CURDATE() - INTERVAL 12 DAY),
('Wheat', 'Chittagong', 38.50, CURDATE() - INTERVAL 11 DAY),
('Wheat', 'Chittagong', 38.70, CURDATE() - INTERVAL 10 DAY),
('Wheat', 'Chittagong', 38.60, CURDATE() - INTERVAL 9 DAY),
('Wheat', 'Chittagong', 39.00, CURDATE() - INTERVAL 8 DAY),
('Wheat', 'Chittagong', 39.10, CURDATE() - INTERVAL 7 DAY),
('Wheat', 'Chittagong', 39.30, CURDATE() - INTERVAL 6 DAY),
('Wheat', 'Chittagong', 39.20, CURDATE() - INTERVAL 5 DAY),
('Wheat', 'Chittagong', 39.50, CURDATE() - INTERVAL 4 DAY),
('Wheat', 'Chittagong', 39.60, CURDATE() - INTERVAL 3 DAY),
('Wheat', 'Chittagong', 39.80, CURDATE() - INTERVAL 2 DAY),
('Wheat', 'Chittagong', 40.00, CURDATE() - INTERVAL 1 DAY);
