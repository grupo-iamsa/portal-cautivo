const btnSend = document.querySelector("#btn-send")

btnSend.addEventListener("click", sendConection)
/**
 * @description se extraen los parametros de busqueda
 */
const urlQuerys = new URLSearchParams(window.location.search)

const eapData = {
  clientMac: urlQuerys.get("clientMac"),
  clientIp: urlQuerys.get("clientIp"),
  site: urlQuerys.get("site"),
  redirectUrl: urlQuerys.get("redirectUrl"),
  apMac: urlQuerys.get("apMac"),
  ssidName: urlQuerys.get("ssidName"),
  radioId: urlQuerys.get("radioId")
}

console.log(eapData)

localStorage.setItem('eapData', JSON.stringify(eapData))

const CONTROLLER_IP = "192.168.100.28"
const PORT = "443"
const CONTROLlER_ID = "61c48dad6e3fdd80c79a1340bcf9817"

const postData = {
  OPERATOR_USERNAME : "usuario",
  OPERATOR_PASSWORD : "usuario123456"
}

async function sendConection(){
  const res = await fetch(`https://${CONTROLLER_IP}:${PORT}/${CONTROLlER_ID}/api/v2/hotspot/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
  const data = res.json()
  console.log(data)
}