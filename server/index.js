const express = require("express") ;
const getToken = require("./helpers/getToken");
const cors = require("cors")


const app = express()
const PORT = process.env.PORT || 7000



//Credentials Omada Controler

const USER = 

app.use(express.json())
app.use(cors({ origin: "*"}))

app.get("/api/login", async (req, res) => {
  
  const token = await getToken()

  if(token.error){
    res.json({error: token.error})
  }
  
  res.json(token)

});

app.listen(PORT, () =>{
  console.log(`Escuchando en el puerto ${PORT}`)
})