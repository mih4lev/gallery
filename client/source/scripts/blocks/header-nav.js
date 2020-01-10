export const headerNav = () => {
    const navBlock = document.querySelector(`.mainNavList`);
    document.addEventListener(`click`, (event) => {
        const windowSize = window.innerWidth;
        if (windowSize > 768) return false;
        const { target } = event;
        if (!target.classList.contains(`mainNav`)) {
            navBlock.style.display = `none`;
            return false;
        }
        navBlock.style.display = `block`;
    }, false);
};