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
    const formFields = [...formNode.querySelectorAll(`.formField`)];
    if (!formNode || !formFields) return false;
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
        rulesCheckbox.classList[method](`rulesField--active`);
    });
};