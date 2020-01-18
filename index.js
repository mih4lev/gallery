const express = require(`express`);
const expressHbs = require(`express-handlebars`);
const hbs = require(`hbs`);
const cookieParser = require(`cookie-parser`);
const app = express();
// handlebars options
app.engine(`hbs`, expressHbs({
    layoutsDir: `views/layouts`,
    defaultLayout: `layout`,
    extname: `hbs`
}));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
// static source path
app.use(`/css`, express.static(__dirname + `/public/css`));
app.use(`/images`, express.static(__dirname + `/public/images`));
app.use(`/scripts`, express.static(__dirname + `/public/scripts`));
app.use(`/fonts`, express.static(__dirname + `/public/fonts`));
app.use(`/lang`, express.static(__dirname + `/public/lang`));
// middleware
app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use(require(`./middlewares/lang.middleware`));
// routes
app.use('/', require('./routes/main.routes'));
app.use('/api', require('./routes/api.routes'));
app.use('/collection', require('./routes/collection.routes'));
app.use('/authors', require('./routes/authors.routes'));
app.use('/events', require('./routes/events.routes'));
app.use('/delivery', require('./routes/delivery.routes'));
app.use('/basket', require('./routes/basket.routes'));
// 404
app.use((request, response, next) => {
    response.status(404).redirect(`/404`);
    next();
});
// end
const PORT = process.env.PORT || 5000;
app.listen(PORT);