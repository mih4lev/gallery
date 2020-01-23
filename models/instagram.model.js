const fetch = require(`node-fetch`);

const requestPosts = async () => {
    const JSON = await fetch(`https://www.instagram.com/art_of_moscoww/?__a=1`);
    const {
        graphql: { user: { edge_owner_to_timeline_media: { edges: posts }}}
    } = await JSON.json();
    const filter = ({ node: { thumbnail_src, shortcode }}) => {
        return { thumb: thumbnail_src, link: `https://instagram.com/p/${shortcode}/` };
    };
    return posts.map(filter);
};

module.exports = { requestPosts };