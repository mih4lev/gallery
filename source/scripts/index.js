import { userLogin } from "./login";
import { similarPhoto } from "./utils";
import { recallForm } from "./blocks/recall-form";
import { checkBasketStorage, headerBasket } from "./blocks/header-basket";
import { headerLanguage } from "./blocks/header-language";
import { headerNav } from "./blocks/header-nav";
import { respondInterestBlock, showMoreEvents, translateEvents } from "./blocks/events";
import {
    setDesktopLinks, setPicturesLayout, translatePicture, collectionFilters,
    translatePictureList
} from "./blocks/collection";
import { cartButtons, basketTable, basketDelivery, basketForm } from "./blocks/basket";
import { articleScroll, shareList, translateArticle } from "./blocks/article";
import { changePhotos, showGallery } from "./blocks/picture";
import { translateHomepage, instagramPosts } from "./blocks/home";
import { translatePainter } from "./blocks/painter";
import { translateAuthors } from "./blocks/authors";

userLogin();
similarPhoto();
recallForm();
checkBasketStorage();
headerBasket();
headerLanguage();
headerNav();
respondInterestBlock();
showMoreEvents();
collectionFilters();
translatePictureList();
setDesktopLinks();
setPicturesLayout();
cartButtons();
basketTable();
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