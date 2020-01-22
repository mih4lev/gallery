CREATE TABLE pictures (
  pictureID serial,
  authorID int NOT NULL,
  pictureRU varchar(255) UNIQUE NOT NULL,
  pictureEN varchar(255) UNIQUE NOT NULL,
  pictureSizeWidth int NOT NULL,
  pictureSizeHeight int NOT NULL,
  pictureOrientation varchar(64) NOT NULL,
  picturePrice int NOT NULL,
  picturePriceSale int NULL,
  pictureAboutRU text NULL,
  pictureAboutEN text NULL,
  picturePosition int NOT NULL,
  picturePhoto varchar(255) NOT NULL
);

CREATE TABLE genreList (
    relationID serial,
    pictureID int NOT NULL,
    genreID int NOT NULL
);

CREATE TABLE techniqueList (
    relationID serial,
    pictureID int NOT NULL,
    techniqueID int NOT NULL
);

CREATE TABLE colorList (
    relationID serial,
    pictureID int NOT NULL,
    colorID int NOT NULL
);

CREATE TABLE photos (
    photoID serial,
    pictureID int NOT NULL,
    photoNameRU varchar(255) NOT NULL,
    photoNameEN varchar(255) NOT NULL,
    photoLink varchar(255) NOT NULL
);


INSERT INTO pictures (
    authorID,
    pictureRU,
    pictureEN,
    pictureSizeWidth,
    pictureSizeHeight,
    pictureOrientation,
    picturePrice,
    picturePriceSale,
    pictureAboutRU,
    pictureAboutEN,
    picturePosition,
    picturePhoto
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
    1,
    'collection_photo4.png'
);

INSERT INTO genreList ( pictureID, genreID ) VALUES ( 1, 1 );

INSERT INTO techniqueList ( pictureID, techniqueID ) VALUES ( 1, 1 );

INSERT INTO colorList ( pictureID, colorID ) VALUES ( 1, 11 );

INSERT INTO colorList ( pictureID, colorID ) VALUES ( 1, 3 );

INSERT INTO photos ( pictureID, photoNameRU, photoNameEN, photoLink ) VALUES (
    '1', 'фотография картины 1', 'alt description photo 1', '371f4672fd4cbd99348cb158e8b38127.png'
);

INSERT INTO photos ( pictureID, photoNameRU, photoNameEN, photoLink ) VALUES (
    '1', 'фотография картины 2', 'alt description photo 2', 'db347405ccd4eb41b6b7fa4870047a38.png'
);

INSERT INTO photos ( pictureID, photoNameRU, photoNameEN, photoLink ) VALUES (
    '1', 'фотография картины 3', 'alt description photo 3', 'fb6fd7deed830e35cd6a00c750816f6b.png'
);