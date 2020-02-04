const sharp = require(`sharp`);

const requestLanguage = (request) => {
    const {
        headers: { 'accept-language': headerLanguage },
        cookies: { language: cookieLanguage }
    } = request;
    return (cookieLanguage) ? cookieLanguage : headerLanguage.substr(0, 2);
};

const savePhoto = async (fileDir, { filename, path }, width, height) => {
    if (height) {
        await sharp(path)
            .resize(width, height)
            .webp({ quality: 80 })
            .toFile(`${fileDir}/${filename}.webp`);
        await sharp(path)
            .resize(width, height)
            .png({ quality: 80, compressionLevel: 7 })
            .toFile(`${fileDir}/${filename}.png`);
    } else {
        await sharp(path)
            .resize(width)
            .webp({ quality: 80 })
            .toFile(`${fileDir}/${filename}.webp`);
        await sharp(path)
            .resize(width)
            .png({ quality: 80, compressionLevel: 7 })
            .toFile(`${fileDir}/${filename}.png`);
    }
};

const saveOriginal = async (fileDir, { filename, path }) => {
    await sharp(path)
        .webp({ quality: 80 })
        .toFile(`${fileDir}/original/${filename}.webp`);
    await sharp(path)
        .jpeg({ quality: 80 })
        .toFile(`${fileDir}/original/${filename}.jpg`);
};

const saveOriginalThumb = async (fileDir, { filename, path }, width) => {
    await sharp(path)
        .resize(width)
        .webp({ quality: 80 })
        .toFile(`${fileDir}/original/${filename}_preview.webp`);
    await sharp(path)
        .resize(width)
        .jpeg({ quality: 80 })
        .toFile(`${fileDir}/original/${filename}_preview.jpg`);
};

const saveThumb = async (fileDir, { filename, path }, width, height) => {
    await sharp(path)
        .resize(width, height)
        .webp({ quality: 80 })
        .toFile(`${fileDir}/thumbs/${filename}_${width}x${height}.webp`);
    await sharp(path)
        .resize(width, height)
        .png({ quality: 80, compressionLevel: 7 })
        .toFile(`${fileDir}/thumbs/${filename}_${width}x${height}.png`);
};

module.exports = {
    requestLanguage, savePhoto, saveThumb, saveOriginal, saveOriginalThumb
};