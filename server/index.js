import express  from "express";
import path from "node:path";
import { writeFileSync } from "node:fs"

const app = express()
const PORT = process.env.PORT || 7000

app.use(express.json())

app.get("/", (req, res) =>{
  res.send("Hola")
})

app.get("/api", (req, res) =>{
  // const { clientMac, apMac, gatewayMac, vid, ssidName, radioId, site, redirectUrl, t } = req.query
  console.log(req.query)
  const EAPInfo = req.query
  
  writeFileSync(`${path.join(process.cwd())}/clients/clientMac_${EAPInfo.clientMac}.json`, JSON.stringify(EAPInfo))
  res.json(EAPInfo)
})

app.listen(PORT, () =>{
  console.log(`Escuchando en el puerto ${PORT}`)
})