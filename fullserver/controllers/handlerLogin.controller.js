const colors = require("colors")
const getToken = require("./getToken.controller")
const setUserInfo = require("./setUserInfo.controller")

const handlerLogin = async (req, res) =>{
  console.log("=== Nueva peticion a la API === \n" .cyan )
  
  console.log("==> Datos recibidos :" .green)
  const { userData, controllerData } =  req.body
  console.log(userData, controllerData, "\n")


  const tokenData = await getToken()
  const connectionData = {
    tokenData: tokenData.token,
    controllerData
  }
  
   const connection = await setUserInfo(connectionData)
  
   console.log(connection)

  res.json(connectionData)
}

module.exports = handlerLogin