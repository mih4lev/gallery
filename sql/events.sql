CREATE TABLE categories (
    categoryID serial,
    categoryTitleRU varchar(64) UNIQUE NOT NULL,
    categoryTitleEN varchar(64) UNIQUE NOT NULL,
    categoryLink varchar(64) UNIQUE NOT NULL
);

INSERT INTO categories (
    categoryTitleRU,
    categoryTitleEN,
    categoryLink
) VALUES (
    'Новости',
    'News',
    'news'
);

INSERT INTO categories (
    categoryTitleRU,
    categoryTitleEN,
    categoryLink
) VALUES (
    'Афиша',
    'poster',
    'posters'
);

CREATE TABLE events (
  eventID serial,
  categoryID int,
  eventTitleRU text UNIQUE NOT NULL,
  eventTitleEN text UNIQUE NOT NULL,
  eventAnnotationRU text NOT NULL,
  eventAnnotationEN text NOT NULL,
  eventTextRU text NOT NULL,
  eventTextEN text NOT NULL
);

INSERT INTO events (
    categoryID,
    eventTitleRU,
    eventTitleEN,
    eventAnnotationRU,
    eventAnnotationEN,
    eventTextRU,
    eventTextEN
) VALUES (
    2,
    'Instagram-интенсив «Теперь так»',
    'Instagram-Intensive Now Now',
    'В процессе работы над партитурами создаются ситуации «встречи», которые понимаются как метафора сложных динамических процессов определения, различения, совместности.',
    'In the process of working on scores, situations of “meeting” are created, which are understood as a metaphor for complex dynamic processes of definition, distinction, and compatibility.',
    '... ru',
    '... en'
);

INSERT INTO events (
    categoryID,
    eventTitleRU,
    eventTitleEN,
    eventAnnotationRU,
    eventAnnotationEN,
    eventTextRU,
    eventTextEN
) VALUES (
    1,
    'Инсталляции группы Numen/For Use «Оклеим Москву»',
    'Installations of the Numen/For Use group “Okleim Moscow”',
    'Во время работы выставки ее посещение будет разбито на четыре акта. В каждом акте выставочное пространство будет менять свои очертания, заметки и артефакты будут сменять друг друга, создавая среду для исполнения партитур приглашенными танцовщиками.',
    'During the exhibition, her visit will be divided into four acts. In each act, the exhibition space will change its shape, notes and artifacts will replace each other, creating an environment for the performance of scores by invited dancers.',
    '... ru',
    '... en'
);

INSERT INTO events (
    categoryID,
    eventTitleRU,
    eventTitleEN,
    eventAnnotationRU,
    eventAnnotationEN,
    eventTextRU,
    eventTextEN
) VALUES (
    1,
    'День открытых дверей в ARTE',
    'Open Day at ARTE”',
    'В процессе работы над партитурами создаются ситуации «встречи», которые понимаются как метафора сложных динамических процессов определения, различения, совместности.',
    'In the process of working on scores, situations of “meeting” are created, which are understood as a metaphor for complex dynamic processes of definition, distinction, and compatibility.',
    '... ru',
    '... en'
);