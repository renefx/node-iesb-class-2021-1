const express = require("express");
const produtoRoutes = require("./api/routes/produtos");
const pedidoRoutes = require("./api/routes/pedidos");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res, next) => {
  res.setHeader("headerExemploMiddleware", "IESB");
  next();
});

app.use("/produtos", produtoRoutes);
app.use("/pedidos", pedidoRoutes);

app.listen(port, () => console.log(`App iniciou na porta ${port}!`));
