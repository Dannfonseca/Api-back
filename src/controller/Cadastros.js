import { openDb } from "../configDB.js";

export async function createTable() {
  openDb().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS cadastro(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, data_nascimento TEXT, naturalidade TEXT, celular REAL, endereco TEXT, cidade TEXT, sexo TEXT)"
    );
  });
}

export async function insertCadastro(cadastro) {
  openDb().then((db) => {
    db.run("INSERT INTO cadastro(nome, email, data_nascimento, naturalidade, celular, endereco, cidade, sexo ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
      cadastro.nome,
      cadastro.email,
      cadastro.data_nascimento,
      cadastro.naturalidade,
      cadastro.celular,
      cadastro.endereco,
      cadastro.cidade,
      cadastro.sexo
    ]);
  });
}

export async function updateCadastro(cadastro) {
  openDb().then((db) => {
    db.run("UPDATE cadastro SET nome=?, email=?, data_nascimento=?, naturalidade=?, celular=?, endereco=?, cidade=?, sexo=? WHERE id=?", [
      cadastro.id,
      cadastro.nome,
      cadastro.email,
      cadastro.data_nascimento,
      cadastro.naturalidade,
      cadastro.celular,
      cadastro.endereco,
      cadastro.cidade,
      cadastro.sexo
    ]);
  });
}

export async function SellectAllCadastros() {
  return openDb().then((db) => {
    return db.all("SELECT * FROM cadastro");
  });
}

export async function SellectCadastro (id) {
  return openDb().then((db) => {
    return db.get("SELECT * FROM cadastro WHERE id =?", [id]);
  });
}

export async function deleteCadastro (id) {
  return openDb().then((db) => {
    return db.get("DELETE FROM cadastro WHERE id=?", [id]);
  });
}
