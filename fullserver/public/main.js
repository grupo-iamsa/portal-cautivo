const btnSend = document.querySelector("#btn-send")

btnSend.addEventListener("click", handlerForm)

const SERVER_IP = "172.30.106.134"
const SERVER_PORT = "7000"


function handlerForm(e){
  e.preventDefault()
  const formCheked = checkForm()
  const controllerData = getUrlParams()

  const connectionParams = {
    userData: formCheked,
    controllerData: controllerData
  }

  if(connectionParams.userData === undefined || connectionParams.controllerData === undefined){
    return alert("Fallo al conectar")
  }else{
    setUserData(connectionParams)
    //console.log(connectionParams)
    //testGet()
  }


}


function getUrlParams(){
  const urlQuerys = new URLSearchParams(window.location.search)

  const controllerData = {
    clientMac: urlQuerys.get("clientMac"),
    clientIp: urlQuerys.get("clientIp"),
    site: urlQuerys.get("site"),
    redirectUrl: urlQuerys.get("redirectUrl"),
    apMac: urlQuerys.get("apMac"),
    ssidName: urlQuerys.get("ssidName"),
    radioId: urlQuerys.get("radioId")
  }

  for (const param of Object.keys(controllerData)) {
    // Verifica si el valor de la propiedad actual es falsy (undefined, null, false, "", 0, NaN)
    if (!controllerData[param]) {
      alert("Sin datos del controlador");
      return undefined; // Termina el bucle si encuentra un valor falso
    }
  }

  //si se obtienen los parametros de la URL retornamos la info
  return controllerData
}

function checkForm(){

  const userName = document.getElementById("name").value
  const userPhone = document.getElementById("phone").value
  const userEmail = document.getElementById("email").value
  const userAge = document.getElementById("age").value

  if(userName.length < 10 || userName.length > 30){
    return alert("Ingrese un nombre valido")
  }
  if(userPhone.length > 13 || userPhone.length < 10){
    return alert("Ingrese un numero de telefono valido")
  }
  if(userAge.length < 1 || userAge.length > 3){
    return alert("Ingresa una edad valida")
  }

  const  userData = {
    userName: userName,
    userPhone : userPhone,
    userEmail : userEmail,
    userAge : userAge
  }

  //console.log({message: "Formulario Valido", data: userData})
  return userData
}

async function setUserData(connectionParams){

  try {
    const res = await fetch(`http://${SERVER_IP}:${SERVER_PORT}/api`,{
      method: "POST",
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify(connectionParams)
    });

    if (!res.ok) {
      throw new Error('La solicitud HTTP falló con el código: ' + res.status);
    }

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error('Ocurrió un error al procesar la solicitud:', error);
  }
}

//Prueba de conexion con la NuestraAPI
async function testGet(){
  const res = await fetch(`http://${SERVER_IP}:${SERVER_PORT}/api/login`)
  const data =  await res.json()
  console.log(data)
}