CREATE TABLE pages (
  page_id serial,
  page_link varchar(64) UNIQUE NOT NULL,
  title_ru varchar(255) NOT NULL,
  title_en varchar(255) NOT NULL,
  meta_description_ru text,
  meta_description_en text,
  meta_keywords_ru text,
  meta_keywords_en text
);

INSERT INTO pages ( page_link, title_ru, title_en, meta_description_ru, meta_description_en, meta_keywords_ru, meta_keywords_en )
VALUES ( 'home', 'arTE', 'arTE | home', '', '', '', '' );

INSERT INTO pages ( page_link, title_ru, title_en, meta_description_ru, meta_description_en, meta_keywords_ru, meta_keywords_en )
VALUES ( 'collection', 'arTE | Коллекция', 'arTE | collection', '', '', '', '' );

INSERT INTO pages ( page_link, title_ru, title_en, meta_description_ru, meta_description_en, meta_keywords_ru, meta_keywords_en )
VALUES ( 'picture', 'arTE | Картина', 'arTE | picture', '', '', '', '' );

INSERT INTO pages ( page_link, title_ru, title_en, meta_description_ru, meta_description_en, meta_keywords_ru, meta_keywords_en )
VALUES ( 'authors', 'arTE | Авторы', 'arTE | authors', '', '', '', '' );

INSERT INTO pages ( page_link, title_ru, title_en, meta_description_ru, meta_description_en, meta_keywords_ru, meta_keywords_en )
VALUES ( 'painter', 'arTE | Автор', 'arTE | painter', '', '', '', '' );

INSERT INTO pages ( page_link, title_ru, title_en, meta_description_ru, meta_description_en, meta_keywords_ru, meta_keywords_en )
VALUES ( 'events', 'arTE | Арт-пространство', 'arTE | art space', '', '', '', '' );

INSERT INTO pages ( page_link, title_ru, title_en, meta_description_ru, meta_description_en, meta_keywords_ru, meta_keywords_en )
VALUES ( 'article', 'arTE | Афиша', 'arTE | article', '', '', '', '' );

INSERT INTO pages ( page_link, title_ru, title_en, meta_description_ru, meta_description_en, meta_keywords_ru, meta_keywords_en )
VALUES ( 'delivery', 'arTE | Доставка', 'arTE | delivery', '', '', '', '' );

INSERT INTO pages ( page_link, title_ru, title_en, meta_description_ru, meta_description_en, meta_keywords_ru, meta_keywords_en )
VALUES ( 'basket', 'arTE | Корзина', 'arTE | basket', '', '', '', '' );

INSERT INTO pages ( page_link, title_ru, title_en, meta_description_ru, meta_description_en, meta_keywords_ru, meta_keywords_en )
VALUES ( '404', 'arTE | 404', 'arTE | 404', '', '', '', '' );