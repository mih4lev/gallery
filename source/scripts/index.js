import { similarPhoto } from "./utils";
import { recallForm } from "./blocks/recall-form";
import { headerBasket } from "./blocks/header-basket";
import { headerLanguage } from "./blocks/header-language";
import { headerNav } from "./blocks/header-nav";
import { respondInterestBlock } from "./blocks/events";
import { setDesktopLinks, setPicturesLayout } from "./blocks/collection";
import { basketDelivery, basketForm } from "./blocks/basket";
import { articleScroll, shareList } from "./blocks/article";
import { changePhotos } from "./blocks/picture";
import { instagramPosts } from "./blocks/home";

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

// const data = {
//     authorRU: `Екатерина Жуковская`,
//     authorEN: `Ekaterina Zhukovskaya`,
//     authorPhoto: `author_picture1.png`,
//     authorAboutRU: `Художник тра тата такие дела там была пришла основала примеры работ позитивная любовь к красоте во всех проявлениях`,
//     authorAboutEN: `The artist tra tata such things there was came based examples of works a positive love of beauty in all manifestations`,
//     authorCityRU: `Москва, Россия`,
//     authorCityEN: `Moscow, Russia`
// };
// const data = {
//     authorRU: `Изабелла Лебедева`,
//     authorEN: `Isabella Lebedeva`,
//     authorPhoto: `author_picture2.png`,
//     authorAboutRU: `Художник тра тата такие дела там была пришла основала примеры работ позитивная любовь к красоте во всех проявлениях`,
//     authorAboutEN: `The artist tra tata such things there was came based examples of works a positive love of beauty in all manifestations`,
//     authorCityRU: `Санкт-Петербург, Россия`,
//     authorCityEN: `Saint-Petersburg, Russia`
// };
const data = {
    authorRU: `Sasha Ignatiadouasd`,
    authorEN: `Sasha Ignatiadouasd`,
    authorPhoto: `author_picture33.png`,
    authorAboutRU: `Художник тра тата такие дела там была пришла основала примеры работ позитивная любовь к красоте во всех проявлениях`,
    authorAboutEN: `The artist tra tata such things there was came based examples of works a positive love of beauty in all manifestations`,
    authorCityRU: `Düsseldorf, Germany`,
    authorCityEN: `Düsseldorf, Germany`
};
const options = {
    method: `PUT`,
    headers: {
        'Content-Type': `application/json;charset=utf-8`
    },
    body: JSON.stringify(data)
};
fetch(`/api/authors/11`, options);