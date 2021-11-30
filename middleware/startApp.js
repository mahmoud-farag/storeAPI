import { connectToDB } from "../db/connectToDB.js"
// import { asyncWrapper } from "./asyncWrapper.js";

const startApp = async(app, port)=>{

      try { //DBConnection
            await connectToDB(process.env.MONGODB_URI);
            app.listen(port, ()=>console.log(`your server is ready for fireworks on ${port}`))
            
      } catch (error) {
            console.log(error.message)
            // res.status(501).json(error.message)

      }
     

}

export {startApp};