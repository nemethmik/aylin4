import { Schema, Model, Connection} from "mongoose"
export const PRODCATEGCOLLECTIONNAME = "ProdCateg"
export type TProdCateg = {
    id?:number,
    name:string,
    image:string,
}
// The third parameter is terribly important, otherwise MongoDB generates random collection names 
const prodCategModel = (db:Connection) => db.model<TProdCateg>(PRODCATEGCOLLECTIONNAME, prodCategSchema, PRODCATEGCOLLECTIONNAME) 
// Object literal may only specify known properties, but 'emaill' does not exist in type ...
// Did you mean to write 'email'?
const prodCategSchema = new Schema<TProdCateg,Model<TProdCateg>,TProdCateg>({
  name: { type: String, required: true },
  image: { type: String, required: true },
})

const prodCategsCatalogue:TProdCateg[] =[
    {id:1,name:"Bagpipes",image:"https://th.bing.com/th/id/R.2f34dc685664899dd049e7c39f816339?rik=DK%2b%2f5WpojRVtMQ&pid=ImgRaw"},
    {id:2,name:"Button Accordions",image:"https://th.bing.com/th/id/OIP.jfYKyykRQG40Wh6mGYcBhgHaFj?w=226&h=180&c=7&o=5&pid=1.7"},
]
export async function queryProdCategs(db:Connection):Promise<TProdCateg[]> {
    return await prodCategModel(db).find()
}
export async function addProdCateg(db:Connection,p:TProdCateg):Promise<TProdCateg> {
    if(p.id != 0) throw "ID must be 0"
    p.id = prodCategsCatalogue.length + 1
    prodCategsCatalogue.push(p)
    const M = prodCategModel(db)
    const doc = new M(p)
    const savedDoc = await doc.save()
    return savedDoc
}
export async function findByIdAndDeleteProdCateg(db:Connection,id:string):Promise<TProdCateg> {
    if(!id) throw "ID must be defined for deletion"
    const M = prodCategModel(db)
    const doc = await M.findByIdAndDelete(id).exec()
    if(!doc) {
        throw `No Product Category found for ID ${id}`
    } else {
        return doc
    }
}
export async function findProdCateg(db:Connection,id:string):Promise<TProdCateg> {
    if(!id) throw "ID is missing"
    const M = prodCategModel(db)
    const doc = await M.findById(id).exec()
    if(!doc) {
        throw `No Product Category found for ID ${id}`
    } else {
        return doc
    }
}

//In this example TS correctly detects that the return value cannot be null
// export function f():number {
//     let n:number | null = 1
//     n = null
//     n = 457
//     //return n == null ? 0 : n
//     if(n == null) throw "Null error" 
//     else return n
// }
