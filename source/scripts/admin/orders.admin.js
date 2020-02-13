const deleteOrder = async (orderNumber) => {
    const bodyNode = document.querySelector(`body`);
    const deleteTemplate = document.querySelector(`.orderDeleteTemplate`);
    const templateClone = deleteTemplate.content.cloneNode(true);
    const editWrapper = templateClone.querySelector(`.editWrapper`);
    const headerNumber = editWrapper.querySelector(`.orderNumber`);
    headerNumber.innerText = orderNumber;
    const mainButton = editWrapper.querySelector(`.mainButton`);
    mainButton.addEventListener(`click`, async (event) => {
        event.preventDefault();
        const fetchOptions = { method: `DELETE` };
        const response = await fetch(`/api/orders/${orderNumber}`, fetchOptions);
        const data = await response.json();
        if (data.code === 200) {
            const ordersTable = document.querySelector(`.ordersTable`);
            const orderNode = ordersTable.querySelector(`.ordersLine--active`);
            ordersTable.removeChild(orderNode);
        }
        bodyNode.removeChild(editWrapper);
    });
    const closeButton = editWrapper.querySelector(`.closeButton`);
    closeButton.addEventListener(`click`, () => {
        bodyNode.removeChild(editWrapper);
    });
    bodyNode.appendChild(editWrapper);
};

const updateStatus = async (orderNumber, status) => {
    const orderSelector = `.ordersLine[data-order-number="${orderNumber}"]`;
    const orderBlock = document.querySelector(orderSelector);
    const buttons = [...orderBlock.querySelectorAll(`.orderStatusButton`)];
    const fetchOptions = {
        method: `PUT`,
        headers: {
            'Content-Type': `application/json;charset=utf-8`
        },
        body: JSON.stringify({ status })
    };
    const response = await fetch(`/api/orders/status/${orderNumber}`, fetchOptions);
    const data = await response.json();
    if (data.code === 200) {
        buttons.forEach((button) => {
            button.classList.remove(`orderStatusButton--active`);
            const activeSelector = `.orderStatusButton[data-status="${status}"]`;
            const activeButton = orderBlock.querySelector(activeSelector);
            activeButton.classList.add(`orderStatusButton--active`);
        });
        //
        const orderStatusNode = orderBlock.querySelector(`.orderStatus`);
        orderStatusNode.dataset.status = status;
        orderStatusNode.innerText = status;
        //
        orderBlock.dataset.status = status;
    }
};

const changeStatus = async (orderNumber, status) => {
    // show template
    const bodyNode = document.querySelector(`body`);
    const changeTemplate = document.querySelector(`.orderStatusChangeTemplate`);
    const templateClone = changeTemplate.content.cloneNode(true);
    const editWrapper = templateClone.querySelector(`.editWrapper`);
    const headerNumber = editWrapper.querySelector(`.orderNumber`);
    headerNumber.innerText = orderNumber;
    const mainButton = editWrapper.querySelector(`.mainButton`);
    mainButton.addEventListener(`click`, async (event) => {
        event.preventDefault();
        await updateStatus(orderNumber, status);
        bodyNode.removeChild(editWrapper);
    });
    const closeButton = editWrapper.querySelector(`.closeButton`);
    closeButton.addEventListener(`click`, () => {
        bodyNode.removeChild(editWrapper);
    });
    bodyNode.appendChild(editWrapper);
};

