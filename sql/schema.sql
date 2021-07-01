CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar(100),
    email varchar(200),
    password varchar(2000)
);

CREATE TABLE toDoList (
    id serial PRIMARY KEY,
    task varchar(2000),
    user_tasks integer REFERENCES users (id),
    status boolean NOT NULL 
    
);


