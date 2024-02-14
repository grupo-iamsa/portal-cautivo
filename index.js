import express  from "express";

const app = express()
const PORT = process.env.PORT || 7000

app.use(express.json())

app.get("/", (req, res) =>{
  res.send("Hola")
})

app.get("/api", (req, res) =>{
  const { clientMac, apMac, gatewayMac, vid, ssidName, radioId, site, redirectUrl, t } = req.query

  console.log(`Usuario conectado con: {
    Dirección MAC del cliente: ${clientMac},
    Dirección MAC del EAP: ${ apMac },
    Dirección MAC de la puerta de enlace: ${ gatewayMac }
    ID de VLAN CLiente: ${ vid },
    Nombre del SSID: ${ ssidName},
    Radio ID: ${ radioId === 1 ?  "5G" : "2.4G" },
    Nombre del sitio : ${ site },
    Redireccionamiento: ${ redirectUrl },
    Microsegundos: ${ t }
  }`)
  res.send("Bienvenido al formulario")
})

app.listen(PORT, () =>{
  console.log(`Escuchando en el puerto ${PORT}`)
})