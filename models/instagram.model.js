const fetch = require(`node-fetch`);

const requestPosts = async () => {
    const JSON = await fetch(`https://www.instagram.com/art_of_moscoww/?__a=1`);
    const {
        graphql: { user: { edge_owner_to_timeline_media: { edges: posts }}}
    } = await JSON.json();
    const data = [];
    posts.forEach(({ node: { thumbnail_src }}) => data.push(thumbnail_src));
    data.length = 6;
    return data;
};

module.exports = { requestPosts };