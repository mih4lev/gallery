SELECT 
    pages.page_id, 
    pages.title_ru, 
    pages.title_en,
    pages.meta_description_ru,
    pages.meta_description_en,
    pages.meta_keywords_ru,
    pages.meta_keywords_en,
    options.address_ru,
    options.address_en, 
    options.timeline_ru,
    options.timeline_en,
    options.phone_ru,
    options.phone_en,
    options.email_ru,
    options.email_en,
    options.facebook_ru,
    options.facebook_en,
    options.instagram_ru,
    options.instagram_en
FROM pages, options
WHERE pages.page_link = 'home';