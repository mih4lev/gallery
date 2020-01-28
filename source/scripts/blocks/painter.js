export const translatePainter = () => {
    document.addEventListener(`languageChange`, async ({ detail: { lang }}) => {
        const painterNameHeader = document.querySelector(`.painterName`);
        if (!painterNameHeader) return false;
        const { dataset: { authorId }} = painterNameHeader;
        const authorID = Number(authorId);
        const response = await fetch(`/api/authors/${authorID}/lang/${lang}`);
        const result = await response.json();
        // author data
        const breadcrumbName = document.querySelector(`.breadcrumbLink--active`);
        const painterCity = document.querySelector(`.painterCity`);
        const { author, authorCity } = result;
        painterNameHeader.innerText = author;
        breadcrumbName.innerText = author;
        painterCity.innerText = authorCity;
        // educations
        const educationList = document.querySelector(`.educationList`);
        if (educationList.children.length) {
            [...educationList.children].forEach((education) => {
                const educationID = Number(education.dataset.educationId);
                result.educations.forEach((data) => {
                    const { educationID: selectID, educationYear, education: educationText } = data;
                    if (selectID !== educationID) return false;
                    const educationTimelineNode = education.querySelector(`.painterTimeline`);
                    educationTimelineNode.innerText = educationYear;
                    const educationTextNode = education.querySelector(`.painterText`);
                    educationTextNode.innerText = educationText;
                });
            });
        }
        // rewards
        const rewardList = document.querySelector(`.rewardList`);
        if (rewardList.children.length) {
            [...rewardList.children].forEach((reward) => {
                const rewardID = Number(reward.dataset.rewardId);
                result.rewards.forEach((data) => {
                    const { rewardID: selectID, rewardYear, reward: rewardText } = data;
                    if (selectID !== rewardID) return false;
                    const rewardTimelineNode = reward.querySelector(`.painterTimeline`);
                    rewardTimelineNode.innerText = rewardYear;
                    const rewardTextNode = reward.querySelector(`.painterText`);
                    rewardTextNode.innerText = rewardText;
                });
            });
        }
        // exhibitions
        const exhibitionList = document.querySelector(`.exhibitionList`);
        if (exhibitionList.children.length) {
            [...exhibitionList.children].forEach((exhibition) => {
                const exhibitionID = Number(exhibition.dataset.exhibitionId);
                result.exhibitions.forEach((data) => {
                    const { exhibitionID: selectID, exhibitionYear, exhibition: exhibitionText } = data;
                    if (selectID !== exhibitionID) return false;
                    const exhibitionTimelineNode = exhibition.querySelector(`.painterTimeline`);
                    exhibitionTimelineNode.innerText = exhibitionYear;
                    const exhibitionTextNode = exhibition.querySelector(`.painterText`);
                    exhibitionTextNode.innerText = exhibitionText;
                });
            });
        }
    });
};