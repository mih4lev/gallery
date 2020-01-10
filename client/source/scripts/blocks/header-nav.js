export const headerNav = () => {
    const navIcon = document.querySelector(`.mainNav`);
    navIcon.addEventListener(`click`, () => {
        const windowSize = window.innerWidth;
        if (windowSize > 768) return false;
        alert(`click`);
    }, false);
};