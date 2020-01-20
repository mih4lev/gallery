CREATE TABLE techniques (
  technique_id serial,
  technique_ru varchar(64) UNIQUE NOT NULL,
  technique_en varchar(64) UNIQUE NOT NULL
);

INSERT INTO techniques ( technique_ru, technique_en ) 
VALUES ( 'Масла', 'Oils' );

INSERT INTO techniques ( technique_ru, technique_en ) 
VALUES ( 'Коллаж', 'Collage' );

INSERT INTO techniques ( technique_ru, technique_en ) 
VALUES ( 'Акрил', 'Acrylic' );

INSERT INTO techniques ( technique_ru, technique_en ) 
VALUES ( 'Пастель', 'Pastel' );

INSERT INTO techniques ( technique_ru, technique_en ) 
VALUES ( 'Маркер', 'Marker' );

INSERT INTO techniques ( technique_ru, technique_en ) 
VALUES ( 'Акварель', 'Watercolor' );