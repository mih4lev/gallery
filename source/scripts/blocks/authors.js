export const translateAuthors = async () => {
    document.addEventListener(`languageChange`, async ({ detail: { lang }}) => {
        // another events
        const moreResponse = await fetch(`/api/authors/lang/${lang}`);
        const result = await moreResponse.json();
        const authorList = [...document.querySelectorAll(`.innerPage .authorsWrapper`)];
        if (!authorList.length) return false;
        authorList.forEach((author, index) => {
            author.querySelector(`.authorName`).innerText = result[index].author;
            author.querySelector(`.authorDescription`).innerText = result[index].authorAbout;
        });
    });
};