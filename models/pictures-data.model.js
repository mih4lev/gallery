const { requestDB } = require(`./db.model`);

const authorData = async (picture) => {
    const { authorID } = picture;
    const authorQuery = `
        SELECT authorID, authorLink, authorRU, authorEN, authorPhoto
        FROM authors WHERE authorID = '${authorID}'    
    `;
    delete picture.authorID;
    const authodData = await requestDB(authorQuery);
    picture.author = authodData[0];
};
const colorsArray = async (picture, language) => {
    const { pictureID } = picture;
    picture.colors = [];
    let colorQuery = `
        SELECT 
            colors.colorID, colors.colorRU, colors.colorEN, 
            colors.colorName, colors.colorHEX 
        FROM colorList
        INNER JOIN colors ON colors.colorID = colorList.colorID
        WHERE colorList.pictureID = ${pictureID}
    `;
    if (language) {
        const lang = language.toUpperCase();
        let colorQuery = `
            SELECT 
                colors.colorID, colors.color${lang},
                colors.colorName, colors.colorHEX 
            FROM colorList
            INNER JOIN colors ON colors.colorID = colorList.colorID
            WHERE colorList.pictureID = ${pictureID}
        `;
    }
    picture.colors = await requestDB(colorQuery);
};
const genreArray = async (picture, language) => {
    const { pictureID } = picture;
    let genreQuery = `
        SELECT genres.genreID, genreRU, genreEN
        FROM genreList
        INNER JOIN genres ON genres.genreID = genreList.genreID
        WHERE genreList.pictureID = ${pictureID}
    `;
    if (language) {
        const lang = language.toUpperCase();
        genreQuery = `
            SELECT genres.genreID, genres.genre${lang} as genre
            FROM genreList
            INNER JOIN genres ON genres.genreID = genreList.genreID
            WHERE genreList.pictureID = ${pictureID}
        `;
    }
    picture.genres = await requestDB(genreQuery);
};
const techniqueArray = async (picture, language) => {
    const { pictureID } = picture;
    let techniqueQuery = `
        SELECT techniques.techniqueID, techniques.techniqueRU, techniques.techniqueEN
        FROM techniqueList
        INNER JOIN techniques ON techniques.techniqueID = techniqueList.techniqueID
        WHERE techniqueList.pictureID = ${pictureID}
    `;
    if (language) {
        const lang = language.toUpperCase();
        techniqueQuery = `
            SELECT techniques.techniqueID, techniques.technique${lang} as technique
            FROM techniqueList
            INNER JOIN techniques ON techniques.techniqueID = techniqueList.techniqueID
            WHERE techniqueList.pictureID = ${pictureID}
        `;
    }
    picture.techniques = await requestDB(techniqueQuery);
};
const photosArray = async (picture, language) => {
    const { pictureID } = picture;
    let photosQuery = `SELECT * FROM photos WHERE pictureID = ${pictureID}`;
    if (language) {
        const lang = language.toUpperCase();
        photosQuery = `
            SELECT pictureID, photoID, photoName${lang}, photoLink
            FROM photos WHERE pictureID = ${pictureID}`;
    }
    picture.photos = await requestDB(photosQuery);
};
const addGenres = async (pictureID, genresID) => {
    for (const genreID of genresID) {
        const genreQuery = `
                INSERT INTO genreList ( pictureID, genreID ) 
                VALUES ( '${pictureID}', '${genreID}' )
            `;
        await requestDB(genreQuery);
    }
};
const editGenres = async (pictureID, genresID) => {
    const countQuery = `
            SELECT COUNT(genreID) as genresCount 
            FROM genreList WHERE pictureID = ${pictureID}`;
    const { 0: {genresCount }} = await requestDB(countQuery);
    if (genresCount) {
        const deleteQuery = `DELETE FROM genreList WHERE pictureID = ${pictureID}`;
        await requestDB(deleteQuery);
    }
    if (genresID) {
        for (const genreID of genresID) {
            const genreQuery = `
                INSERT INTO genreList ( pictureID, genreID ) 
                VALUES ( '${pictureID}', '${genreID}' )
            `;
            await requestDB(genreQuery);
        }
    }
};
const deleteGenres = async (pictureID) => {
    const deleteQuery = `DELETE FROM genreList WHERE pictureID = ${pictureID}`;
    await requestDB(deleteQuery);
};

const addTechniques = async (pictureID, techniquesID) => {
    for (const techniqueID of techniquesID) {
        const techniqueQuery = `
                INSERT INTO techniqueList ( pictureID, techniqueID ) 
                VALUES ( '${pictureID}', '${techniqueID}' )
            `;
        await requestDB(techniqueQuery);
    }
};
const editTechniques = async (pictureID, techniquesID) => {
    const countQuery = `
            SELECT COUNT(techniqueID) as techniqueCount 
            FROM techniqueList WHERE pictureID = ${pictureID}`;
    const { 0: { techniqueCount }} = await requestDB(countQuery);
    if (techniqueCount) {
        const deleteQuery = `DELETE FROM techniqueList WHERE pictureID = ${pictureID}`;
        await requestDB(deleteQuery);
    }
    if (techniquesID) {
        for (const techniqueID of techniquesID) {
            const techniqueQuery = `
                INSERT INTO techniqueList ( pictureID, techniqueID ) 
                VALUES ( '${pictureID}', '${techniqueID}' )
            `;
            await requestDB(techniqueQuery);
        }
    }
};
const deleteTechniques = async (pictureID) => {
    const deleteQuery = `DELETE FROM techniqueList WHERE pictureID = ${pictureID}`;
    await requestDB(deleteQuery);
};

const addColors = async (pictureID, colorsID) => {
    for (const colorID of colorsID) {
        const colorQuery = `
                INSERT INTO colorList ( pictureID, colorID ) 
                VALUES ( '${pictureID}', '${colorID}' )
            `;
        await requestDB(colorQuery);
    }
};
const editColors = async (pictureID, colorsID) => {
    const countQuery = `
            SELECT COUNT(colorID) as colorCount 
            FROM colorList WHERE pictureID = ${pictureID}`;
    const { 0: { colorCount }} = await requestDB(countQuery);
    if (colorCount) {
        const deleteQuery = `DELETE FROM colorList WHERE pictureID = ${pictureID}`;
        await requestDB(deleteQuery);
    }
    if (colorsID) {
        for (const colorID of colorsID) {
            const colorQuery = `
                INSERT INTO colorList ( pictureID, colorID ) 
                VALUES ( '${pictureID}', '${colorID}' )
            `;
            await requestDB(colorQuery);
        }
    }
};
const deleteColors = async (pictureID) => {
    const deleteQuery = `DELETE FROM colorList WHERE pictureID = ${pictureID}`;
    await requestDB(deleteQuery);
};

module.exports = { 
    authorData, photosArray, colorsArray,
    genreArray, techniqueArray,
    addGenres, editGenres, deleteGenres,
    addTechniques, editTechniques, deleteTechniques,
    addColors, editColors, deleteColors
};