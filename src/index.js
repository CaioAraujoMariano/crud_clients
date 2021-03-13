const http = require('http');
const express = require('express');
const app = express();
const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(3000);
app.get("/clientes", (req, res, next) => {
  res.json(clientes);
});

let contador = 2; // logo após as instruções require
const bodyParser = require ('body-parser');
app.use (bodyParser.json());
const clientes = [
  {
    id: 1,
    nome: "Caio",
    email: "caio@email.com",
  },
  {
    id: 2,
    nome: "Silvio",
    email: "silvio@email.com",
  },
];

app.post("/clientes", (req, res, next) => {
  const cliente = req.body;
  clientes.push({
    id: (contador += 1),
    nome: cliente.nome,
    email: cliente.email,
  });
  console.log(clientes);
  res.status(201).json(clientes);
});

app.put("/clientes",(req, res, next)=>{
  clientes.forEach((cliente) =>{
    if(cliente.id === req.body.id){
      cliente.nome = req.body.nome;
      cliente.email = req.body.email;
    }
  })
      res.status(200).json(clientes);
});

app.delete("/clientes/:id", (req, res, next)=>{
  const idClienteDeletado = req.params.id;
  clientes.forEach((cliente, index)=>{
    if (cliente.id == idClienteDeletado) clientes.splice(index, 1);
  })
    res.status(200).json(clientes);
});