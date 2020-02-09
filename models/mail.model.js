const nodemailer = require('nodemailer');

const sendClientMail = async (orderNumber, typedData) => {
    const {
        delivery, payment, clientName, clientPhone,
        clientEmail, clientComment, clientCity, clientAddress,
        orderPictures
    } = typedData;
    let transporter;
    try {
        transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
          user: "sales@artegallery.ru",
          pass: "arte2020sales"
        }
      });
    } catch (error) {
      return console.log('Error: ' + error.name + ":" + error.message);
    }
    const mailData = `
        <table style="background-color: #000; width: 100%;">
            <tr>
                <td>
                    <table style="width: 100%">
                        <tr>
                            <td style="font-size: 16px; color: #FFF;">order # ${orderNumber}</td>
                        </tr>
                        <tr>
                            <td style="color: #FFF;">Тип доставки: ${delivery}</td>
                        </tr>
                        <tr>
                            <td style="color: #FFF;">Оплата: ${payment}</td>
                        </tr>
                        <tr>
                            <td style="color: #FFF;">Имя: ${clientName}</td>
                        </tr>
                        <tr>
                            <td style="color: #FFF;">Телефон: ${clientPhone}</td>
                        </tr>
                        <tr>
                            <td style="color: #FFF;">E-mail: <a style="color: #FFF;" href="mailto:${clientEmail}">${clientEmail}</a></td>
                        </tr>
                        <tr>
                            <td style="color: #FFF;">Комментарий: ${clientComment}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    `; 
    let mailOptions = {
        from: `sales@artegallery.ru`,
        to: `${clientEmail}`,
        subject: `Спасибо за заказ на artegallery.ru`,
        text: `Вы сделали заказ #${orderNumber} на сайте artegallery.ru`,
        html: mailData
    };
    await transporter.sendMail(mailOptions);
};

const sendOwnerMail = async (orderNumber, typedData) => {
    const {
        delivery, payment, clientName, clientPhone,
        clientEmail, clientComment, clientCity, clientAddress,
        orderPictures
    } = typedData;
    let transporter;
    try {
        transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
          user: "sales@artegallery.ru",
          pass: "arte2020sales"
        }
      });
    } catch (error) {
      return console.log('Error: ' + error.name + ":" + error.message);
    }
    const mailData = `
        <table style="background-color: #000; width: 100%;">
            <tr>
                <td>
                    <table style="width: 100%">
                        <tr>
                            <td style="font-size: 16px; color: #FFF;">order # ${orderNumber}</td>
                        </tr>
                        <tr>
                            <td style="color: #FFF;">Тип доставки: ${delivery}</td>
                        </tr>
                        <tr>
                            <td style="color: #FFF;">Оплата: ${payment}</td>
                        </tr>
                        <tr>
                            <td style="color: #FFF;">Имя: ${clientName}</td>
                        </tr>
                        <tr>
                            <td style="color: #FFF;">Телефон: ${clientPhone}</td>
                        </tr>
                        <tr>
                        <td style="color: #FFF;">E-mail: <a style="color: #FFF;" href="mailto:${clientEmail}">${clientEmail}</a></td>
                        </tr>
                        <tr>
                            <td style="color: #FFF;">Комментарий: ${clientComment}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    `; 
    let mailOptions = {
        from: `sales@artegallery.ru`,
        to: `sales@artegallery.ru`,
        subject: `Оформлен заказ #${orderNumber} на сайте artegallery.ru`,
        text: `Подробности заказа в теле письма`,
        html: mailData
    };
    await transporter.sendMail(mailOptions);
}

module.exports = { sendClientMail, sendOwnerMail };