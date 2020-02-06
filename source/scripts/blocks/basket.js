import {currency} from "../utils";

const basketWrapper = document.querySelector(`.basketWrapper`);
const orderWrapper = document.querySelector(`.orderWrapper`);

export const cartButtons = async () => {
    const buttons = [...document.querySelectorAll(`.cartButton`)];
    buttons.forEach((button) => {
        button.addEventListener(`click`, () => {
            const { dataset: { pictureId }} = button;
            const pictureID = Number(pictureId);
            const storage = localStorage.getItem(`basket`);
            const basketPictures = (storage) ? JSON.parse(storage) : [];
            basketPictures.push(pictureID);
            localStorage.setItem(`basket`, JSON.stringify(basketPictures));
            button.classList.add(`cartButton--active`);
            // basket icon
            const basketCountNode = document.querySelector(`.basketCount`);
            basketCountNode.innerText = basketPictures.length;
            basketCountNode.classList.add(`basketCount--active`);
            const basketIcon = document.querySelector(`.headerNav--basket`);
            basketIcon.click();
        });
    });
};

const changeCurrency = async (lang, node) => {
    const format = (value) => value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    const isDefault = (lang === `ru`);
    const rate = await currency();
    const { dataset: { rub: valueRub }} = node;
    const valueEuro = Math.round((valueRub / rate) * 100) / 100;
    const value = (isDefault) ? format(valueRub) : valueEuro.toFixed(2);
    const SL = (isDefault) ? [ `euro`, `rub` ] : [ `rub`, `euro` ];
    node.classList.remove(`price--${SL[0]}`);
    node.classList.add(`price--${SL[1]}`);
    node.innerText = value;
    return node;
};

const removePicture = async ({ target }) => {
    const { dataset: { pictureId }} = target;
    const pictureID = Number(pictureId);
    const lang = document.querySelector(`html`).getAttribute(`lang`);
    const basketTableBody = document.querySelector(`.basketTableBody`);
    const deletedPicture = document.querySelector(`.basketItem[data-picture-id="${pictureID}"]`);
    const picturePriceNode = deletedPicture.querySelector(`.picturePrice`);
    const picturePrice = Number(picturePriceNode.dataset.rub);
    basketTableBody.removeChild(deletedPicture);
    // total sum
    const totalSum = document.querySelector(`.basketSummaryValue`);
    const oldValue = Number(totalSum.dataset.rub);
    totalSum.dataset.rub = String(oldValue - picturePrice);
    await changeCurrency(lang, totalSum);
    // remove from localStorage
    const storage = localStorage.getItem(`basket`);
    if (!storage) return false;
    const basketPictures = JSON.parse(storage);
    basketPictures.splice(basketPictures.indexOf(pictureID), 1);
    localStorage.setItem(`basket`, JSON.stringify(basketPictures));
    if (!basketPictures.length) location.href = `/collection`;
};

const cloneTemplate = async (picturesData) => {
    const lang = document.querySelector(`html`).getAttribute(`lang`);
    const priceClass = (lang === `ru`) ? `price--rub` : `price--euro`;
    const basketTemplate = document.querySelector(`.basketTableTemplate`);
    const clonedTemplate = basketTemplate.content.cloneNode(true);
    const basketTable = clonedTemplate.querySelector(`.basketTable`);
    const clonedPicture = basketTable.querySelector(`.basketItem`).cloneNode(true);
    const basketTableBody = basketTable.querySelector(`.basketTableBody`);
    basketTableBody.innerHTML = ``;
    // pictures
    for (const pictureData of picturesData) {
        const {
            pictureID, picture, photos: { 0: { photoLink }},
            pictureSizeWidth, pictureSizeHeight, authorID, author,
            picturePrice, langPrice
        } = pictureData;
        const wrapper = clonedPicture.cloneNode(true);
        const picturePhoto = wrapper.querySelector(`.basketPhoto`);
        const pictureTitle = wrapper.querySelector(`.basketItemLink`);
        const pictureWidth = wrapper.querySelector(`.pictureWidth`);
        const pictureHeight = wrapper.querySelector(`.pictureHeight`);
        const pictureAuthor = wrapper.querySelector(`.pictureAuthorLink`);
        const picturePriceNode = wrapper.querySelector(`.picturePrice`);
        wrapper.dataset.pictureId = pictureID;
        picturePhoto.src = `/photos/pictures/${photoLink}.png`;
        picturePhoto.setAttribute(`alt`, picture);
        pictureTitle.innerText = picture;
        pictureTitle.setAttribute(`href`, `/collection/${pictureID}`);
        pictureWidth.innerText = pictureSizeWidth;
        pictureWidth.classList.add(`metric--${lang}`);
        pictureHeight.innerText = pictureSizeHeight;
        pictureHeight.classList.add(`metric--${lang}`);
        pictureAuthor.innerText = author;
        pictureAuthor.setAttribute(`href`, `/authors/${authorID}`);
        picturePriceNode.innerText = langPrice;
        picturePriceNode.classList.add(priceClass);
        picturePriceNode.dataset.rub = picturePrice;
        // remove button
        const removeButton = wrapper.querySelector(`.removeButton`);
        removeButton.dataset.pictureId = pictureID;
        removeButton.addEventListener(`click`, removePicture);
        basketTableBody.appendChild(wrapper);
    }
    // total sum
    const totalPrice = picturesData.reduce((sum, { picturePrice }) => sum + picturePrice, 0);
    const totalSum = basketTable.querySelector(`.basketSummaryValue`);
    totalSum.dataset.rub = totalPrice;
    await changeCurrency(lang, totalSum);
    return basketTable;
};

