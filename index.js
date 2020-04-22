const express = require(`express`);
const compression = require('compression');
// const expressHbs = require(`express-handlebars`);
// const hbs = require(`hbs`);
// const cookieParser = require(`cookie-parser`);
// const cors = require(`cors`);
// const corsOptions = require("./middlewares/cors.middleware");
const app = express();

app.get('/', (request, response) => {
    console.log(`URL: ${request.url}`);
    response.send('Test2');
});

// // compress response
app.use(compression());
// // handlebars options
// app.engine(`hbs`, expressHbs({
//     layoutsDir: `views/layouts`,
//     defaultLayout: `layout`,
//     extname: `hbs`
// }));
// app.set('view engine', 'hbs');
// hbs.registerPartials(__dirname + '/views/partials');
// app.use(`/robots.txt`, express.static(__dirname + `/robots.txt`));
// // static source path
// app.use(`/css`, express.static(__dirname + `/public/css`));
// app.use(`/images`, express.static(__dirname + `/public/images`));
// app.use(`/photos`, express.static(__dirname + `/public/photos`));
// app.use(`/scripts`, express.static(__dirname + `/public/scripts`));
// app.use(`/fonts`, express.static(__dirname + `/public/fonts`));
// app.use(`/lang`, express.static(__dirname + `/public/lang`));
// // middleware
// app.use(express.json({ extended: true }));
// app.use(cookieParser('some_secret_numbers_123409853532'));
// app.use(require(`./middlewares/lang.middleware`));
// app.use(require(`./middlewares/admin.middleware`));
// app.use('/api', cors(corsOptions));
// // routes
// app.use('/', require('./routes/home.routes'));
// app.use('/collection', require('./routes/collection.routes'));
// app.use('/authors', require('./routes/authors.routes'));
// app.use('/events', require('./routes/events.routes'));
// app.use('/delivery', require('./routes/delivery.routes'));
// app.use('/basket', require('./routes/basket.routes'));
// app.use('/orders', require('./routes/orders.routes'));
// app.use('/404', require('./routes/404.routes'));
// app.use('/api', require('./routes/api.routes'));
// app.use('/api/options', require('./routes/api.options.routes'));
// app.use('/api/pages', require('./routes/api.pages.routes'));
// app.use('/api/language', require('./routes/api.language.routes'));
// app.use('/api/collection', require('./routes/api.collection.routes'));
// app.use('/api/categories', require('./routes/api.categories.routes'));
// app.use('/api/events', require('./routes/api.events.routes'));
// app.use('/api/authors', require('./routes/api.authors.routes'));
// app.use('/api/rewards', require('./routes/api.rewards.routes'));
// app.use('/api/educations', require('./routes/api.educations.routes'));
// app.use('/api/exhibitions', require('./routes/api.exhibitions.routes'));
// app.use('/api/colors', require('./routes/api.colors.routes'));
// app.use('/api/genres', require('./routes/api.genres.routes'));
// app.use('/api/techniques', require('./routes/api.techniques.routes'));
// app.use('/api/photos', require('./routes/api.photos.routes'));
// app.use('/api/pictures', require('./routes/api.pictures.routes'));
// app.use('/api/orders', require('./routes/api.orders.routes'));
// // 404
// app.use((request, response, next) => {
//     const { url } = request;
//     if (url.indexOf(`favicon`) !== -1) {
//         response.status(404);
//         return next();
//     }
//     response.status(404).redirect(`/404`);
//     next();
// });

app.listen(5000);