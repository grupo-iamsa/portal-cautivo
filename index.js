import express  from "express";

const app = express()
const PORT = process.env.PORT || 7000

app.get("/", (req, res) =>{
  resp.send("Hola")
})

app.get("/api", (req, res) =>{
  
})

app.listen(PORT, () =>{
  console.log(`Escuchando en el puerto ${PORT}`)
})