export const basketTable = async () => {
    const basketTableWrapper = document.querySelector(`.basketTableWrapper`);
    if (!basketTableWrapper) return false;
    const storage = localStorage.getItem(`basket`);
    if (!storage) return location.href = `/404`;
    const basketPictures = JSON.parse(storage);
    const lang = document.querySelector(`html`).getAttribute(`lang`);
    const picturesData = [];
    for (const picture of basketPictures) {
        const response = await fetch(`/api/pictures/${picture}/lang/${lang}`);
        const data = await response.json();
        picturesData.push(data);
    }
    const tableTemplate = await cloneTemplate(picturesData);
    const mainWrapper = basketTableWrapper.parentNode;
    const basketLoader = mainWrapper.querySelector(`.basketLoader`);
    mainWrapper.removeChild(basketLoader);
    basketTableWrapper.appendChild(tableTemplate);
};

export const basketDelivery = () => {
    const formAdditionalWrappers = [...document.querySelectorAll(`.clientAdditional .formAdditional`)];
    const pickupMap = document.querySelector(`.galleryMap`);
    const deliveryFields = document.querySelector(`.deliveryData`);
    const deliveryFormItems = [...document.querySelectorAll(`.deliveryForm .checkedItem`)];
    const paymentFormItems = [...document.querySelectorAll(`.paymentForm .checkedItem`)];
    const cashPaymentField = document.querySelector(`.checkedItem--cash`);
    const onlinePaymentField = document.querySelector(`.checkedItem--online`);
    const uncheckAll = () => {
        deliveryFormItems.forEach((item) => {
            item.classList.remove(`checkedItem--active`);
        });
        paymentFormItems.forEach((item) => {
            item.classList.remove(`checkedItem--active`);
        });
        formAdditionalWrappers.forEach((item) => {
            item.classList.remove(`formAdditional--active`);
        });
        cashPaymentField.classList.remove(`checkedItem--disable`);
    };
    deliveryFormItems.forEach((item) => {
        item.addEventListener(`click`, () => {
            uncheckAll();
            item.classList.add(`checkedItem--active`);
            if (item.classList.contains(`checkedItem--pickup`)) {
                return pickupMap.classList.add(`formAdditional--active`);
            }
            deliveryFields.classList.add(`formAdditional--active`);
            onlinePaymentField.classList.add(`checkedItem--active`);
            cashPaymentField.classList.add(`checkedItem--disable`);
        });
    });
    paymentFormItems.forEach((item) => {
        item.addEventListener(`click`, () => {
            if (item.classList.contains(`checkedItem--disable`)) return false;
            paymentFormItems.forEach((node) => {
                node.classList.remove(`checkedItem--active`);
            });
            item.classList.add(`checkedItem--active`);
        });
    });
};

