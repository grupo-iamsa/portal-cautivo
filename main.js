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

async function sendConection(){
  const res = await fetch(`http://192.168.100.34:7000/api/login`)
  const data = await res.json()
  console.log(data)
}