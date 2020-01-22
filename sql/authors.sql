CREATE TABLE authors (
  authorID serial,
  authorRU varchar(255) UNIQUE NOT NULL,
  authorEN varchar(255) UNIQUE NOT NULL,
  authorPhoto varchar(255) UNIQUE NOT NULL,
  authorAboutRU text NULL,
  authorAboutEN text NULL,
  authorCityRU varchar(255) NULL,
  authorCityEN varchar(255) NULL
);

CREATE TABLE educations (
  educationID serial,
  authorID int NOT NULL,
  educationYearRU varchar(64) NOT NULL,
  educationYearEN varchar(64) NOT NULL,
  educationRU varchar(255) NOT NULL,
  educationEN varchar(255) NOT NULL
);

CREATE TABLE rewards (
  rewardID serial,
  authorID int NOT NULL,
  rewardYearRU varchar(64) NOT NULL,
  rewardYearEN varchar(64) NOT NULL,
  rewardRU varchar(255) NOT NULL,
  rewardEN varchar(255) NOT NULL
);

CREATE TABLE exhibitions (
  exhibitionID serial,
  authorID int NOT NULL,
  exhibitionYearRU varchar(64) NOT NULL,
  exhibitionYearEN varchar(64) NOT NULL,
  exhibitionRU varchar(255) NOT NULL,
  exhibitionEN varchar(255) NOT NULL
);


INSERT INTO authors ( authorRU, authorEN, authorPhoto, authorAboutRU, authorAboutEN, authorCityRU, authorCityEN )
VALUES ( 'Екатерина Жуковская', 'Ekaterina Zhukovskaya', 'author1_photo.png', '', '', 'Москва', 'Moscow' );


INSERT INTO educations ( authorID, educationYearRU, educationYearEN, educationRU, educationEN )
VALUES ( 
    '1', 
    '2002-2009', 
    '2002-2009', 
    'Московский Академический Художественный Лицей при Российской Академии Художеств.', 
    'Moscow Academic Art Lyceum at the Russian Academy of Arts.'
);

INSERT INTO educations ( authorID, educationYearRU, educationYearEN, educationRU, educationEN )
VALUES ( 
    '1', 
    '2009-2015', 
    '2009-2015', 
    'Московский Академический Художественный Институт им.Сурикова, факультет живописи, мастерская современного искусства под руководством академика Салаховой А.Т. и Оссовского С.П.', 
    'Moscow Academic Art Institute named after Surikov, faculty of painting, workshop of modern art under the guidance of academician Salakhova A.T. and Ossovsky S.P.'
);

INSERT INTO educations ( authorID, educationYearRU, educationYearEN, educationRU, educationEN )
VALUES ( 
    '1', 
    '2014-2015', 
    '2014-2015', 
    'Школа современного искусства «Свободные мастерские» при Музее современного искусства.', 
    'School of modern art "Free workshops" at the Museum of Modern Art.'
);


INSERT INTO rewards ( authorID, rewardYearRU, rewardYearEN, rewardRU, rewardEN )
VALUES ( 
    '1', 
    '2007', 
    '2007', 
    'Награждена золотой медалью Российской Академии Художеств.', 
    'She was awarded the gold medal of the Russian Academy of Arts.'
);

INSERT INTO rewards ( authorID, rewardYearRU, rewardYearEN, rewardRU, rewardEN )
VALUES ( 
    '1', 
    '2015', 
    '2015', 
    'Награждена золотой медалью Российской Академии Художеств.', 
    'She was awarded the gold medal of the Russian Academy of Arts.'
);

INSERT INTO rewards ( authorID, rewardYearRU, rewardYearEN, rewardRU, rewardEN )
VALUES ( 
    '1', 
    'с 2015', 
    'from 2015', 
    'Член Союза Художников России', 
    'Member of the Union of Artists of Russia'
);


INSERT INTO exhibitions ( authorID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN )
VALUES ( 
    '1', 
    '2010', 
    '2010', 
    'Участие в выставке МОСХ России «Молодежная ХХХ», участие в выставке «Молодые художники России», ЦДХ.', 
    'Participation in the exhibition of the Moscow Union of Artists of Russia “Youth XXX”, participation in the exhibition “Young Artists of Russia”, Central House of Artists.'
);

INSERT INTO exhibitions ( authorID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN )
VALUES ( 
    '1', 
    '2013-2015', 
    '2013-2015', 
    'Работала над своими проектами и выставлялась в открытой студии (AidanStudio, ЦСИ Винзавод).', 
    'She worked on her projects and exhibited in an open studio (AidanStudio, Center for Contemporary Art Winzavod).'
);

