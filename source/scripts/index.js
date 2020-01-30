import { similarPhoto } from "./utils";
import { recallForm } from "./blocks/recall-form";
import { headerBasket } from "./blocks/header-basket";
import { headerLanguage } from "./blocks/header-language";
import { headerNav } from "./blocks/header-nav";
import { respondInterestBlock } from "./blocks/events";
import { setDesktopLinks, setPicturesLayout, translatePicture } from "./blocks/collection";
import { basketDelivery, basketForm } from "./blocks/basket";
import { articleScroll, shareList, translateArticle } from "./blocks/article";
import { changePhotos } from "./blocks/picture";
import { instagramPosts } from "./blocks/home";
import { translatePainter } from "./blocks/painter";

similarPhoto();
recallForm();
headerBasket();
headerLanguage();
headerNav();
respondInterestBlock();
setDesktopLinks();
setPicturesLayout();
basketDelivery();
basketForm();
articleScroll();
shareList();
changePhotos();
instagramPosts().catch((error) => console.log(error));
translatePainter();
translateArticle();
translatePicture();

const addAdminPanel = () => {
    const adminFile = `/scripts/admin.min.js`;
    const scriptNode = document.createElement(`script`);
    scriptNode.src = adminFile;
    document.body.appendChild(scriptNode);
};
addAdminPanel();