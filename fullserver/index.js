const express = require("express")
const path = require("path")
const cors = require("cors")
const viewsControllers = require("./controllers/views.controller")
const handlerLogin = require("./controllers/handlerLogin.controller")

//We raise server
const app = express()
const PORT = process.env.PORT | 7000
app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`))

//midelwares
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(cors({ origin: "*"}))

//routes
app.get("/", viewsControllers.showForm)
app.post("/api", handlerLogin)






// <---------------TEST------------------>
const axios = require("axios");
const https = require("https");
const colors = require("colors")
//usamos http agent para la autoceritifcacion
const agent = new https.Agent({
  rejectUnauthorized: false
});

//Datos del controlador Omada
const OMADA_IP = "192.168.100.28"
const OMADA_PORT = "443"
const OMADA_ID = "61c48dad6e3fdd80c79a1340bcf9817c"
const LOGIN_PATH = `https://${OMADA_IP}:${OMADA_PORT}/${OMADA_ID}/api/v2/hotspot/login`

//Credenciales de conexion
const credentials = {
  name : "se-etn-taxq",
  password : "admin123456"
}


app.get("/test", async (req, res) =>{

  const params = req.query

  console.log("Obteniendo Token..." .yellow)
  const response = await axios.post(LOGIN_PATH, credentials,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      httpsAgent: agent
    }
  );
  
  const { data } = response;
  
  //Manejo de la respuesta, donde 0 es Exitosa
  if(data.errorCode === 0){
    console.log(`==> Token recibido: ${data.result.token} :` .green)
    const resToken = data.result
    
    const connectionDataTest = {
      clientMac: params.clientMac,
      apMac: params.apMac,
      ssidName: params.ssidName,
      radioId: params.ssidName,
      time: "7200000",
      authType: "4"
    }
    console.log(connectionDataTest)
    console.log(req.headers.cookie)

    const response2 = await axios.post(`https://${OMADA_IP}:${OMADA_PORT}/${OMADA_ID}/api/v2/hotspot/extPortal/auth`, connectionDataTest,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Csrf-Token' : resToken.token,
          'Cookie': req.headers.cookie 
        },
        httpsAgent: agent
      }
    );

    const  data2  = response2.data
    console.log(data2)
    
    
    
    
    
    
    res.send(data2) 
  }
})

// <--------------- TEST 2 ------------------>
const fs =require("fs")

app.post("/auth", async(req, res) =>{
  const { userData } = req.body
  const { userEmail } = userData
  console.log(userEmail)

  const saveData = JSON.stringify(userData)
  console.log(userData)

  console.log("Guardadndo datos del usuario..." .yellow)
   if(!userData){
    console.log("El usuario no mando datos" .red)
    res.json({status: 404, message:"sin datos enviados"})
   }

   const pathRegister = path.join(__dirname + "/usersRegisters/")
   fs.writeFileSync(`${pathRegister}${userEmail}.json`, saveData)

   console.log(`Usuario registrado exitosamente en: ${pathRegister}` .green)


  res.json({status: 200})
})