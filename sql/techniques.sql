CREATE TABLE techniques (
  techniqueID serial,
  techniqueRU varchar(64) UNIQUE NOT NULL,
  techniqueEN varchar(64) UNIQUE NOT NULL
);

INSERT INTO techniques ( techniqueRU, techniqueEN )
VALUES ( 'Масла', 'Oils' );

INSERT INTO techniques ( techniqueRU, techniqueEN )
VALUES ( 'Коллаж', 'Collage' );

INSERT INTO techniques ( techniqueRU, techniqueEN )
VALUES ( 'Акрил', 'Acrylic' );

INSERT INTO techniques ( techniqueRU, techniqueEN )
VALUES ( 'Пастель', 'Pastel' );

INSERT INTO techniques ( techniqueRU, techniqueEN )
VALUES ( 'Маркер', 'Marker' );

INSERT INTO techniques ( techniqueRU, techniqueEN )
VALUES ( 'Акварель', 'Watercolor' );