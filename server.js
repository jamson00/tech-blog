const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./models/index.js'); // Your Sequelize configuration

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup (body parser, static files, etc.)

// Handlebars setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Session setup
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Routes setup (home, login, signup, dashboard, etc.)

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
