const { requestDB } = require(`../models/db.model`);

const saveAuthor = async (params) => {
    const {
        authorRU, authorEN, authorPhoto,
        authorAboutRU, authorAboutEN, authorCityRU, authorCityEN
    } = params;
    console.log(params);
    const query = `INSERT INTO authors (
            authorRU, authorEN, authorPhoto,
            authorAboutRU, authorAboutEN, authorCityRU, authorCityEN
        ) VALUES (
            '${authorRU}', '${authorEN}', '${authorPhoto}',
            '${authorAboutRU}', '${authorAboutEN}', 
            '${authorCityRU}', '${authorCityEN}'
        );
    `;
    // const result = await requestDB(query);
    // console.log(result);
    return {};
    // return {
    //     code: (result.insertId) ? 200 : 0,
    //     result: (result.insertId) ? `author added` : `author add error`,
    //     insertID: result.insertId
    // };
};

module.exports = { saveAuthor };