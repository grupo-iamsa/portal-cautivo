const colors = require("colors")
const getToken = require("./getToken.controller")

const handlerLogin = async (req, res) =>{
  console.log("=== Nueva peticion a la API === \n" .cyan )
  const data =  req.body

  console.log("==> Datos recibidos :" .green)
  console.log(data)

  
  const tokenData = await getToken()

  



  res.json({message : "Conectado"})
}

module.exports = handlerLogin