CREATE TABLE colors (
  color_id serial,
  color_ru varchar(64) UNIQUE NOT NULL,
  color_en varchar(64) UNIQUE NOT NULL,
  color_name varchar(64) UNIQUE NOT NULL,
  color_hex varchar(7) UNIQUE NOT NULL
);

INSERT INTO colors ( color_ru, color_en, color_name, color_hex ) 
VALUES ( 'Темно-фиолетовый', 'Dark violet', 'dark-violet', '#4E0AA5' );

INSERT INTO colors ( color_ru, color_en, color_name, color_hex ) 
VALUES ( 'Мягкий пурпурный', 'Soft magenta', 'soft-magenta', '#DB71C4' );

INSERT INTO colors ( color_ru, color_en, color_name, color_hex ) 
VALUES ( 'В основном ненасыщенный темно-оранжевый', 'Mostly desaturated dark orange', 'mostly-desaturated-dark-orange', '#A5856E' );

INSERT INTO colors ( color_ru, color_en, color_name, color_hex ) 
VALUES ( 'Очень темно-зеленый', 'Very dark green', 'very-dark-green', '#3B6505' );

INSERT INTO colors ( color_ru, color_en, color_name, color_hex ) 
VALUES ( 'Темный голубой', 'Dark cyan', 'dark-cyan', '#0D747A' );

INSERT INTO colors ( color_ru, color_en, color_name, color_hex ) 
VALUES ( 'Очень мягкий синий', 'Very soft blue', 'very-soft-blue', '#8CC9EB' );

INSERT INTO colors ( color_ru, color_en, color_name, color_hex ) 
VALUES ( 'Темно-синий', 'Dark blue', 'dark-blue', '#0C318B' );

INSERT INTO colors ( color_ru, color_en, color_name, color_hex ) 
VALUES ( 'Очень темно-розовый', 'Very dark pink', 'very-dark-pink', '#4B042F' );

INSERT INTO colors ( color_ru, color_en, color_name, color_hex )  
VALUES ( 'Темно-красный', 'Dark red', 'dark-red', '#A72121' );

INSERT INTO colors ( color_ru, color_en, color_name, color_hex )  
VALUES ( 'Яркий апельсин', 'Vivid orange', 'vivid-orange', '#E9750F' );

INSERT INTO colors ( color_ru, color_en, color_name, color_hex ) 
VALUES ( 'Ярко-желтый', 'Bright yellow', 'bright-yellow', '#FDDC2E' );

INSERT INTO colors ( color_ru, color_en, color_name, color_hex ) 
VALUES ( 'Темно-серовато-синий', 'Dark grayish blue', 'dark-grayish-blue', '#868594' );

INSERT INTO colors ( color_ru, color_en, color_name, color_hex ) 
VALUES ( 'Очень светло-серый', 'Very light gray', 'very-light-gray', '#EDEDED' );

INSERT INTO colors ( color_ru, color_en, color_name, color_hex ) 
VALUES ( 'Очень темный (в основном черный) синий', 'Very dark (mostly black) blue', 'very-dark-blue', '#121213' );