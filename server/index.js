const express = require("express") ;
const getToken = require("./helpers/getToken");
const cors = require("cors")
const axios = require("axios");
const https = require("https");


const app = express()
const PORT = process.env.PORT || 7000

//usamos http agent para la autoceritifcacion
const agent = new https.Agent({
  rejectUnauthorized: false
});

//Datos del controlador Omada
const OMADA_IP = "192.168.100.28"
const OMADA_PORT = "443"
const OMADA_ID = "61c48dad6e3fdd80c79a1340bcf9817c"



//Credentials Omada Controler

app.use(express.json())
app.use(cors({ origin: "*"}))

app.post("/api/login", async (req, res) => {
  console.log(req.body)
  const { controllerData,userData } = req.body
  
  const token = await getToken()
  console.log(token)

  if(token.error){
    res.json({error: token.error})
  }

  console.log(token)

  // const { clientMac, apMac, ssidName, radioId } = controllerData

  // const response = await axios.post(`https://${OMADA_IP}:${OMADA_PORT}/${OMADA_ID}/api/v2/hotspot/extPortal/auth`, {
  //   clientMac,
  //   apMac,
  //   ssidName,
  //   radioId,
  //   time:60000 * 120,
  //   authType: 4
  // },
  // {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     // 'Csrf-Token' : token,
  //   },
  //   httpsAgent: agent
  // }
  // );
  
  // const { data } = response;
  // console.log(data)
  
  res.json({message:"conected", token})

});

//Ruta de prueba
app.get("/api/login", async (req, res) => {
  console.log("solicitud get")
  
   const token = await getToken()
   
   

   if(token.error){
     res.json({error: token.error})
   }
  
  res.json(token)

});

app.listen(PORT, () =>{
  console.log(`Escuchando en el puerto ${PORT}`)
})