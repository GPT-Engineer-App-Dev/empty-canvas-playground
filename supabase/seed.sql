-- Seed data for airports table
INSERT INTO airports (code, name, city, country) VALUES
  ('JFK', 'John F. Kennedy International Airport', 'New York', 'USA'),
  ('LAX', 'Los Angeles International Airport', 'Los Angeles', 'USA'),
  ('SFO', 'San Francisco International Airport', 'San Francisco', 'USA'),
  ('ORD', 'O''Hare International Airport', 'Chicago', 'USA'),
  ('ATL', 'Hartsfield-Jackson Atlanta International Airport', 'Atlanta', 'USA'),
  ('MIA', 'Miami International Airport', 'Miami', 'USA'),
  ('LAS', 'Harry Reid International Airport', 'Las Vegas', 'USA'),
  ('DEN', 'Denver International Airport', 'Denver', 'USA'),
  ('BOS', 'Boston Logan International Airport', 'Boston', 'USA'),
  ('MCO', 'Orlando International Airport', 'Orlando', 'USA');

-- Seed data for airlines table
INSERT INTO airlines (code, name, country) VALUES
  ('AA', 'American Airlines', 'USA'),
  ('UA', 'United Airlines', 'USA'),
  ('DL', 'Delta Air Lines', 'USA'),
  ('WN', 'Southwest Airlines', 'USA'),
  ('B6', 'JetBlue Airways', 'USA');

-- Seed data for flights table
INSERT INTO flights (flight_number, departure_airport_id, arrival_airport_id, departure_time, arrival_time, airline_id, status) VALUES
  ('AA100', (SELECT id FROM airports WHERE code = 'JFK'), (SELECT id FROM airports WHERE code = 'LAX'), '2024-08-15 08:00:00-04', '2024-08-15 11:30:00-07', (SELECT id FROM airlines WHERE code = 'AA'), 'On Time'),
  ('UA200', (SELECT id FROM airports WHERE code = 'SFO'), (SELECT id FROM airports WHERE code = 'ORD'), '2024-08-15 10:15:00-07', '2024-08-15 16:45:00-05', (SELECT id FROM airlines WHERE code = 'UA'), 'Delayed'),
  ('DL300', (SELECT id FROM airports WHERE code = 'ATL'), (SELECT id FROM airports WHERE code = 'MIA'), '2024-08-15 14:30:00-04', '2024-08-15 16:15:00-04', (SELECT id FROM airlines WHERE code = 'DL'), 'On Time'),
  ('WN400', (SELECT id FROM airports WHERE code = 'LAS'), (SELECT id FROM airports WHERE code = 'DEN'), '2024-08-15 11:45:00-07', '2024-08-15 15:00:00-06', (SELECT id FROM airlines WHERE code = 'WN'), 'On Time'),
  ('B6500', (SELECT id FROM airports WHERE code = 'BOS'), (SELECT id FROM airports WHERE code = 'MCO'), '2024-08-15 09:30:00-04', '2024-08-15 12:45:00-04', (SELECT id FROM airlines WHERE code = 'B6'), 'Boarding');
