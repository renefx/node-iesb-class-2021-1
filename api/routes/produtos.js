const express = require("express");
const router = express.Router();

const Produto = require("../models/produto");

router.get("/", async function (req, res) {
  const { name, description } = req.body;
  try {
    const docs = await Produto.find({
      // nome: /Yakissoba.*/,
      // preco: { $gt: 30.99 },
      // nome: { $in: ["Yakissoba"] },
      // nome: { $in: [/Yakissoba.*/, /Frango.*/] },
    });
    res.send(docs);
  } catch (err) {
    console.log(err);
    res.send({ mensagem: err.message });
  }
});

router.post("/", async function (req, res) {
  const { nome, descricao, preco, imagem, permiteAlteracao } = req.body;

  const produto = Produto({
    nome: nome,
    descricao: descricao,
    preco: preco,
    imagem: imagem,
    permiteAlteracao: permiteAlteracao,
  });

  try {
    const doc = await produto.save();
    res.send(doc);
  } catch (err) {
    console.log(err);
    if (err.code == 11000) {
      res.status(500).send({ mensagem: "Produtos já existe." });
    } else {
      res.status(500).send({ mensagem: err.message });
    }
  }
});

router.get("/:idProduto", async (req, res) => {
  const { idProduto } = req.params;

  try {
    const doc = await Produto.findById(idProduto);
    res.send(doc);
  } catch (err) {
    console.log(err);
    res.send({ mensagem: err.message });
  }
});

router.patch("/:idProduto", async function (req, res) {
  const { idProduto } = req.params;
  const updateParams = {};
  for (const param of Object.keys(req.body)) {
    updateParams[param] = req.body[param];
  }
  try {
    const doc = await Produto.updateOne(
      {
        _id: idProduto,
      },
      updateParams
    );
    res.status(204).send({});
  } catch (err) {
    console.log(err);
    res.send({ mensagem: err.message });
  }
});

router.delete("/:idProduto", async function (req, res) {
  const { idProduto } = req.params;
  try {
    const doc = await Produto.deleteOne({
      _id: idProduto,
    });
    res.status(204).send({});
  } catch (err) {
    console.log(err);
    res.send({ mensagem: err.message });
  }
});

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

module.exports = router;
