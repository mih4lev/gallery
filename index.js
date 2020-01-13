const express = require(`express`);

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App has benn started on port ${PORT}...`));
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