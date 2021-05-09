const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  permiteAlteracao: {
    type: Boolean,
    default: true,
  },
  imagem: String,
});

//Export the model
module.exports = mongoose.model("Produto", produtoSchema);
