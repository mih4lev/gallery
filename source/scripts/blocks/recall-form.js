const sendRecallData = async (fields) => {
    const data = {};
    [...fields].forEach(({ name, value }) => data[name] = value);
    const recallOptions = {
        method: `POST`,
        headers: {
            'Content-Type': `application/json;charset=utf-8`
        },
        body: JSON.stringify(data)
    };
    const response = await fetch(`/api/recall`, recallOptions);
    const { code } = await response.json();
    return (code === 200);
};

export const recallForm = () => {
    const fields = document.querySelectorAll(`.recallForm--field`);
    const button = document.querySelector(`.recallForm--button`);
    const errorBlock = document.querySelector(`.errorBlock--form`);
    if (!fields.length || !button || !errorBlock) return false;
    if (sessionStorage.getItem(`isRecallSend`)) {
        const hideNodes = document.querySelectorAll(`.sended--hide`);
        const showNodes = document.querySelectorAll(`.sended--show`);
        hideNodes.forEach((node) => node.style.display = `none`);
        showNodes.forEach((node) => node.style.display = `block`);
    }
    const patterns = {
        name: /^[a-zA-Zа-яА-Я-\s]+$/,
        phone: /^[\s()+-]*([0-9][\s()+-]*){10,11}$/,
        email: /\S+@\S+\.\S+/
    };
    const showError = (field) => {
        const fieldError = field.parentNode.querySelector(`.errorBlock--field`);
        fieldError.style.opacity = (field.isValid || field.isEmpty) ? `0` : `1`;
        const method = (!field.isValid || field.isEmpty) ? `add` : `remove`;
        field.classList[method](`field--error`);
    };
    const setFieldValue = (field) => {
        const { value, dataset: { type }} = field;
        field.isEmpty = !value.length;
        field.isValid = patterns[type].test(value);
        showError(field);
    };
    [...fields].forEach((field) => {
        const fieldLabel = field.parentNode.querySelector(`.recallForm--label`);
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
    button.addEventListener(`click`, async (event) => {
        event.preventDefault();
        fields.forEach(setFieldValue);
        const filterFunc = (field) => !field.isEmpty;
        const isHasEmptyFields = [...fields].filter(filterFunc).length !== fields.length;
        const isValidForm = ![...fields].filter((field) => !field.isValid).length;
        errorBlock.style.opacity = (isHasEmptyFields) ? `1` : `0`;
        if (!isValidForm) return false;
        const isSaveSuccess = await sendRecallData(fields);
        if (isSaveSuccess) {
            sessionStorage.setItem('isRecallSend', JSON.stringify(true));
            const hideNodes = document.querySelectorAll(`.sended--hide`);
            const showNodes = document.querySelectorAll(`.sended--show`);
            hideNodes.forEach((node) => node.style.display = `none`);
            showNodes.forEach((node) => node.style.display = `block`);
        }
    });
};