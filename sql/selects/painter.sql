/* request single author data */
SELECT 
    authors.author_id,
    authors.author_ru,
    authors.author_en,
    authors.author_photo,
    authors.author_about_ru,
    authors.author_about_en,
    authors.author_city_ru,
    authors.author_city_en
FROM authors 
WHERE authors.author_id = 1;

/* request author => education data */
SELECT 
    educations.author_id,
    educations.education_id,
    educations.education_year_ru,
    educations.education_year_en,
    educations.education_ru,
    educations.education_en
FROM educations
WHERE educations.author_id = 1;

/* request author => rewards data */
SELECT 
    rewards.author_id,
    rewards.reward_id,
    rewards.reward_year_ru,
    rewards.reward_year_en,
    rewards.reward_ru,
    rewards.reward_en
FROM rewards
WHERE rewards.author_id = 1;

/* request author => exhibitions data */
SELECT 
    exhibitions.author_id,
    exhibitions.exhibition_id,
    exhibitions.exhibition_year_ru,
    exhibitions.exhibition_year_en,
    exhibitions.exhibition_ru,
    exhibitions.exhibition_en
FROM exhibitions
WHERE exhibitions.author_id = 1;