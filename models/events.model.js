const { requestDB } = require(`../models/db.model`);

// INSERT | CREATE
const saveEvent = async (params) => {
    const {
        eventLink, categoryID, eventTitleRU, eventTitleEN,
        eventAnnotationRU, eventAnnotationEN, eventTextRU, eventTextEN
    } = params;
    const query = `
        INSERT INTO events (
            eventLink, categoryID, 
            eventTitleRU, eventTitleEN,
            eventAnnotationRU, eventAnnotationEN, 
            eventTextRU, eventTextEN
        ) VALUES (
            '${eventLink}', '${categoryID}', 
            '${eventTitleRU}', '${eventTitleEN}', 
            '${eventAnnotationRU}', '${eventAnnotationEN}',
            '${eventTextRU}', '${eventTextEN}'
        )`;
    try {
        const { insertId } = await requestDB(query);
        return {
            code: (insertId) ? 200 : 0,
            result: (insertId) ? `event added` : `event add error`,
            insertID: insertId
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// SELECT | READ
const requestEventList = async () => {
    const query = `SELECT * FROM events`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `events not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestEvent = async (eventLink) => {
    const query = `SELECT * FROM events WHERE eventLink = '${eventLink}'`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `event ${eventLink} not found` };
        return (data.length) ? data[0] : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestEventWithID = async (eventID) => {
    const query = `SELECT * FROM events WHERE eventID = '${eventID}'`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `event with ID ${eventID} not found` };
        return (data.length) ? data[0] : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestLanguageEvent = async (eventLink, language) => {
    const lang = language.toUpperCase();
    const query = `
        SELECT
            events.eventID as eventID, events.eventTitle${lang} as eventTitle, 
            events.eventAnnotation${lang} as eventAnnotation, events.eventText${lang} as eventText,
            events.eventPhoto as eventPhoto, categories.categoryLink as categoryLink, 
            categoryTitle${lang} as categoryTitle
        FROM events 
        INNER JOIN categories on events.categoryID = categories.categoryID
        WHERE eventLink = '${eventLink}'`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `event ${eventLink} not found` };
        return (data.length) ? data[0] : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// UPDATE
const updateEvent = async (eventID, params) => {
    const {
        eventLink, categoryID, eventTitleRU, eventTitleEN,
        eventAnnotationRU, eventAnnotationEN, eventTextRU, eventTextEN
    } = params;
    const query = `
        UPDATE events SET 
            eventLink = '${eventLink}', categoryID = '${categoryID}', 
            eventTitleRU = '${eventTitleRU}', eventTitleEN = '${eventTitleEN}',
            eventAnnotationRU = '${eventAnnotationRU}', 
            eventAnnotationEN = '${eventAnnotationEN}',
            eventTextRU = '${eventTextRU}', eventTextEN = '${eventTextEN}'
        WHERE eventID = ${eventID}`;
    try {
        const { changedRows } = await requestDB(query);
        const updateMessage = (changedRows) ? `updated` : `not found`;
        return {
            code: (changedRows) ? 200 : 404,
            result: `event ${eventID} ${updateMessage}`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// DELETE
const deleteEvent = async (eventID) => {
    const query = `DELETE FROM events WHERE eventID = ${eventID}`;
    try {
        const { affectedRows } = await requestDB(query);
        const deleteMessage = (affectedRows) ? `deleted` : `not found`;
        return {
            code: (affectedRows) ? 200 : 404,
            result: `category ${eventID} ${deleteMessage}`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = {
    saveEvent, requestEventList, requestEvent,
    requestEventWithID, requestLanguageEvent, updateEvent,
    deleteEvent
};