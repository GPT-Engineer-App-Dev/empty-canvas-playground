-- Seed data for flights table
INSERT INTO flights (flight_number, departure_airport, arrival_airport, departure_time, arrival_time, airline, status) VALUES
  ('AA100', 'JFK', 'LAX', '2024-08-15 08:00:00-04', '2024-08-15 11:30:00-07', 'American Airlines', 'On Time'),
  ('UA200', 'SFO', 'ORD', '2024-08-15 10:15:00-07', '2024-08-15 16:45:00-05', 'United Airlines', 'Delayed'),
  ('DL300', 'ATL', 'MIA', '2024-08-15 14:30:00-04', '2024-08-15 16:15:00-04', 'Delta Air Lines', 'On Time'),
  ('SW400', 'LAS', 'DEN', '2024-08-15 11:45:00-07', '2024-08-15 15:00:00-06', 'Southwest Airlines', 'On Time'),
  ('JB500', 'BOS', 'MCO', '2024-08-15 09:30:00-04', '2024-08-15 12:45:00-04', 'JetBlue Airways', 'Boarding');
