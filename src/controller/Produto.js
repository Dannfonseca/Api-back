import {openDb} from '../configDB.js';

export async function createTable () {
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS produtos(id INTEGER PRIMARY KEY AUTOINCREMENT, produto TEXT, valor REAL)')
    })
}


export async function insertProduto (produto) {
    openDb().then(db=>{
        db.run('INSERT INTO produtos(produto, valor) VALUES (?, ?)', [produto.produto, produto.valor])
    })
}

export async function updateProduto (produto) {
    openDb().then(db=>{
        db.run('UPDATE produtos SET produto=?, valor=? WHERE id=?', [produto.produto, produto.valor, produto.id])
    })
}


export async function SellectAllProdutos () {
   return openDb().then(db=>{
        return db.all('SELECT * FROM produtos')
    })
}


export async function SellectProduto (id) {
    return openDb().then(db=>{
         return db.get('SELECT * FROM produtos WHERE id =?',[id])
     })
 }


 export async function deleteProduto (id) {
    return openDb().then(db=>{
         return db.get('DELETE FROM produtos WHERE id=?', [id])
     })
 }