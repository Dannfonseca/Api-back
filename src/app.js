import express from "express";
import { openDb } from "./configDB.js";
import {
  createTable,
  insertProduto,
  updateProduto,
  SellectAllProdutos,
  SellectProduto,
  deleteProduto
} from "./controller/Produto.js";

const app = express();
const PORT = 3000;

//---- Middleware ----//
app.use(express.json());

//---- BD config ----//
// openDb();
createTable();

//---- ROTAS HTTP ----//
app.get("/", (req, res) => {
  // res.send("Olá mundo!")
  res.json({ msg: "Ok" });
});

app.post("/produto", (req, res) => {
  insertProduto(req.body);
  res.json({ msg: "Produto adicionado" });
});

app.put("/produto", (req, res) => {
  if (req.body && !req.body.id) {
    res.json({ msg: "Id não encontrado!", statusCode: 400 });
  } else {
    updateProduto(req.body);
    res.json({ msg: "Produto atualizado com sucesso!" });
  }
});

app.get("/produtos", async (req, res) => {
  let produtos = await SellectAllProdutos();
  res.send(produtos);
});

app.get("/produto", async (req, res) => {
  if (!req.body.id) {
    res.json({ msg: "Id não encontrado!", statusCode: 400 });
  } else {
    let produto = await SellectProduto(req.body.id);
    res.send(produto);
  }
});

app.delete("/produto", async (req, res) => {
    if (!req.body.id) {
      res.json({ msg: "Id não encontrado!", statusCode: 400 });
    } else {
      let produto = await deleteProduto(req.body.id);
      res.json({ msg: "Produto deletado", statusCode: 200 });
    }
  });



//---- Servidor e porta ----//
app.listen(3000, () => {
  console.log("api rodando no endereço http://localhost:" + PORT);
});