const showPictures = async (orderNumber) => {
    const response = await fetch(`/api/orders/${orderNumber}`);
    const data = await response.json();
    const format = (value) => value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    const template = document.querySelector(`.orderPictures`);
    const templateClone = template.content.cloneNode(true);
    const orderPictureList = templateClone.querySelector(`.orderPictureList`);
    const orderPictureTemplate = templateClone.querySelector(`.orderPicture`);
    const orderPictureClone = orderPictureTemplate.cloneNode(true);
    const orderPriceWrapper = templateClone.querySelector(`.orderPriceWrapper`);
    const orderPriceMain = orderPriceWrapper.querySelector(`.orderPrice--main`);
    const orderPriceOld = orderPriceWrapper.querySelector(`.orderPrice--old`);
    orderPictureList.innerHTML = ``;
    const { orderPictures, orderStatus } = data;
    const totalMainPriceReduce = (sum, { picturePrice, picturePriceSale }) => {
        const price = (picturePriceSale && picturePriceSale !== 0) ? picturePriceSale : picturePrice;
        return sum + price;
    };
    const totalOldPriceReduce = (sum, { picturePrice }) => sum + picturePrice;
    const totalMainPrice = orderPictures.reduce(totalMainPriceReduce, 0);
    const totalOldPrice = orderPictures.reduce(totalOldPriceReduce, 0);
    orderPriceMain.innerText = format(String(totalMainPrice));
    orderPriceOld.innerText = format(String(totalOldPrice));
    if (totalMainPrice === totalOldPrice) orderPriceWrapper.removeChild(orderPriceOld);
    // client info
    const orderClientWrapper = templateClone.querySelector(`.orderClientWrapper`);
    const clientFields = [...templateClone.querySelectorAll(`.clientWrapper`)];
    clientFields.forEach((field) => {
        const fieldSpan = field.querySelector(`span`);
        const fieldName = fieldSpan.classList[0];
        if (!data[fieldName]) {
            return orderClientWrapper.removeChild(field);
        }
        field.innerText = data[fieldName];
    });
    // buttons
    const orderButtons = [...templateClone.querySelectorAll(`.orderStatusButton`)];
    orderButtons.forEach((button) => {
        const { dataset: { status }} = button;
        if (status === orderStatus) button.classList.add(`orderStatusButton--active`);
        button.addEventListener(`click`, async () => {
            if (status === `delete`) {
                return await deleteOrder(orderNumber);
            }
            await changeStatus(orderNumber, status);
        });
    });
    //
    orderPictures.forEach((pictureData) => {
        const {
            pictureID, picture, authorID, author, picturePrice, picturePriceSale,
            photos: { 0: { photoLink }}
        } = pictureData;
        const pictureClone = orderPictureClone.cloneNode(true);
        const pictureLink = pictureClone.querySelector(`.pictureLink`);
        pictureLink.innerText = picture;
        pictureLink.setAttribute(`href`, `/collection/${pictureID}`);
        const authorLink = pictureClone.querySelector(`.pictureAuthorLink`);
        authorLink.innerText = author;
        authorLink.setAttribute(`href`, `/authors/${authorID}`);
        const picturePhoto = pictureClone.querySelector(`.picturePhoto`);
        picturePhoto.setAttribute(`alt`, picture);
        picturePhoto.src = `/photos/pictures/thumbs/${photoLink}_56x56.png`;
        const picturePriceWrapper = pictureClone.querySelector(`.picturePriceWrapper`);
        const pictureMainPrice = pictureClone.querySelector(`.picturePrice--main`);
        const pictureOldPrice = pictureClone.querySelector(`.picturePrice--old`);
        if (picturePriceSale && picturePriceSale !== 0) {
            pictureMainPrice.innerText = picturePriceSale;
            pictureOldPrice.innerText = picturePrice;
        } else {
            pictureMainPrice.innerText = picturePrice;
            picturePriceWrapper.removeChild(pictureOldPrice);
        }
        //
        orderPictureList.appendChild(pictureClone);
    });
    //
    return templateClone;
};

export const showOrders = () => {
    const orders = [...document.querySelectorAll(`.ordersLine`)];
    if (!orders.length) return false;
    orders.forEach((order) => {
        order.addEventListener(`click`, async () => {
            if (order.classList.contains(`ordersLine--active`)) return false;
            orders.forEach((order) => {
                order.classList.remove(`ordersLine--active`);
                const picturesDataNode = order.querySelector(`.orderPicturesWrapper`);
                if (!picturesDataNode) return false;
                order.removeChild(picturesDataNode);
            });
            const { dataset: { orderNumber }} = order;
            order.classList.add(`ordersLine--active`);
            const picturesWrapper = await showPictures(orderNumber);
            order.appendChild(picturesWrapper);
        });
    });
};