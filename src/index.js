const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 3000;

const db = require('./config/db/index');
const route = require('./routes');

db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTTP logger
app.use(morgan('combined'));
app.use(methodOverride('_method'));

//template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (index, currentPage) => {
                // Calculate the index based on the current page
                return (currentPage - 1) * 10 + index + 1;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources//views'));

route(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
