import {queryProducts,addProduct,TProduct} from "./products"
import { Schema, model, connect, connection, Connection } from "mongoose"
import express = require("express")
import morgan = require("morgan")
require("dotenv/config")

async function connectMongoDB() {
    if(process.env.MONGODB_CONNECTION) {
        try {
            await connect(process.env.MONGODB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true  })
            console.log("Connected to Database")
        } catch(error) {
            console.log(error)
            throw error
        }
    } else {
        throw "No process.env.MONGODB_CONNECTION defined"
    }    
}

async function startService() {
    //await connectMongoDB() // Synchronous call letting the entire app crashing, if the database connection fails
    try{connectMongoDB()}catch(e){console.log(e)} // Async call letting the service startup even when the database cannot be connected
    const app:express.Express = express()
    const apiVer = process.env.API_VER || "api/v1/"
    enum EServices {products = "Products", orders = "Orders"} // Not const otherwise its values, keys couldn't be used dynamically

    app.use(express.json())
    app.use(morgan("tiny"))

    app.get(apiVer + EServices.products, async (req,res) => {
        //res.send(`Welcome on board for API ${apiVer}`)
        res.send(await queryProducts(connection))
    })

    app.post(apiVer + EServices.products, async (req,res) => {
        const p:TProduct = req.body
        console.log(apiVer + EServices.products,p)
        try {
            res.status(201).send(await addProduct(connection,p))
        } catch(e) {res.status(400).send(e)}
        
    })

    let port: number = parseInt(process.env.PORT || "3000")
    if(isNaN(port) || port <= 0 || port >= 65536) port = 3000
    app.listen(port,() => {
        console.log(`Open http://localhost:${port}${apiVer} in a browser to test`)
        console.log("The services available on this endpoint are ", Object.values(EServices))    
    })
}
startService()