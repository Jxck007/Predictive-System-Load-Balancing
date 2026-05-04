-- Demo servers
INSERT INTO servers (name, ip_address, status) VALUES
('Server A', '192.168.1.10', 'active'),
('Server B', '192.168.1.11', 'active'),
('Server C', '192.168.1.12', 'active');

-- Demo metrics
INSERT INTO metrics (server_id, cpu_usage, memory_usage) VALUES
(1, 35.2, 60.1),
(2, 55.7, 70.3),
(3, 20.5, 40.2);

-- Demo predictions
INSERT INTO predictions (server_id, predicted_load) VALUES
(1, 40.0),
(2, 60.0),
(3, 25.0);

-- Demo routing weights
INSERT INTO routing_weights (server_id, weight) VALUES
(1, 2),
(2, 1),
(3, 3);
