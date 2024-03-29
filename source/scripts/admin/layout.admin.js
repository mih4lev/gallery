import { addAuthor, editAuthor, deleteAuthor } from "./authors.admin";
import { hideLayout, showLayout } from "./lang.admin";
import { addEvent, editEvent, deleteEvent } from "./events.admin";
import { addPicture, editPicture, deletePicture } from "./pictures.admin";
import { editOptions } from "./options.admin";

const hideHandler = (event) => {
    event.preventDefault();
    const adminLayoutList = document.querySelector(`.adminLayoutList`);
    if (!adminLayoutList) return false;
    adminLayoutList.style.display = `none`;
    document.removeEventListener(`click`, hideHandler);
};

const showHandler = (event) => {
    event.preventDefault();
    const { target: layoutButton } = event;
    if (layoutButton.classList.contains(`activated`)) return hideLayout();
    const adminLayoutList = document.querySelector(`.adminLayoutList`);
    if (!adminLayoutList) return false;
    adminLayoutList.style.display = `block`;
    setTimeout(() => {
        document.addEventListener(`click`, hideHandler);
    }, 100);
};

const showOrders = () => {
    location.href = `/orders`;
};

export const showAdminLayout = () => {
    const layoutButton = document.querySelector(`.adminEye`);
    if (!layoutButton) return false;
    layoutButton.addEventListener(`click`, showHandler);
    const adminLayoutList = document.querySelector(`.adminLayoutList`);
    if (!adminLayoutList) return false;
    const layoutLinks = [...adminLayoutList.querySelectorAll(`.adminLink`)];
    const layoutMap = {
        'addAuthor': addAuthor,
        'editAuthor': editAuthor,
        'deleteAuthor': deleteAuthor,
        'showLayout': showLayout,
        'addEvent': addEvent,
        'editEvent': editEvent,
        'deleteEvent': deleteEvent,
        'addPicture': addPicture,
        'editPicture': editPicture,
        'deletePicture': deletePicture,
        'editOptions': editOptions,
        'showOrders': showOrders
    };
    layoutLinks.forEach((link) => {
        const { dataset: { action }} = link;
        link.addEventListener(`click`, layoutMap[action]);
    });
};