INSERT INTO exhibitions ( authorID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN )
VALUES ( 
    '1', 
    '2015', 
    '2015', 
    'Участие в выставке «Книга художника» при содействии МОММА иБиблиотеки «Проспект».', 
    'Participation in the exhibition "Artist`s Book" with the assistance of MOMMA and the Prospect Library.'
);

INSERT INTO exhibitions ( authorID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN )
VALUES ( 
    '1', 
    '2015', 
    '2015', 
    'Участие в выставке «ONLINE/OFFLINE», ЦСИ Винзавод AidanStudio.', 
    'Participation in the exhibition "ONLINE / OFFLINE", AIC Winery AidanStudio.'
);

INSERT INTO exhibitions ( authorID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN )
VALUES ( 
    '1', 
    '2015', 
    '2015', 
    'Участие в выставке «SUB OBSERVATIONEM», Московский Музей Современного Искусства.', 
    'Participation in the exhibition "SUB OBSERVATIONEM", Moscow Museum of Modern Art.'
);

INSERT INTO exhibitions ( authorID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN )
VALUES ( 
    '1', 
    '2015', 
    '2015', 
    'Участие в выставке «EGOCENTRIYA», ЦСИ Винзавод, Цех Красного.', 
    'Participation in the exhibition "EGOCENTRIYA", CSI Winery, Red Shop.'
);

INSERT INTO exhibitions ( authorID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN )
VALUES ( 
    '1', 
    '2015', 
    '2015', 
    'Участие в выставке «Это мое место», TotalArtClub.', 
    'Participation in the exhibition "This is my place", TotalArtClub.'
);

INSERT INTO exhibitions ( authorID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN )
VALUES ( 
    '1', 
    '2016', 
    '2016', 
    'Участие в выставке “Я хочу”, AidanStudio ЦСИ Винзавод', 
    'Participation in the exhibition "I want", AidanStudio Center for Contemporary Art Winery'
);

INSERT INTO exhibitions ( authorID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN )
VALUES ( 
    '1', 
    '2016', 
    '2016', 
    'Участие в V Московской международной биеннале молодого искусства, галерея FineArt.', 
    'Participation in the V Moscow International Biennale of Young Art, FineArt Gallery.'
);

INSERT INTO exhibitions ( authorID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN )
VALUES ( 
    '1', 
    '2017', 
    '2017', 
    'Участие в выставке “Июнь 22. На стороне человека”, галерея ЗДЕСЬ на Таганке.', 
    'Participation in the exhibition “June 22. On the human side”, the gallery is HERE on Taganka.'
);

INSERT INTO exhibitions ( authorID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN )
VALUES ( 
    '1', 
    '2017', 
    '2017', 
    'Участие в выставке «Виновен», Московский Музей Современного Искусства.', 
    'Participation in the exhibition "Guilty", Moscow Museum of Modern Art.'
);

INSERT INTO exhibitions ( authorID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN )
VALUES ( 
    '1', 
    '2017', 
    '2017', 
    'Участие в выставке «Там, где никому не снятся сны: от священнойгеографии к не-месту», Московский Музей Современного Искусства.', 
    'Participation in the exhibition "Where Nobody Dreams: From Sacred Geography to No-Place", Moscow Museum of Modern Art.'
);

INSERT INTO exhibitions ( authorID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN )
VALUES ( 
    '1', 
    '2018', 
    '2018', 
    'Участие в фестивале Пикник “Афиша”, инсталляция «Sexy Selfie»', 
    'Participation in the “Picnic” Picnic festival, installation “Sexy Selfie”'
);

INSERT INTO exhibitions ( authorID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN )
VALUES ( 
    '1', 
    '2018', 
    '2018', 
    'Участие в выставке "5 лайфаков для чайников" , Omelchenko Gallery, паралельная программа 6 Московской международной биеннале молодого искусства', 
    'Participation in the exhibition "5 Life-Crafts for Dummies", Omelchenko Gallery, parallel program of the 6th Moscow International Biennale for Young Art'
);

INSERT INTO exhibitions ( authorID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN )
VALUES ( 
    '1', 
    '2019', 
    '2019', 
    'Liza Tulchinskaya. Mimicry ", WUK, Vienna', 
    'Liza Tulchinskaya. Mimicry ", WUK, Vienna'
);