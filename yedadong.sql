create database yedadong;

use yedadong;

create table member(
id varchar(50) primary key,
pwd varchar(20),
member_name varchar(10),
age int,
location varchar(100),
hobby varchar(20),
picture varchar(50),
contact varchar(15)
);

create table group_list(
group_name varchar(50) primary key,
group_desc varchar(500),
group_state int
);

create table member_group(
id varchar(50),
group_name varchar(50),
member_group_state int,
foreign key(id) references member(id),
foreign key(group_name) references group_list(group_name)
);

create table message(
sender_id varchar(10),
receiver_id varchar(10),
message_title varchar(20),
message_content varchar(500),
message_status int,
foreign key(sender_id) references member(id),
foreign key(receiver_id) references member(id) 
);

create table boards(
board_name varchar(20),
board_status varchar(10),
board_key int not null AUTO_INCREMENT primary key
);

create table writing(
writing_board_name varchar(20),
writing_board_key int not null,
writing_writer varchar(10),
writing_title varchar(30),
writing_desc varchar(500),
writing_time timestamp DEFAULT CURRENT_TIMESTAMP,
writing_status int,
foreign key(writing_board_key) references boards(board_key)
);

show tables;
drop table login;
desc boards;