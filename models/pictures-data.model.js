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
const photosArray = async (picture) => {
    const { pictureID } = picture;
    const photosQuery = `
        SELECT photoID, photoNameRU, photoNameEN, photoLink 
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
        picture.colors.push(color);
    }
};
const genreArray = async (picture) => {
    const { pictureID } = picture;
    picture.genres = [];
    const genreListQuery = `SELECT genreID FROM genreList WHERE pictureID = ${pictureID}`;
    const genreList = await requestDB(genreListQuery);
    for (const { genreID } of genreList) {
        const genreQuery = `
            SELECT genreID, genreRU, genreEN 
            FROM genres WHERE genreID = '${genreID}'
        `;
        const genre = await requestDB(genreQuery);
        picture.genres.push(genre);
    }
};
const techniqueArray = async (picture) => {
    const { pictureID } = picture;
    picture.techniques = [];
    const techniqueListQuery = `SELECT techniqueID FROM techniqueList WHERE pictureID = ${pictureID}`;
    const techniqueList = await requestDB(techniqueListQuery);
    for (const { techniqueID } of techniqueList) {
        const techniqueQuery = `
            SELECT techniqueID, techniqueRU, techniqueEN 
            FROM techniques WHERE techniqueID = '${techniqueID}'
        `;
        const technique= await requestDB(techniqueQuery);
        picture.techniques.push(technique);
    }
};

module.exports = { 
    authorData, photosArray, colorsArray, genreArray, techniqueArray 
};