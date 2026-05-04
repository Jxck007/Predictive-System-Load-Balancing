-- Create servers table
CREATE TABLE servers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create metrics table
CREATE TABLE metrics (
    id SERIAL PRIMARY KEY,
    server_id INTEGER REFERENCES servers(id),
    cpu_usage REAL NOT NULL,
    memory_usage REAL NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create predictions table
CREATE TABLE predictions (
    id SERIAL PRIMARY KEY,
    server_id INTEGER REFERENCES servers(id),
    predicted_load REAL NOT NULL,
    predicted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create routing_weights table
CREATE TABLE routing_weights (
    id SERIAL PRIMARY KEY,
    server_id INTEGER REFERENCES servers(id),
    weight INTEGER NOT NULL DEFAULT 1,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
