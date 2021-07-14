import { Schema, Model, Connection} from "mongoose"
const PRODUCTCOLLECTIONNAME = "Product"
export type TProduct = {
    id?:number,
    name:string,
    image:string,
    countInStock?:number,
}

// Object literal may only specify known properties, but 'emaill' does not exist in type ...
// Did you mean to write 'email'?
const productSchema = new Schema<TProduct,Model<TProduct>,TProduct>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  countInStock: {type:Number, required: true},
},{autoCreate:false})

const productsCatalogue:TProduct[] =[
    {id:1,name:"Bagpipe",image:"https://th.bing.com/th/id/R.2f34dc685664899dd049e7c39f816339?rik=DK%2b%2f5WpojRVtMQ&pid=ImgRaw"},
    {id:2,name:"castagnari Mory",image:"https://th.bing.com/th/id/OIP.jfYKyykRQG40Wh6mGYcBhgHaFj?w=226&h=180&c=7&o=5&pid=1.7"},
]
export async function queryProducts(db:Connection):Promise<TProduct[]> {
    const ProductModel = db.model<TProduct>(PRODUCTCOLLECTIONNAME, productSchema,PRODUCTCOLLECTIONNAME)
    return await ProductModel.find()
}
export async function addProduct(db:Connection,p:TProduct):Promise<TProduct> {
    if(p.id != 0) throw "Product ID must be 0"
    p.id = productsCatalogue.length + 1
    productsCatalogue.push(p)
    const ProductModel = db.model<TProduct>(PRODUCTCOLLECTIONNAME, productSchema,PRODUCTCOLLECTIONNAME)
    const doc = new ProductModel(p)
    const savedDoc = await doc.save()
    return savedDoc
}