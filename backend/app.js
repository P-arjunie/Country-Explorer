const app = require('./app');

module.exports = (req, res) => {
    app(req, res); // serverless-style export for Vercel
};

  