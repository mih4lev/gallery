import { similarPhoto } from "./utils";
import { recallForm } from "./blocks/recall-form";
import { headerBasket } from "./blocks/header-basket";
import { headerLanguage } from "./blocks/header-language";
import { headerNav } from "./blocks/header-nav";
import { respondInterestBlock, showMoreEvents, translateEvents } from "./blocks/events";
import {
    setDesktopLinks, setPicturesLayout, translatePicture,
    collectionFilters
} from "./blocks/collection";
import { basketDelivery, basketForm } from "./blocks/basket";
import { articleScroll, shareList, translateArticle } from "./blocks/article";
import { changePhotos, showGallery } from "./blocks/picture";
import { translateHomepage, instagramPosts } from "./blocks/home";
import { translatePainter } from "./blocks/painter";
import { translateAuthors } from "./blocks/authors";

similarPhoto();
recallForm();
headerBasket();
headerLanguage();
headerNav();
respondInterestBlock();
showMoreEvents();
collectionFilters();
setDesktopLinks();
setPicturesLayout();
basketDelivery();
basketForm();
articleScroll();
shareList();
changePhotos();
showGallery();
instagramPosts().catch((error) => console.log(error));
translateHomepage();
translateAuthors();
translatePainter();
translateArticle();
translateEvents();
translatePicture();

const addAdminPanel = () => {
    const adminFile = `/scripts/admin.min.js`;
    const scriptNode = document.createElement(`script`);
    scriptNode.src = adminFile;
    document.body.appendChild(scriptNode);
};
addAdminPanel();