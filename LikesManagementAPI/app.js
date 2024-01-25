const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const likesRouter = require('./routes/likes');
const cors = require('cors'); 

const app = express();
const port = 4000;

app.use(cors()); 
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/swagger', express.static('swagger-ui'));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use(bodyParser.json());

app.use('/', likesRouter);

app.listen(port, () => {
  console.log(`Likes Management API está rodando em http://localhost:${port}`);
});