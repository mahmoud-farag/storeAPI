
const homeRoute = (req,res)=>{
    res.status(200).send('<h1>STORE APY</h1> <a href="/api/v1/products"> go to products</a>')
}


export {homeRoute};