export const basketForm = () => {
    const formNode = document.querySelector(`.clientForm`);
    if (!basketWrapper || !formNode) return false;
    // fields && button
    const formFields = [...formNode.querySelectorAll(`.formField`)];
    const formButton = document.querySelector(`.clientForm--button`);
    // delivery && payments check
    const checkedItems = [...document.querySelectorAll(`.checkedItem`)];
    const isDeliveryChecked = () => {
        const elements = [
            document.querySelectorAll(`.deliveryForm .checkedItem--active`),
            document.querySelectorAll(`.paymentForm .checkedItem--active`)
        ];
        return !!elements[0].length && !!elements[1].length;
    };
    // checkedItems mutation observer (delivery && payment)
    const formCallback = (mutationsList, observer) => {
        mutationsList.forEach((mutation) => {
            const { target } = mutation;
            if (!target.classList.contains(`checkedItem`)) return false;
            if (isDeliveryChecked()) {
                return formButton.removeAttribute(`disabled`);
            }
            formButton.setAttribute(`disabled`, `disabled`);
        });
    };
    const formObserver = new MutationObserver(formCallback);
    const formOptions = { attributes: true, childList: true, subtree: true };
    formObserver.observe(basketWrapper, formOptions);
    // form fields labels show/hide
    formFields.forEach((field) => {
        const fieldLabel = field.parentNode.querySelector(`.clientForm--label`);
        const showLabel = (isFocused) => {
            return () => {
                if (!isFocused && field.value.length > 0) return false;
                fieldLabel.style.opacity = (isFocused) ? `0` : `1`;
                fieldLabel.style.zIndex = (isFocused) ? `-1` : `1`;
            };
        };
        field.addEventListener(`focusin`, showLabel(true));
        field.addEventListener(`focusout`, showLabel(false));
        field.addEventListener(`change`, showLabel(true));
    });
    // rules checkbox
    const rulesWrapper = document.querySelector(`.rulesFieldWrapper`);
    const rulesCheckbox = document.querySelector(`.rulesField`);
    rulesWrapper.addEventListener(`click`, () => {
        const method = (rulesCheckbox.classList.contains(`rulesField--active`)) ? `remove` : `add`;
        const unmethod = (rulesCheckbox.classList.contains(`rulesField--active`)) ? `add` : `remove`;
        rulesCheckbox.classList[method](`rulesField--active`);
        rulesWrapper.classList[unmethod](`rulesFieldWrapper--error`);
    });
    // fields patterns
    const patterns = {
        name: /^[a-zA-Zа-яА-Я-\s]+$/,
        phone: /^[\s()+-]*([0-9][\s()+-]*){10,11}$/,
        email: /\S+@\S+\.\S+/,
        comment: /^[a-zA-Zа-яА-Я0-9\s\.\,\!\?\-\+\=\(\)\/\#\@]{0,200}$/,
        city: /^[а-яА-Яa-zA-Z]+(?:[\s-][а-яА-Яa-zA-Z]+)*$/,
        address: /^[a-zA-Zа-яА-Я0-9\s\.\,\!\?\-\+\=]{10,200}$/
    };
    // send data function
    const sendOrder = async () => {
        const delivery = document.querySelector(`.deliveryForm .checkedItem--active`);
        const payment = document.querySelector(`.paymentForm .checkedItem--active`);
        const orderPictures = JSON.parse(localStorage.getItem(`basket`));
        const orderBody = {
            delivery: delivery.dataset.delivery,
            payment: payment.dataset.payment,
            clientName: document.querySelector(`#clientName`).value,
            clientPhone: document.querySelector(`#clientPhone`).value,
            clientEmail: document.querySelector(`#clientEmail`).value,
            clientComment: document.querySelector(`#clientComment`).value,
            clientCity: document.querySelector(`#clientCity`).value,
            clientAddress: document.querySelector(`#clientAddress`).value,
            orderPictures
        };
        const orderOptions = {
            method: `POST`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(orderBody)
        };
        const response = await fetch(`/api/orders`, orderOptions);
        const { code, orderNumber } = await response.json();
        if (code !== 200) return false;
        localStorage.removeItem(`basket`);
        basketWrapper.style.display = `none`;
        orderWrapper.style.display = `flex`;
        const orderNumberNode = document.querySelector(`.orderNumber`);
        orderNumberNode.innerText = orderNumber;
        window.scrollTo(0,0);
    };
    // form button listeners
    const isRequiredField = (field) => {
        const parent = field.closest(`.formAdditional`);
        return (parent && !parent.classList.contains(`formAdditional--active`));
    };
    const isRulesChecked = () => {
        if (isRequiredField(rulesCheckbox)) return true;
        return rulesCheckbox.classList.contains(`rulesField--active`);
    };
    const isFormValid = () => {
        const filter = (field) => {
            if (isRequiredField(field)) return false;
            const { dataset: { type }, value } = field;
            return !patterns[type].test(value);
        };
        return !formFields.filter(filter).length;
    };
    formButton.addEventListener(`click`, (event) => {
        event.preventDefault();
        formFields.forEach((field) => {
            if (isRequiredField(field)) return false;
            const { dataset: { type }, value } = field;
            const isValid = (patterns[type].test(value));
            const errorField = field.parentNode.querySelector(`.errorBlock--field`);
            const method = (isValid) ? `remove` : `add`;
            errorField.classList[method](`field--error`);
        });
        if (!isFormValid()) return false;
        if (!isRulesChecked()) return rulesWrapper.classList.add(`rulesFieldWrapper--error`);
        sendOrder().catch((error) => console.log(error));
    });
};