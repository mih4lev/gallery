export const recallForm = () => {

    const fields = document.querySelectorAll(`.recallForm--field`);
    const button = document.querySelector(`.recallForm--button`);
    const errorBlock = document.querySelector(`.errorBlock--form`);
    if (!fields.length || !button || !errorBlock) return false;
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
    button.addEventListener(`click`, (event) => {
        event.preventDefault();
        fields.forEach(setFieldValue);
        const isHasEmptyFields = [...fields].filter((field) => !field.isEmpty).length !== fields.length;
        const isValidForm = ![...fields].filter((field) => !field.isValid).length;
        errorBlock.style.opacity = (isHasEmptyFields) ? `1` : `0`;
        if (!isValidForm) return false;
        const hideNodes = document.querySelectorAll(`.sended--hide`);
        const showNodes = document.querySelectorAll(`.sended--show`);
        hideNodes.forEach((node) => node.style.display = `none`);
        showNodes.forEach((node) => node.style.display = `block`);
        console.log(`form valid, send info to API`);
    });

}