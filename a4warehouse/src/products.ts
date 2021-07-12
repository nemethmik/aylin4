export type TProduct = {
    id:number,
    name:string,
    image:string,
}
const productsCatalogue:TProduct[] =[
    {id:1,name:"Bagpipe",image:"https://th.bing.com/th/id/R.2f34dc685664899dd049e7c39f816339?rik=DK%2b%2f5WpojRVtMQ&pid=ImgRaw"},
    {id:2,name:"castagnari Mory",image:"https://th.bing.com/th/id/OIP.jfYKyykRQG40Wh6mGYcBhgHaFj?w=226&h=180&c=7&o=5&pid=1.7"},
]
export function queryProducts():TProduct[] {
    return productsCatalogue
}
export function addProduct(p:TProduct):TProduct {
    if(p.id != 0) throw "Product ID must be 0"
    p.id = productsCatalogue.length + 1
    productsCatalogue.push(p)
    return p
}