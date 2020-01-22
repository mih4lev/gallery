CREATE TABLE colors (
  colorID serial,
  colorRU varchar(64) UNIQUE NOT NULL,
  colorEN varchar(64) UNIQUE NOT NULL,
  colorName varchar(64) UNIQUE NOT NULL,
  colorHEX varchar(7) UNIQUE NOT NULL
);

INSERT INTO colors ( colorRU, colorEN, colorName, colorHEX )
VALUES ( 'Темно-фиолетовый', 'Dark violet', 'dark-violet', '#4E0AA5' );

INSERT INTO colors ( colorRU, colorEN, colorName, colorHEX )
VALUES ( 'Мягкий пурпурный', 'Soft magenta', 'soft-magenta', '#DB71C4' );

INSERT INTO colors ( colorRU, colorEN, colorName, colorHEX )
VALUES ( 'В основном ненасыщенный темно-оранжевый', 'Mostly desaturated dark orange', 'mostly-desaturated-dark-orange', '#A5856E' );

INSERT INTO colors ( colorRU, colorEN, colorName, colorHEX )
VALUES ( 'Очень темно-зеленый', 'Very dark green', 'very-dark-green', '#3B6505' );

INSERT INTO colors ( colorRU, colorEN, colorName, colorHEX )
VALUES ( 'Темный голубой', 'Dark cyan', 'dark-cyan', '#0D747A' );

INSERT INTO colors ( colorRU, colorEN, colorName, colorHEX )
VALUES ( 'Очень мягкий синий', 'Very soft blue', 'very-soft-blue', '#8CC9EB' );

INSERT INTO colors ( colorRU, colorEN, colorName, colorHEX )
VALUES ( 'Темно-синий', 'Dark blue', 'dark-blue', '#0C318B' );

INSERT INTO colors ( colorRU, colorEN, colorName, colorHEX )
VALUES ( 'Очень темно-розовый', 'Very dark pink', 'very-dark-pink', '#4B042F' );

INSERT INTO colors ( colorRU, colorEN, colorName, colorHEX )
VALUES ( 'Темно-красный', 'Dark red', 'dark-red', '#A72121' );

INSERT INTO colors ( colorRU, colorEN, colorName, colorHEX )
VALUES ( 'Яркий апельсин', 'Vivid orange', 'vivid-orange', '#E9750F' );

INSERT INTO colors ( colorRU, colorEN, colorName, colorHEX )
VALUES ( 'Ярко-желтый', 'Bright yellow', 'bright-yellow', '#FDDC2E' );

INSERT INTO colors ( colorRU, colorEN, colorName, colorHEX )
VALUES ( 'Темно-серовато-синий', 'Dark grayish blue', 'dark-grayish-blue', '#868594' );

INSERT INTO colors ( colorRU, colorEN, colorName, colorHEX )
VALUES ( 'Очень светло-серый', 'Very light gray', 'very-light-gray', '#EDEDED' );

INSERT INTO colors ( colorRU, colorEN, colorName, colorHEX )
VALUES ( 'Очень темный (в основном черный) синий', 'Very dark (mostly black) blue', 'very-dark-blue', '#121213' );