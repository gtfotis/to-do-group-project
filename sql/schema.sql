CREATE TABLE toDoList (
    id serial PRIMARY KEY,
    task text NOT NULL,
    user_id integer REFERENCES users (id)
    task_complete NOT NULL DEFAULT FALSE
    
);

CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar(100),
    email varchar(200),
    password varchar(2000)
);
