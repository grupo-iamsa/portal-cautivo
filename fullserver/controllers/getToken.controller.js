const axios = require("axios");
const https = require("https");
const colors = require("colors")

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

//usamos http agent para la autoceritifcacion
const agent = new https.Agent({
  rejectUnauthorized: false
});

//Peticion a la API del controlador
const getToken = async () =>{
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
    return data.result
  }
  if(data.errorCode === -1600){
    console.log(`🔺🔺🔺 Peticion a la ruta ${LOGIN_PATH}, no soportada, revisa que la direccion IP, el Puerto
    y el ID del dispositivo Omada sean correctos. O que el controlador este encendido 🔺🔺🔺 ` .red)
    
    return{error: `Peticion a la ruta ${LOGIN_PATH}, no soportada, revisa que la direccion IP, el Puerto
    y el ID del dispositivo Omada sean correctos. O que el controlador este encendido`}
  }
  if(data.errorCode === -30109){
    console.log(`🔺🔺🔺 Usuario o contraseña invalidos 🔺🔺🔺 ` .red)

    return{error: "Usuario o contraseña invalidos"}
  }

  //en caso de que sea algun otro error mandamos la dara, la cual ya contiene el error
  console.log(`🔺🔺🔺 ${ data.result} 🔺🔺🔺 ` .red)
  return data

}

module.exports = getToken