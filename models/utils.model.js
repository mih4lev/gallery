const sharp = require(`sharp`);

const requestLanguage = (request) => {
    const {
        headers: { 'accept-language': headerLanguage },
        cookies: { language: cookieLanguage }
    } = request;
    return (cookieLanguage) ? cookieLanguage : headerLanguage.substr(0, 2);
};

const savePhoto = async (fileDir, { filename, path }, width, height) => {
    await sharp(path)
        .resize(width, height)
        .webp({ quality: 100 })
        .toFile(`${fileDir}/${filename}.webp`);
    await sharp(path)
        .resize(width, height)
        .png({ quality: 100 })
        .toFile(`${fileDir}/${filename}.png`); 
};

const saveThumb = async (fileDir, { filename, path }, width, height) => {
    await sharp(path)
        .resize(width, height)
        .webp({ quality: 100 })
        .toFile(`${fileDir}/thumbs/${filename}_${width}x${height}.webp`);
    await sharp(path)
        .resize(width, height)
        .png({ quality: 100 })
        .toFile(`${fileDir}/thumbs/${filename}_${width}x${height}.png`); 
};

module.exports = { requestLanguage, savePhoto, saveThumb };