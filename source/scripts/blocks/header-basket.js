export const headerBasket = () => {

    const wrapper = document.querySelector(`.headerBasket`);
    const link = document.querySelector(`.headerNav--basket`);
    const closeButton = document.querySelector(`.headerBasket--closeButton`);
    const filtersHeader = document.querySelector(`.filtersHeader`);
    const showBasket = (zIndex, opacity, isDisabled) => {
        return (event) => {
            event.preventDefault();
            wrapper.style.zIndex = zIndex;
            wrapper.style.opacity = opacity;
            if (filtersHeader) {
                filtersHeader.style.zIndex = (opacity > 0) ? `-1` : `301`;
                filtersHeader.style.opacity = (opacity > 0) ? `0` : `1`;
            }
            if (!isDisabled) return closeButton.removeAttribute(`disabled`);
            closeButton.setAttribute(`disabled`, `disabled`);
        };
    };
    link.addEventListener(`click`, showBasket(`100`, `1`, false));
    closeButton.addEventListener(`click`, showBasket(`-1`, `0`, true));

};