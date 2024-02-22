const express = require("express")
const path = require("path")
const viewsControllers = require("./controllers/views.controller")

//We raise server
const app = express()
const PORT = process.env.PORT | 7000
app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`))

//midelwares
app.use(express.static(path.join(__dirname, "public")))

//routes
app.get("/", viewsControllers.showForm)
