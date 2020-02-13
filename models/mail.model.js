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

const translateMail = (lang) => {
    const langRU = {
        'clientMailHeader': `Ваш заказ на сайте artegallery.ru`,
        'clientMailThanks': `Спасибо за заказ!`,
        'clientOrderNumber': `номер вашего заказа`,
        'clientDataHeader': `При оформлении заказа вы указали данные:`,
        'clientDeliveryTitle': `Вид доставки:`,
        'clientDeliveryType': `Самовывоз`,
        'clientPaymentTitle': `Способ оплаты:`,
        'clientPaymentType': `Оплата наличными`,
        'clientNameTitle': `Ваше имя:`,
        'clientPhoneTitle': `Телефон:`,
        'clientEmailTitle': `Email:`,
        'clientCommentTitle': `Комментарий к заказу:`,
        'hasQuestionsTitle': `Есть вопросы?`,
        'footerTextPart1': `Это письмо электронной почты было отправлено вам на`,
        'footerTextPart2': `, потому что вы сделали заказ на сайте`
    };
    const langEN = {
        'clientMailHeader': `Your order on the site artegallery.ru`,
        'clientMailThanks': `Thanks for the order!`,
        'clientOrderNumber': `your order number`,
        'clientDataHeader': `When placing the order, you specified the data:`,
        'clientDeliveryTitle': `Delivery type:`,
        'clientDeliveryType': `Pickup`,
        'clientPaymentTitle': `Payment method:`,
        'clientPaymentType': `Cash payment`,
        'clientNameTitle': `Your name:`,
        'clientPhoneTitle': `Phone:`,
        'clientEmailTitle': `Email:`,
        'clientCommentTitle': `Comment on order:`,
        'hasQuestionsTitle': `Any questions?`,
        'footerTextPart1': `This email was sent to you at `,
        'footerTextPart2': `, because you made an order on the site`
    };
    return (lang === `ru`) ? langRU : langEN;
};

const sendClientMail = async (orderNumber, typedData, lang) => {
    try {
        const { clientEmail } = typedData;
        const langData = translateMail(lang);
        const sendData = Object.assign(typedData, langData, { orderNumber });
        let mailOptions = {
            from: `sales@artegallery.ru`,
            to: `${clientEmail}`,
            subject: sendData['clientMailHeader'],
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
            subject: `Оформлен заказ на сайте artegallery.ru`,
            template: `owner-order`,
            context: sendData
        };
        await createTransport().sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { sendClientMail, sendOwnerMail };