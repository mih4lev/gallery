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
    const basketWrapper = document.querySelector(`.basketWrapper`);
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
        const orderBody = {
            client_name: document.querySelector(`#clientName`).value,
            client_phone: document.querySelector(`#clientPhone`).value,
            client_email: document.querySelector(`#clientEmail`).value,
            client_comment: document.querySelector(`#clientComment`).value,
            client_city: document.querySelector(`#clientCity`).value,
            client_address: document.querySelector(`#clientAddress`).value
        };
        const orderOptions = {
            method: `POST`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(orderBody)
        };
        const response = await fetch(`/api/orders`, orderOptions);
        const { code } = await response.json();
        const action = (code === 200) ? `order saved` : `order save error`;
        console.log(action);
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