import {queryProducts,addProduct,TProduct} from "./products"
import express = require("express")
import morgan = require("morgan")
require("dotenv/config")

const app:express.Express = express()
const apiVer = process.env.API_VER || "api/v1/"
enum EServices {products = "Products", orders = "Orders"} // Not const otherwise its values, keys couldn't be used dynamically

app.use(express.json())
app.use(morgan("tiny"))

app.get(apiVer + EServices.products,(req,res) => {
    //res.send(`Welcome on board for API ${apiVer}`)
    res.send(queryProducts())
})

app.post(apiVer + EServices.products,(req,res) => {
    const p:TProduct = req.body
    console.log(apiVer + EServices.products,p)
    try {
        res.status(201).send(addProduct(p))
    } catch(e) {res.status(400).send(e)}
    
})
let port: number = parseInt(process.env.PORT || "3000")
if(isNaN(port) || port <= 0 || port >= 65536) port = 3000
app.listen(port,() => {
    console.log(`Open http://localhost:${port}${apiVer} in a browser to test`)
    console.log("The services available on this endpoint are ", Object.values(EServices))    
})