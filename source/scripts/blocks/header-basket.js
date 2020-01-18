export const headerBasket = () => {
    const wrapper = document.querySelector(`.headerBasket`);
    const link = document.querySelector(`.headerNav--basket`);
    const closeButton = document.querySelector(`.headerBasket--closeButton`);
    const filtersHeader = document.querySelector(`.filtersHeader`);
    const filtersBlock = document.querySelector(`.filters`);
    const showBasket = (zIndex, opacity, visible, isDisabled) => {
        return (event) => {
            if (filtersBlock.style.zIndex === `200`) return false;
            event.preventDefault();
            wrapper.style.zIndex = zIndex;
            wrapper.style.opacity = opacity;
            wrapper.style.display = visible;
            const windowSize = window.innerWidth;
            if (filtersHeader && windowSize < 768) {
                filtersHeader.style.zIndex = (opacity > 0) ? `-1` : `301`;
                filtersHeader.style.opacity = (opacity > 0) ? `0` : `1`;
            }
            if (!isDisabled) return closeButton.removeAttribute(`disabled`);
            closeButton.setAttribute(`disabled`, `disabled`);
        };
    };
    link.addEventListener(`click`, showBasket(`100`, `1`, `block`, false));
    closeButton.addEventListener(`click`, showBasket(`-1`, `0`, `none`, true));
};