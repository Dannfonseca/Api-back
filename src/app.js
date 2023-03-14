import express from "express";
import { openDb } from "./configDB.js";
import {
  createTable,
  insertCadastro,
  updateCadastro,
  SellectAllCadastros,
  SellectCadastro,
  deleteCadastro,
} from "./controller/Cadastros.js";

const app = express();
const PORT = 3000;

//---- Middleware ----//
app.use(express.json());

//---- BD config ----//
// openDb();
createTable();

//---- ROTAS HTTP ----//'
app.get("/", (req, res) => {
  // res.send("Olá mundo!")
  res.json({ msg: "Ok" });
});


app.post("/cadastro", (req, res) => {
  insertCadastro(req.body);
  res.json({ msg: "Cadastro adicionado" });
});


app.put("/cadastro", (req, res) => {
  if (req.body && !req.body.id) {
    res.json({ msg: "Id não encontrado!", statusCode: 400 });
  } else {
    updateCadastro(req.body);
    res.json({ msg: "Cadastro atualizado com sucesso!" });
  }
});


app.get("/cadastros", async (req, res) => {
  let cadastros = await SellectAllCadastros();
  res.send(cadastros);
});


app.get("/cadastro", async (req, res) => {
  if (!req.body.id) {
    res.json({ msg: "Id não encontrado!", statusCode: 400 });
  } else {
    let cadastros = await SellectCadastro(req.body.id);
    res.send(cadastros);
  }
});


app.delete("/cadastro", async (req, res) => {
  if (!req.body.id) {
    res.json({ msg: "Id não encontrado!", statusCode: 400 });
  } else {
    let cadastros = await deleteCadastro(req.body.id);
    res.json({ msg: "Cadastro deletado", statusCode: 200 });
  }
});



//---- Servidor e porta ----//
app.listen(3000, () => {
  console.log("api rodando no endereço http://localhost:" + PORT);
});
