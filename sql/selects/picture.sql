/* picture && author data */
SELECT 
    pictures.picture_id,
    pictures.author_id,
    pictures.picture_ru,
    pictures.picture_en,
    pictures.picture_size_width,
    pictures.picture_size_height,
    pictures.picture_orientation,
    pictures.picture_price,
    pictures.picture_price_sale,
    pictures.picture_about_ru,
    pictures.picture_about_en,
    authors.author_ru,
    authors.author_en,
    authors.author_photo,
    authors.author_about_ru,
    authors.author_about_en,
    authors.author_city_ru,
    authors.author_city_en 
FROM pictures 
JOIN authors 
ON pictures.author_id = authors.author_id 
WHERE picture_id = 1;

/* colors data */
SELECT 
    color_list.picture_id,
    color_list.color_id,
    colors.color_ru,
    colors.color_en,
    colors.color_name,
    colors.color_hex 
FROM color_list 
JOIN colors 
ON color_list.color_id = colors.color_id 
WHERE color_list.picture_id = 1;

/* genres data */
SELECT
    genre_list.picture_id,
    genre_list.genre_id,
    genres.genre_ru,
    genres.genre_en 
FROM genre_list 
JOIN genres 
ON genre_list.genre_id = genres.genre_id 
WHERE genre_list.picture_id = 1;

/* technique data */
SELECT
    technique_list.picture_id,
    technique_list.technique_id,
    techniques.technique_ru,
    techniques.technique_en 
FROM technique_list 
JOIN techniques 
ON technique_list.technique_id = techniques.technique_id 
WHERE technique_list.picture_id = 1;

/* photos data */
SELECT
    photos.picture_id,
    photos.photo_id,
    photos.photo_name_ru,
    photos.photo_name_en,
    photos.photo_link 
FROM photos 
WHERE photos.picture_id = 1;