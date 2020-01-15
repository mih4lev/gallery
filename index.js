const express = require(`express`);
const expressHbs = require(`express-handlebars`);
const bodyParser = require(`body-parser`);
const hbs = require(`hbs`);

const app = express();

app.engine(`hbs`, expressHbs({
    layoutsDir: `views/layouts`,
    defaultLayout: `layout`,
    extname: `hbs`
}));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(`/css`, express.static(__dirname + `/public/css`));
app.use(`/images`, express.static(__dirname + `/public/images`));
app.use(`/scripts`, express.static(__dirname + `/public/scripts`));
app.use(`/fonts`, express.static(__dirname + `/public/fonts`));
app.use(`/lang`, express.static(__dirname + `/public/lang`));

const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: true }));
// index && all functional pages
app.use('/', require('./routes/main.routes'));
app.use('/api', require('./routes/api.routes'));
app.use('/', require('./routes/collection.routes'));
app.use('/', require('./routes/authors.routes'));
app.use('/', require('./routes/art-space.routes'));
app.use('/', require('./routes/delivery.routes'));
// if needed page don't exist
app.use(function(request, response, next) {
    response.status(404).redirect(`/404`);
    next();
});

app.listen(PORT, () => console.log(`App has benn started on port ${PORT}...`));