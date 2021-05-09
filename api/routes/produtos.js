const express = require("express");
const router = express.Router();

// produtos/exemplo
router.post("/exemplo", function (req, res) {
  const { chave, numero, preco } = req.headers;
  console.log(`Parametros headers: ${chave} ${numero} ${preco}`);

  const { ordenacao, pagina } = req.query;
  console.log(`Parametros url: ${ordenacao} ${pagina}`);

  const { nome, descricao } = req.body;
  console.log(`Body: ${nome} ${descricao}`);

  res.status(201).send(`POST produtos`);
});

router.get("/", function (req, res) {
  const { name, description } = req.body;
  res.send(`GET produtos`);
});

router.post("/", function (req, res) {
  const { name, description } = req.body;
  res.send(`POST produtos`);
});

router.get("/:idProduto", (req, res) => {
  const { idProduto } = req.params;
  res.send({
    mensagem: idProduto,
  });
});

router.patch("/:idProduto", (req, res) => {
  const { idProduto } = req.params;
  res.send({
    mensagem: idProduto,
  });
});

router.delete("/:idProduto", (req, res) => {
  const { idProduto } = req.params;
  res.send({
    mensagem: idProduto,
  });
});

module.exports = router;
