import {queryProducts,addProduct,TProduct} from "./products"
import {queryProdCategs,addProdCateg,findByIdAndDeleteProdCateg,findProdCateg,TProdCateg} from "./pcategories"
import {connect, connection} from "mongoose"
import express = require("express")
import morgan = require("morgan") // remember to import @types/morgan
import cors = require("cors") // remember to import @types/cors
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
    // Not const enum otherwise its values, keys couldn't be used dynamically
    enum EServices {products = "Products", orders = "Orders", prodCategs ="ProdCategs"} 
    //options for cors midddleware
    // const corsOptions: cors.CorsOptions = {
    //     allowedHeaders: ["Origin","X-Requested-With","Content-Type","Accept","X-Access-Token",],
    //     credentials: true,
    //     methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    //     origin: "*",
    //     preflightContinue: false,
    // }
    app.use(cors({origin: "*",}))
    //app.options("*",cors(corsOptions))
    app.use(express.json())
    app.use(morgan("tiny"))
    // **** PRODUCTS API
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
    // **** PRODUCT CATEGORIES API
    app.get(apiVer + EServices.prodCategs, async (req,res) => {
        res.send(await queryProdCategs(connection))
    })
    app.get(apiVer + EServices.prodCategs + "/:id", async (req,res) => {
        try {
            res.status(200).send(await findProdCateg(connection,req.params.id))
        } catch(e) {res.status(400).send(e)}
    })
    app.post(apiVer + EServices.prodCategs, async (req,res) => {
        const p:TProdCateg = req.body
        console.log(apiVer + EServices.prodCategs,p)
        try {
            res.status(201).send(await addProdCateg(connection,p))
        } catch(e) {res.status(400).send(e)}
        
    })
    app.delete(apiVer + EServices.prodCategs + "/:id", async (req,res) => {
        try {
            //res.status(200).send(await deleteProdCateg(connection,req.params.id))
            //Or, 204 is the no content, which means that the operation was successfull but no body response was sent, or it can be ignored by the HTTP client
            await findByIdAndDeleteProdCateg(connection,req.params.id)
            res.status(204).send()
        } catch(e) {res.status(400).send(e)}
    })
    // **** STARTING THE SERVICE
    let port: number = parseInt(process.env.PORT || "3000")
    if(isNaN(port) || port <= 0 || port >= 65536) port = 3000
    app.listen(port,() => {
        console.log(`Open http://localhost:${port}${apiVer} in a browser to test`)
        console.log("The services available on this endpoint are ", Object.values(EServices))    
    })
}
startService()