import { connectToDB } from "../db/connectToDB.js"
import { asyncWrapper } from "./AsyncWrapper.js";

const startApp = asyncWrapper(async(app, port)=>{

      //DBConnection
      await connectToDB(process.env.MONGODB_URI);
      app.listen(port, ()=>console.log(`your server is ready for fireworks on ${port}`))

})

export {startApp};