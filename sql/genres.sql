CREATE TABLE genres (
  genre_id serial,
  genre_ru varchar(64) UNIQUE NOT NULL,
  genre_en varchar(64) UNIQUE NOT NULL
);

INSERT INTO genres ( genre_ru, genre_en ) 
VALUES ( 'Портрет', 'Portrait' );

INSERT INTO genres ( genre_ru, genre_en ) 
VALUES ( 'Пейзаж', 'Landscape' );

INSERT INTO genres ( genre_ru, genre_en ) 
VALUES ( 'Абстракция', 'Abstraction' );