const express = require('express');
const exphb = require('express-handlebars');
const cardapio = require("./cardapio");

const app = express();
const port = 3000;

// configurações basicas
app.use(express.static('public')); // arquivos estáticos (css, js, imagens)
app.use(express.json()); // para receber requisições com JSON no body
app.use(express.urlencoded({extended: true})); // para receber requisições com dados de formulários

app.engine('handlebars', exphb.engine({defaultLayout: "main"}));
app.set('view engine', 'handlebars');


// dados
app.locals.cardapio = cardapio;
app.locals.pedidos = [];
app.locals.mesas = [];

// rotas
const cardapioRoutes = require('./routes/cardapio');
// const pedidosRoutes = require('./routes/pedidos');
// const mesasRoutes = require('./routes/mesas');
// const cozinhaRoutes = require('./routes/cozinha');

app.use('/cardapio', cardapioRoutes);
// app.use('/pedidos', pedidosRoutes);
// app.use('/mesas', mesasRoutes);
// app.use('/cozinha', cozinhaRoutes);

// rota principal (home)
app.get('/', (req, res) => {
  res.render('home');
});

// iniciando o servidor
app.listen(port, () => {
  console.log(`Atelier do Vento - http://localhost:${port}`);
});