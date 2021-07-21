var compression = require('compression')
const express = require('express');
const config = require('./config/config');
const db = require('./config/mongoose');
const routes = require('./routes/index.route');
const bodyParser = require('body-parser');
const cors = require('cors')
const rateLimit = require("express-rate-limit");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Solulab Task',
        version: '1.0.0',
        contact : {
            name : 'Syed Hashim Reja',
            email : 'hashimreja2@gmail.com'
        },
        servers : ['http://localhost:3000']
      },
    },
    apis:  ['./routes/*.js']
  };
const swaggerDocument = swaggerJsdoc(options);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(compression())
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
/*Routes*/
app.use(limiter);
app.use('/api', routes);


app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`)
})

module.exports = app;