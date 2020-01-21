SELECT 
    events.event_id,
    events.category_id,
    events.event_title_ru,
    events.event_title_en,
    events.event_annotaion_ru,
    events.event_annotaion_en,
    events.event_text_ru,
    events.event_text_en,
    categories.category_title_ru,
    categories.category_title_en,
    categories.category_link
FROM events
JOIN categories 
ON categories.category_id = events.category_id;