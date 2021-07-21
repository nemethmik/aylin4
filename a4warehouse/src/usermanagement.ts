import { Schema, Model, Connection} from "mongoose"
import bcrypt = require("bcryptjs")
const USERCOLLECTIONNAME = "User"
//const BCRYPTSEED = 10
export type TUser = {
    id?:number,
    name:string,
    email:string,
    password:string,
}
// The third parameter is terribly important, otherwise MongoDB generates random collection names 
const userModel = (db:Connection) => db.model<TUser>(USERCOLLECTIONNAME, userSchema,USERCOLLECTIONNAME)

// Object literal may only specify known properties, but 'emaill' does not exist in type ...
// Did you mean to write 'email'?
const userSchema = new Schema<TUser,Model<TUser>,TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: {type: String, required: true},
})

const usersCatalogue:TUser[] =[
    {id:1,name:"Tommy",email:"tommy@gmail.com",password:"hello123"},
    {id:2,name:"Lilli",email:"lilli@freemail.com",password:"baba123"},
]
export async function queryUsers(db:Connection):Promise<TUser[]> {
    return await userModel(db).find().select("-password")
}
export async function registerUser(db:Connection,u:TUser):Promise<TUser> {
    if(u?.password.length == 0) throw "Password has to be defined upon user registration"
    u.id = usersCatalogue.length + 1
    u.password = bcrypt.hashSync(u.password)
    usersCatalogue.push(u)
    const M = userModel(db)
    const doc = new M(u)
    const savedDoc = await doc.save()
    return savedDoc
}
export async function findUser(db:Connection,id:string):Promise<TUser> {
    if(!id) throw "ID is missing"
    const M = userModel(db)
    //select("name email") would work, too
    const doc = await M.findById(id).select("-password").exec()
    if(!doc) throw `No user found for ID ${id}`
    return doc
}
export async function updateUser(db:Connection,id:string,u:TUser):Promise<TUser> {
    if(!id) throw "ID is missing"
    if(u?.id) throw "Omit the ID from the update data JSON"
    if(u?.password) u.password = bcrypt.hashSync(u.password)
    const M = userModel(db)
    //select("name email") would work, too
    const doc = await M.findByIdAndUpdate(id,u,{new:true}).exec()
    if(!doc) throw `No user found for ID ${id}`
    return doc
}
export async function loginUser(db:Connection,email:string,password:string):Promise<TUser> {
    if(!email) throw "email is missing for login"
    const M = userModel(db)
    //select("name email") would work, too
    const doc = await M.findOne({email}).exec()
    if(!doc) throw `No user found for email ${email} or wrong password`
    if(!bcrypt.compareSync(password,doc.password)) throw "Wrong password or email"
    return doc
}
