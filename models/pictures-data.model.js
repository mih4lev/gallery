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
    const colorListQuery = `SELECT colorID FROM colorList WHERE pictureID = ${pictureID}`;
    const colorList = await requestDB(colorListQuery);
    for (const { colorID } of colorList) {
        let colorQuery = `
            SELECT colorID, colorRU, colorEN, colorName, colorHEX
            FROM colors WHERE colorID = '${colorID}'
        `;
        if (language) {
            const lang = language.toUpperCase();
            colorQuery = `
                SELECT colorID, color${lang} as color, colorName, colorHEX
                FROM colors WHERE colorID = '${colorID}'
            `;
        }
        const color = await requestDB(colorQuery);
        picture.colors.push(color[0]);
    }
};
const genreArray = async (picture, language) => {
    const { pictureID } = picture;
    picture.genres = [];
    const genreListQuery = `SELECT genreID FROM genreList WHERE pictureID = ${pictureID}`;
    const genreList = await requestDB(genreListQuery);
    for (const { genreID } of genreList) {
        let genreQuery = `
            SELECT genreID, genreRU, genreEN
            FROM genres WHERE genreID = '${genreID}'
        `;
        if (language) {
            const lang = language.toUpperCase();
            genreQuery = `
                SELECT genreID, genre${lang} as genre
                FROM genres WHERE genreID = '${genreID}'
            `;
        }
        const genre = await requestDB(genreQuery);
        picture.genres.push(genre[0]);
    }
};
const techniqueArray = async (picture, language) => {
    const { pictureID } = picture;
    picture.techniques = [];
    const techniqueListQuery = `SELECT techniqueID FROM techniqueList WHERE pictureID = ${pictureID}`;
    const techniqueList = await requestDB(techniqueListQuery);
    for (const { techniqueID } of techniqueList) {
        let techniqueQuery = `
            SELECT techniqueID, techniqueRU, techniqueEN
            FROM techniques WHERE techniqueID = '${techniqueID}'
        `;
        if (language) {
            const lang = language.toUpperCase();
            techniqueQuery = `
                SELECT techniqueID, technique${lang} as technique
                FROM techniques WHERE techniqueID = '${techniqueID}'
            `;
        }
        const technique= await requestDB(techniqueQuery);
        picture.techniques.push(technique[0]);
    }
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