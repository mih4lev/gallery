CREATE TABLE pictures (
  picture_id serial,
  author_id int NOT NULL,
  picture_ru varchar(255) UNIQUE NOT NULL,
  picture_en varchar(255) UNIQUE NOT NULL,
  picture_size_width int NOT NULL,
  picture_size_height int NOT NULL,
  picture_orientation varchar(64) NOT NULL,
  picture_price int NOT NULL,
  picture_price_sale int NULL,
  picture_about_ru text,
  picture_about_en text,
  picture_position int
);

CREATE TABLE genre_list (
    relation_id serial,
    picture_id int NOT NULL,
    genre_id int NOT NULL
);

CREATE TABLE technique_list (
    relation_id serial,
    picture_id int NOT NULL,
    technique_id int NOT NULL
);

CREATE TABLE color_list (
    relation_id serial,
    picture_id int NOT NULL,
    color_id int NOT NULL
);

CREATE TABLE photos (
    photo_id serial,
    picture_id int NOT NULL,
    photo_name_ru varchar(255) NOT NULL,
    photo_name_en varchar(255) NOT NULL,
    photo_link varchar(255) NOT NULL
);


INSERT INTO pictures (
    author_id, 
    picture_ru, 
    picture_en, 
    picture_size_width, 
    picture_size_height, 
    picture_orientation, 
    picture_price, 
    picture_price_sale, 
    picture_about_ru, 
    picture_about_en,
    picture_position
) VALUES (
    1,
    'Женщина на желтом фоне',
    'Woman on a yellow background',
    200,
    130,
    'width',
    25000,
    0,
    'Описание картина желты человек мазки головной убор. Описание картина желты человек мазки головной убор. Описание картина желты человек мазки головной убор. Описание картина желты человек мазки головной убор. Описание картина желты человек мазки головной убор. Описание картина желты человек мазки головной убор. Описание картина желты человек мазки головной убор. Описание картина желты человек мазки головной убор.',
    'Description picture of a yellow man strokes a hat. Description picture of a yellow man strokes a hat. Description picture of a yellow man strokes a hat. Description picture of a yellow man strokes a hat. Description picture of a yellow man strokes a hat. Description picture of a yellow man strokes a hat. Description picture of a yellow man strokes a hat. Description picture of a yellow man strokes a hat.',
    1
);

INSERT INTO genre_list ( picture_id, genre_id ) VALUES ( 1, 1 );

INSERT INTO technique_list ( picture_id, technique_id ) VALUES ( 1, 1 );

INSERT INTO color_list ( picture_id, color_id ) VALUES ( 1, 11 );

INSERT INTO color_list ( picture_id, color_id ) VALUES ( 1, 3 );

INSERT INTO photos ( picture_id, photo_name_ru, photo_name_en, photo_link ) VALUES (
    '1', 'фотография картины 1', 'alt description photo 1', '371f4672fd4cbd99348cb158e8b38127.png'
);

INSERT INTO photos ( picture_id, photo_name_ru, photo_name_en, photo_link ) VALUES (
    '1', 'фотография картины 2', 'alt description photo 2', 'db347405ccd4eb41b6b7fa4870047a38.png'
);

INSERT INTO photos ( picture_id, photo_name_ru, photo_name_en, photo_link ) VALUES (
    '1', 'фотография картины 3', 'alt description photo 3', 'fb6fd7deed830e35cd6a00c750816f6b.png'
);