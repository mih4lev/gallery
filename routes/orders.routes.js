const { Router } = require(`express`);
const { collectData } = require(`../models/data.model`);
const { requestOrderList } = require(`../models/orders.model`);

const router = new Router();

router.get(`/`, async (request, response) => {
    const pageLink = `orders`;
    const data = await collectData(request, pageLink);
    if (!data.isAdmin) return response.status(404).redirect(`/404`);
    data.orders = await requestOrderList();
    const deliveryMap = {
        'pickup': `Самовывоз`,
        'courier': `Доставка курьером`,
        'package': `Доставка транспортной компанией`
    };
    const paymentMap = {
        'cash': `Оплата наличными`,
        'online': `Оплата онлайн` 
    };
    const ordersMap = {
        'new': `NEW`,
        'process': `PROCESS`,
        'complete': `COMPLETE`,
        'canceled': 'CANCELED'
    };
    data.orders.forEach((order) => {
        order.delivery = deliveryMap[order.delivery];
        order.payment = paymentMap[order.payment];
        order.statusLabel = order.orderStatus;
        order.orderStatus = ordersMap[order.orderStatus];
        if (!order.orderPictures) return false;
        order.pictures = order.orderPictures.split(`,`);
    });
    console.log(data);
    response.render(pageLink, data);
});

module.exports = router;