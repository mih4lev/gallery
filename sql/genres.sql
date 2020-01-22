CREATE TABLE genres (
  genreID serial,
  genreRU varchar(64) UNIQUE NOT NULL,
  genreEN varchar(64) UNIQUE NOT NULL
);

INSERT INTO genres ( genreRU, genreEN )
VALUES ( 'Портрет', 'Portrait' );

INSERT INTO genres ( genreRU, genreEN )
VALUES ( 'Пейзаж', 'Landscape' );

INSERT INTO genres ( genreRU, genreEN )
VALUES ( 'Абстракция', 'Abstraction' );