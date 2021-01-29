USE traveljournal_db;
INSERT INTO Users (userName, email, password,profileImage)
VALUES
    ("sonni williams", "example1@mail.com", "$2a$12$e0NWf","123"),
   (" Thammarak thammaraku", "example2@mail.com", "$2aliKWNWf","123"),
   ("Christian Romero", "example3@mail.com", "$2a$12$e0NWf","123"),
   ("Priya Garg", "example4@mail.com", "$2a$WNWf","123"),
   ("jones liddy", "example5@mail.com", "$2a$liKWNWf","123");

INSERT INTO journals(journalTitle,location,  journalEntry,start_date, end_date, UserId)
VALUES
   --  ("Spanish Delight", 
--         'Madrid, Spain', 
--         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
--         '2019-05-06 20:00:00', 
--         '2019-05-06 20:00:00', 
--         1),
    ('Fun Day in Florida', 
        'Miami, Florida', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute , sunt in culpa qui officia deserunt mollit anim id est laborum.',
        '2019-01-11 19:00:00', 
        '2019-01-12 19:00:00', 
        1),
    ('Beauty of Italy', 
        'Rome, Italy', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        '2020-02-10 12:00:00', 
        '2020-02-14 12:00:00', 
        4),
    ('Disney World', 
        'Orlando, Florida', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        '2019-07-02 20:00:00', 
        '2019-07-09 20:00:00', 
        3),
    ('First day in Australia', 
        'Brisbane, Australia', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        '2019-04-14 20:00:00', 
        '2019-04-15 20:00:00', 
        2);

INSERT INTO locations (place,city,state,country, lattitude,longitude,location_id, user_id)
VALUES
    ("cupidatat","Brisbane","reprehenderit","Australia","34546457","3456567",2,1);