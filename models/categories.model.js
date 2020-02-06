const { requestDB } = require(`../models/db.model`);

// INSERT | CREATE
const saveCategory = async (params) => {
    const {
        categoryLink, categoryTitleRU, categoryTitleEN
    } = params;
    const query = `
        INSERT INTO categories (
            categoryLink, categoryTitleRU, categoryTitleEN
        ) VALUES (
            '${categoryLink}', '${categoryTitleRU}', '${categoryTitleEN}'
        )`;
    try {
        const { insertId } = await requestDB(query);
        return {
            code: (insertId) ? 200 : 0,
            result: (insertId) ? `category added` : `category add error`,
            insertID: insertId
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// SELECT | READ
const requestCategoryList = async () => {
    const query = `SELECT * FROM categories`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `categories not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestCategory = async (categoryLink) => {
    const query = `SELECT * FROM categories WHERE categoryLink = '${categoryLink}'`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `category ${categoryLink} not found` };
        return (data.length) ? data[0] : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestCategoryEvents = async(categoryLink) => {
    try {
        const categoryLinkQuery = `
            SELECT categoryID FROM categories WHERE categoryLink = '${categoryLink}'
        `;
        const categoryResponse = await requestDB(categoryLinkQuery);
        if (!categoryResponse.length) {
            return { code: 0, result: `category ${categoryLink} not found` };
        }
        const { 0: { categoryID }} = categoryResponse;
        const query = `SELECT * FROM events WHERE categoryID = '${categoryID}'`;
        const data = await requestDB(query);
        const errorData = { code: 404, result: `events of ${categoryLink} not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// UPDATE
const updateCategory = async (categoryID, params) => {
    const {
        categoryLink, categoryTitleRU, categoryTitleEN
    } = params;
    const query = `
        UPDATE categories SET 
            categoryLink = '${categoryLink}', 
            categoryTitleRU = '${categoryTitleRU}', 
            categoryTitleEN = '${categoryTitleEN}'
        WHERE categoryID = ${categoryID}`;
    try {
        const { changedRows } = await requestDB(query);
        const updateMessage = (changedRows) ? `updated` : `not found`;
        return {
            code: (changedRows) ? 200 : 404,
            result: `category ${categoryID} ${updateMessage}`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// DELETE
const deleteCategory = async (categoryID) => {
    const query = `DELETE FROM categories WHERE categoryID = ${categoryID}`;
    try {
        const { affectedRows } = await requestDB(query);
        const deleteMessage = (affectedRows) ? `deleted` : `not found`;
        return {
            code: (affectedRows) ? 200 : 404,
            result: `category ${categoryID} ${deleteMessage}`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = {
    saveCategory, requestCategoryList, requestCategory,
    requestCategoryEvents, updateCategory, deleteCategory
};