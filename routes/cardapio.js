const express = require('express');
const router = express.Router(); 

// middleware p acessar o cardápio para as rotas deste módulo
router.use((req, res, next) => {
  req.cardapio = req.app.locals.cardapio;
  next();
});

// rota para listar o cardápio
router.get('/', (req, res) => {
  res.render('cardapio/listar', { cardapio: req.cardapio });
});

// rota para exibir o formulário de novo prato
router.get('/novo', (req, res) => {
  res.render('cardapio/novo');
});

router.post('/novo', (req, res) => {
  const { nome, descricao, preco, categoria } = req.body;
    const novoId = req.app.locals.cardapio.length + 1;
    req.app.locals.cardapio.push({ id: novoId, nome, descricao, preco: parseFloat(preco), categoria });
  res.redirect('/cardapio'); // redireciona de volta para o cardapio
});

// rota para detalhar um prato específico
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const prato = req.app.locals.cardapio.find(p => p.id === id)

    if(prato){
        res.render('cardapio/detalhar', {prato})
    } else {
        res.status(404).send('Prato não encontrado :(')
    }
});

// rota para editar um prato específico
router.get('/:id/editar', (req, res) => {
    const id = parseInt(req.params.id);
    const prato = req.app.locals.cardapio.find(p => p.id === id);
    if(prato){
        res.render('cardapio/editar', {prato});
    } else {
        res.status(404).send('Prato não encontrado :(');
    }
});

router.post('/:id/editar', (req, res) => {
    const id = parseInt(req.params.id);
    const pratoIndex = req.app.locals.cardapio.findIndex(p => p.id === id);

    if(pratoIndex !== -1){
        const { nome, descricao, preco, categoria } = req.body;
        req.app.locals.cardapio[pratoIndex] = { id, nome, descricao, preco: parseFloat(preco), categoria };
        res.redirect(`/cardapio/${id}`);
    } else {
        res.status(404).send('Prato não encontrado :(');
    }
});
// rota para excluir um prato específico
router.post('/:id/excluir', (req, res) => {
    const id = parseInt(req.params.id);
    const pratoIndex = req.app.locals.cardapio.findIndex(p => p.id === id);

    if(pratoIndex !== -1){
        req.app.locals.cardapio.splice(pratoIndex, 1);
        res.redirect('/');
    } else {
        res.status(404).send('Prato não encontrado :(');
    }
});

module.exports = router;