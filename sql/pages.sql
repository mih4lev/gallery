CREATE TABLE pages (
  pageID serial,
  pageLink varchar(64) UNIQUE NOT NULL,
  titleRU varchar(255) NOT NULL,
  titleEN varchar(255) NOT NULL,
  metaDescriptionRU text NULL,
  metaDescriptionEN text NULL,
  metaKeywordsRU text NULL,
  metaKeywordsEN text NULL
);

INSERT INTO pages ( pageLink, titleRU, titleEN, metaDescriptionRU, metaDescriptionEN, metaKeywordsRU, metaKeywordsEN )
VALUES ( 'home', 'arTE', 'arTE | home', '', '', '', '' );

INSERT INTO pages ( pageLink, titleRU, titleEN, metaDescriptionRU, metaDescriptionEN, metaKeywordsRU, metaKeywordsEN )
VALUES ( 'collection', 'arTE | Коллекция', 'arTE | collection', '', '', '', '' );

INSERT INTO pages ( pageLink, titleRU, titleEN, metaDescriptionRU, metaDescriptionEN, metaKeywordsRU, metaKeywordsEN )
VALUES ( 'picture', 'arTE | Картина', 'arTE | picture', '', '', '', '' );

INSERT INTO pages ( pageLink, titleRU, titleEN, metaDescriptionRU, metaDescriptionEN, metaKeywordsRU, metaKeywordsEN )
VALUES ( 'authors', 'arTE | Авторы', 'arTE | authors', '', '', '', '' );

INSERT INTO pages ( pageLink, titleRU, titleEN, metaDescriptionRU, metaDescriptionEN, metaKeywordsRU, metaKeywordsEN )
VALUES ( 'painter', 'arTE | Автор', 'arTE | painter', '', '', '', '' );

INSERT INTO pages ( pageLink, titleRU, titleEN, metaDescriptionRU, metaDescriptionEN, metaKeywordsRU, metaKeywordsEN )
VALUES ( 'events', 'arTE | Арт-пространство', 'arTE | art space', '', '', '', '' );

INSERT INTO pages ( pageLink, titleRU, titleEN, metaDescriptionRU, metaDescriptionEN, metaKeywordsRU, metaKeywordsEN )
VALUES ( 'article', 'arTE | Афиша', 'arTE | article', '', '', '', '' );

INSERT INTO pages ( pageLink, titleRU, titleEN, metaDescriptionRU, metaDescriptionEN, metaKeywordsRU, metaKeywordsEN )
VALUES ( 'delivery', 'arTE | Доставка', 'arTE | delivery', '', '', '', '' );

INSERT INTO pages ( pageLink, titleRU, titleEN, metaDescriptionRU, metaDescriptionEN, metaKeywordsRU, metaKeywordsEN )
VALUES ( 'basket', 'arTE | Корзина', 'arTE | basket', '', '', '', '' );

INSERT INTO pages ( pageLink, titleRU, titleEN, metaDescriptionRU, metaDescriptionEN, metaKeywordsRU, metaKeywordsEN )
VALUES ( '404', 'arTE | 404', 'arTE | 404', '', '', '', '' );