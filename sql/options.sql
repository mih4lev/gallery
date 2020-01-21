CREATE TABLE options (
  address_ru varchar(255) NOT NULL,
  address_en varchar(255) NOT NULL,
  timeline_ru varchar(255) NOT NULL,
  timeline_en varchar(255) NOT NULL,
  phone_ru varchar(255) NOT NULL,
  phone_en varchar(255) NOT NULL,
  email_ru varchar(255) NOT NULL,
  email_en varchar(255) NOT NULL,
  facebook_ru varchar(255) NOT NULL,
  facebook_en varchar(255) NOT NULL,
  instagram_ru varchar(255) NOT NULL,
  instagram_en varchar(255) NOT NULL
);

INSERT INTO options (
    address_ru,
    address_en,
    timeline_ru,
    timeline_en,
    phone_ru,
    phone_en,
    email_ru,
    email_en,
    facebook_ru,
    facebook_en,
    instagram_ru,
    instagram_en
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