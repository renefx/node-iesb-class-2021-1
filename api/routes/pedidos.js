const express = require("express");
const Pedido = require("../models/pedido");
const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const docs = await Pedido.find().populate("lista.idProduto");
    res.send(docs);
  } catch (error) {
    next(error);
  }
});

router.post("/", async function (req, res, next) {
  const { nomeUsuario, lista } = req.body;

  const pedido = new Pedido({
    nomeUsuario: nomeUsuario,
    lista: lista,
  });

  try {
    const doc = await pedido.save();
    res.status(201).send(doc);
  } catch (error) {
    next(error);
  }
});

router.get("/:idPedido", (req, res) => {
  const { idPedido } = req.params;
  res.send({
    mensagem: idPedido,
  });
});

router.delete("/:idPedido", (req, res) => {
  const { idPedido } = req.params;
  res.send({
    mensagem: idPedido,
  });
});

module.exports = router;
