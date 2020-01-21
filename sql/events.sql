CREATE TABLE categories (
    category_id serial,
    category_title_ru varchar(64) UNIQUE NOT NULL,
    category_title_en varchar(64) UNIQUE NOT NULL,
    category_link varchar(64) UNIQUE NOT NULL
);

INSERT INTO categories (
    category_title_ru, 
    category_title_en, 
    category_link
) VALUES (
    'Новости',
    'News',
    'news'
);

INSERT INTO categories (
    category_title_ru, 
    category_title_en, 
    category_link
) VALUES (
    'Афиша',
    'poster',
    'posters'
);

CREATE TABLE events (
  event_id serial,
  category_id int,
  event_title_ru text UNIQUE NOT NULL,
  event_title_en text UNIQUE NOT NULL,
  event_annotaion_ru text NOT NULL,
  event_annotaion_en text NOT NULL,
  event_text_ru text NOT NULL,
  event_text_en text NOT NULL
);

INSERT INTO events (
    category_id,
    event_title_ru,
    event_title_en,
    event_annotaion_ru,
    event_annotaion_en,
    event_text_ru,
    event_text_en
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
    category_id,
    event_title_ru,
    event_title_en,
    event_annotaion_ru,
    event_annotaion_en,
    event_text_ru,
    event_text_en
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
    category_id,
    event_title_ru,
    event_title_en,
    event_annotaion_ru,
    event_annotaion_en,
    event_text_ru,
    event_text_en
) VALUES (
    1,
    'День открытых дверей в ARTE',
    'Open Day at ARTE”',
    'В процессе работы над партитурами создаются ситуации «встречи», которые понимаются как метафора сложных динамических процессов определения, различения, совместности.',
    'In the process of working on scores, situations of “meeting” are created, which are understood as a metaphor for complex dynamic processes of definition, distinction, and compatibility.',
    '... ru',
    '... en'
);