const colors = require("colors")
const axios = require("axios")
const https = require("https")

//usamos http agent para la autoceritifcacion
const agent = new https.Agent({
  rejectUnauthorized: false
});

//datos de Conexion
const OMADA_IP = "192.168.100.28"
const OMADA_PORT = "443"
const OMADA_ID = "61c48dad6e3fdd80c79a1340bcf9817c"

const setUserInfo = async (connectionData) => {

  console.log(`\nEnviando data de conexion al EAP... ` .yellow)
  console.log(connectionData)

   const { clientMac, apMac, ssidName, radioId, site} = connectionData.controllerData

   const response = await axios.post(`https://${OMADA_IP}:${OMADA_PORT}/${OMADA_ID}/api/v2/hotspot/extPortal/auth`, {
     clientMac,
     apMac,
     ssidName,
     radioId,
     site,
     time:60000 * 120,
     authType: 4
   },
   {
     headers: {
       'Content-Type': 'application/json',
       'Csrf-Token' : connectionData.tokenData,
     },
     httpsAgent: agent
   }
   );
  
   const { data } = response;
   console.log(data)
   return data
}

module.exports = setUserInfo