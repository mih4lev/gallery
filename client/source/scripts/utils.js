export const similarPhoto = () => {

    const links = document.querySelectorAll(`.similarLink`);
    const targetPhoto = (isLinkHovered) => {
        return ({ target: link }) => {
            const method = (isLinkHovered) ? `add` : `remove`;
            const photo = link.closest(`.similarParent`).querySelector(`.similarPhoto`);
            photo.classList[method](`similarPhoto--active`);
        };
    };
    const addListeners = (link) => {
        link.addEventListener(`mouseover`, targetPhoto(true));
        link.addEventListener(`mouseout`, targetPhoto(false));
    };
    [...links].forEach(addListeners);

}