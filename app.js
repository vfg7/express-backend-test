var createError = require('http-errors');
var express = require('express');

const produto_rotas = require("./routes/produtos");
const cliente_rotas = require("./routes/clientes");
const pedidos_rotas = require("./routes/pedidos");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const path = require('path');

var app = express();

app.use(express.json());
app.use("/produtos", produto_rotas);
app.use("/clientes", cliente_rotas);
app.use("/pedidos", pedidos_rotas);


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
