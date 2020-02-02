export const translateHomepage = async () => {
    document.addEventListener(`languageChange`, async ({ detail: { lang }}) => {
        const mainHeader = document.querySelector(`.mainHeader`);
        if (!mainHeader) return false;
        const eventList = document.querySelectorAll(`.interestList .interestItem`);
        if (!eventList.length) return false;
        let eventsResponse, authorsResponse;
        await Promise.all([
            eventsResponse = await fetch(`/api/events/lang/${lang}/limit/3`),
            authorsResponse = await fetch(`/api/authors/lang/${lang}/limit/3`)
        ]);
        const events = await eventsResponse.json();
        eventList.forEach((event, index) => {
            event.querySelector(`.interestLink`).innerText = events[index].eventTitle;
            event.querySelector(`.interestDescription`).innerText = events[index].eventAnnotation;
            event.querySelector(`.interestTheme`).innerText = events[index].categoryTitle;
        });
        const authors = await authorsResponse.json();
        const authorBlock = document.querySelector(`.authorBlock`);
        if (authorBlock) {
            authorBlock.querySelector(`.authorName`).innerText = authors[0].author;
            authorBlock.querySelector(`.authorDescription`).innerText = authors[0].authorAbout;
        } else {
            const authorList = [...document.querySelectorAll(`.authorsList .authorsItem`)];
            if (!authorList.length) return false;
            authorList.forEach((author, index) => {
                author.querySelector(`.authorsLink`).innerText = authors[index].author;
                author.querySelector(`.authorsPlace`).innerText = authors[index].authorCity;
            });
        }
    });
};

export const instagramPosts = async () => {
    const instagramPhotos = [...document.querySelectorAll(`.instagramPhoto`)];
    if (!instagramPhotos.length) return false;
    const response = await fetch(`/api/instagram`);
    const photos = await response.json();
    instagramPhotos.forEach((photo, index) => {
        photo.closest(`.instagramLink`).href = photos[index].link;
        photo.src = photos[index].thumb;
    });
};