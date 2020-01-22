CREATE TABLE options (
  addressRU varchar(255) NOT NULL,
  addressEN varchar(255) NOT NULL,
  timelineRU varchar(255) NOT NULL,
  timelineEN varchar(255) NOT NULL,
  phoneRU varchar(255) NOT NULL,
  phoneEN varchar(255) NOT NULL,
  emailRU varchar(255) NOT NULL,
  emailEN varchar(255) NOT NULL,
  facebookRU varchar(255) NOT NULL,
  facebookEN varchar(255) NOT NULL,
  instagramRU varchar(255) NOT NULL,
  instagramEN varchar(255) NOT NULL
);

INSERT INTO options (
    addressRU,
    addressEN,
    timelineRU,
    timelineEN,
    phoneRU,
    phoneEN,
    emailRU,
    emailEN,
    facebookRU,
    facebookEN,
    instagramRU,
    instagramEN
) VALUES (
    'Адрес: ул. Рождественская д.5', 
    'Address: Rozhdestvenskaya St. 5',
    'Ежедневно с 11.00 - 22.00',
    'Daily from 11:00 - 22:00',
    '+7 920 535 55 55',
    '+7 920 535 55 55',
    'e-mail: arTE@gmail.com',
    'e-mail: arTE@gmail.com',
    'art_of_moscoww',
    'art_of_moscoww',
    'art_of_moscoww',
    'art_of_moscoww'
);