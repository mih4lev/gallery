const footerLogo = document.querySelector(`.footerLogo`);
const loginWrapper = document.querySelector(`.loginWrapper`);
const loginForm = document.querySelector(`.loginForm`);
const fields = [...document.querySelectorAll(`.loginField`)];
const loginButton = document.querySelector(`.loginButton`);

const sendLoginData = async (event) => {
    event.preventDefault();
    const login = loginForm.querySelector(`#userLogin`).value;
    const password = loginForm.querySelector(`#userPassword`).value;
    const options = {
        method: `POST`,
        headers: {
            'Content-Type': `application/json;charset=utf-8`
        },
        body: JSON.stringify({ login, password })
    };
    const response = await fetch(`/api/login`, options);
    const { code } = await response.json();
    if (code === 200) {
        location.reload();
    }
};

const userLogout = async () => {
    const options = {
        method: `DELETE`,
        headers: {
            'Content-Type': `application/json;charset=utf-8`
        },
    };
    const response = await fetch(`/api/logout`, options);
    const { code } = await response.json();
    if (code === 200) {
        location.reload();
    }
};

export const userLogin = () => {
    footerLogo.addEventListener(`click`, () => {
        if (!loginForm) return userLogout();
        loginWrapper.style.opacity = `1`;
        loginWrapper.style.zIndex = `10`;
    });
    if (!loginForm || !loginButton) return false;
    fields.forEach((field) => {
        field.addEventListener(`focusin`, ({ target }) => {
            target.parentNode.querySelector(`.loginLabel`).style.display = `none`;
        });
        field.addEventListener(`focusout`, ({ target }) => {
            if (target.value) return false;
            target.parentNode.querySelector(`.loginLabel`).style.display = `block`;
        });
    });
    loginButton.addEventListener(`click`, sendLoginData);
    loginForm.addEventListener(`submit`, sendLoginData)
};