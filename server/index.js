import express  from "express";
import axios from "axios";
import https from "https"
import path from "node:path";
import { writeFileSync } from "node:fs"

const app = express()
const PORT = process.env.PORT || 7000

// Server Data
const OMADA_IP = "192.168.100"
const OMADA_PORT = "433"
const OMADA_ID = "61c48dad6e3fdd80c79a1340bcf9817c"

app.use(express.json())
const agent = new https.Agent({
  rejectUnauthorized: false
});

app.get("/api/login", async (req, res) => {
  try {
    const response = await axios.post(
      'https://192.168.100.28:443/61c48dad6e3fdd80c79a1340bcf9817c/api/v2/hotspot/login',
      {
        name: "jasubi",
        password: "jasubi"
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        httpsAgent: agent
      }
    );
    const data = response.data;
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () =>{
  console.log(`Escuchando en el puerto ${PORT}`)
})