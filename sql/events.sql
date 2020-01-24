CREATE TABLE categories (
    categoryID serial,
    categoryLink varchar(64) UNIQUE NOT NULL,
    categoryTitleRU varchar(64) UNIQUE NOT NULL,
    categoryTitleEN varchar(64) UNIQUE NOT NULL
);

INSERT INTO categories (
    categoryLink,
    categoryTitleRU,
    categoryTitleEN
) VALUES (
    'news',
    'Новости',
    'News'
);

INSERT INTO categories (
    categoryLink,
    categoryTitleRU,
    categoryTitleEN
) VALUES (
    'posters',
    'Афиша',
    'poster'
);

CREATE TABLE events (
  eventID serial,
  categoryID int(6) NOT NULL,
  eventTitleRU text NOT NULL,
  eventTitleEN text NOT NULL,
  eventAnnotationRU text NOT NULL,
  eventAnnotationEN text NOT NULL,
  eventTextRU text NULL,
  eventTextEN text NULL
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
    'Installations of the Numen/For Use group «Okleim Moscow»',
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