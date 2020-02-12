const nodemailer = require('nodemailer');
const hbsNodemailer = require('nodemailer-express-handlebars');

const createTransport = () => {
    try {
        const hbsOptions = {
            viewEngine: {
                extname: '.hbs',
                layoutsDir: 'views/layouts/',
                defaultLayout : 'mail-template',
                partialsDir : 'views/partials/'
            },
            viewPath: 'views/email/',
            extName: '.hbs'
        };
        const transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
            secure: true,
            auth: {
                user: "sales@artegallery.ru",
                pass: "arte2020sales"
            }
        });
        transporter.use('compile', hbsNodemailer(hbsOptions));
        return transporter;
    } catch (error) {
        return console.log('Error: ' + error.name + ":" + error.message);
    }
};

const sendClientMail = async (orderNumber, typedData) => {
    try {
        const { clientEmail } = typedData;
        const sendData = Object.assign(typedData, { orderNumber });
        let mailOptions = {
            from: `sales@artegallery.ru`,
            to: `${clientEmail}`,
            subject: `Ваш заказ на сайте artegallery.ru`,
            template: `client-order`,
            context: sendData
        };
        await createTransport().sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
};

const sendOwnerMail = async (orderNumber, typedData) => {
    try {
        const sendData = Object.assign(typedData, { orderNumber });
        let mailOptions = {
            from: `sales@artegallery.ru`,
            to: `sales@artegallery.ru`,
            subject: `Оформлен заказ #${orderNumber} на сайте artegallery.ru`,
            template: `owner-order`,
            context: sendData
        };
        await createTransport().sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { sendClientMail, sendOwnerMail };