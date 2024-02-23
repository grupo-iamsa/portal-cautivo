const path = require("path")
const getToken = require("./getToken.controller")

const viewsControllers = {}
const formPath = path.join(process.cwd(), "views", "index.html")
console.log(formPath)

viewsControllers.showForm = (req, res) =>{
  console.log("Nuevo Usuario 🤩" .cyan)

  res.sendFile(path.join(process.cwd(), "views", "index.html"))
}

module.exports = viewsControllers