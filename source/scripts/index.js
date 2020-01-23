import { similarPhoto } from "./utils";
import { recallForm } from "./blocks/recall-form";
import { headerBasket } from "./blocks/header-basket";
import { headerLanguage } from "./blocks/header-language";
import { headerNav } from "./blocks/header-nav";
import { respondInterestBlock } from "./blocks/events";
import { setDesktopLinks, setPicturesLayout } from "./blocks/collection";
import { basketDelivery, basketForm } from "./blocks/basket";
import { articleScroll } from "./blocks/article";

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