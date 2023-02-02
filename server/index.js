const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    passsword: "",
    database: "crud",
});

app.use(express.json());
app.use(cors());

app.post("/cadastro", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const senha = req.body.senha;

    db.query("SELECT * FROM users WHERE email = ?", [email],
    (err, result) => {
        if(err){
            res.send(err);
        }
        if(result.length == 0){
            bcrypt.hash(senha, saltRounds, (err, hash) =>{
                db.query("INSERT INTO users (username, email, senha) VALUES (?, ?, ?)", [username, email, hash], (err, response) =>{
                    if(err){
                        res.send(err);
                    }
                    res.send({
                        erro: false,
                        msg: "Cadastrado com sucesso!"
                    })
                });
            });

        }else{
            res.send({
                erro: true,
                msg: "Usuário já cadastrado"
            })
        }
    })
})

app.post("/login", (req, res) =>{
    const email = req.body.email;
    const senha = req.body.senha;
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) =>{
        if(err){
            res.send(err);
        }
        if(result.length > 0){
            bcrypt.compare(senha, result[0].senha, (erro, result) =>{
                if(result){
                    db.query("SELECT username FROM users WHERE email = ?", [email], (erros, resultado) =>{
                        if(erros){
                            res.send(erros);
                        }
                        var username = JSON.parse(JSON.stringify(resultado))[0].username;
                        res.send({
                            username: username,
                            erro: false,
                            msg: "Usuário logado com sucesso!"
                        })

                    })

                }else{
                    res.send({
                        erro: true,
                        msg: "Senha está incorreta"
                    })
                }
            })
        }else{
            res.send({
                erro: true,
                msg: "Conta não encontrada"
            })           
        }
    })
})

app.listen(3001, () => {
    console.log("Porta 3001");
})