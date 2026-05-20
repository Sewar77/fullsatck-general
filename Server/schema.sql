
create type user_role as enum ('user', 'admin');

create table users(
    id serial primary key, 
    name varchar(100) not null, 
    email varchar(100) not null unique, 
    hashed_password text not null, 
    role user_role default 'user',
	created_at timestamp default current_timestamp 
)

select * from users

