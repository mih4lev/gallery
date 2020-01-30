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
const photosArray = async (picture, language) => {
    const { pictureID } = picture;
    const lang = language.toUpperCase();
    const photosQuery = `
        SELECT photoID, photoName${lang} as photoName, photoLink, thumbLink
        FROM photos WHERE pictureID = ${pictureID}
    `;
    picture.photos = await requestDB(photosQuery);
};
const colorsArray = async (picture) => {
    const { pictureID } = picture;
    picture.colors = [];
    const colorListQuery = `SELECT colorID FROM colorList WHERE pictureID = ${pictureID}`;
    const colorList = await requestDB(colorListQuery);
    for (const { colorID } of colorList) {
        const colorQuery = `
            SELECT colorID, colorRU, colorEN, colorName, colorHEX
            FROM colors WHERE colorID = '${colorID}'
        `;
        const color = await requestDB(colorQuery);
        picture.colors.push(color[0]);
    }
};
const genreArray = async (picture, language) => {
    const { pictureID } = picture;
    const lang = language.toUpperCase();
    picture.genres = [];
    const genreListQuery = `SELECT genreID FROM genreList WHERE pictureID = ${pictureID}`;
    const genreList = await requestDB(genreListQuery);
    for (const { genreID } of genreList) {
        const genreQuery = `
            SELECT genreID, genre${lang} as genre
            FROM genres WHERE genreID = '${genreID}'
        `;
        const genre = await requestDB(genreQuery);
        picture.genres.push(genre[0]);
    }
};
const techniqueArray = async (picture, language) => {
    const { pictureID } = picture;
    const lang = language.toUpperCase();
    picture.techniques = [];
    const techniqueListQuery = `SELECT techniqueID FROM techniqueList WHERE pictureID = ${pictureID}`;
    const techniqueList = await requestDB(techniqueListQuery);
    for (const { techniqueID } of techniqueList) {
        const techniqueQuery = `
            SELECT techniqueID, technique${lang} as technique
            FROM techniques WHERE techniqueID = '${techniqueID}'
        `;
        const technique= await requestDB(techniqueQuery);
        picture.techniques.push(technique[0]);
    }
};

module.exports = { 
    authorData, photosArray, colorsArray, genreArray, techniqueArray 
};