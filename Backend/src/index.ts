import app from "./app";
import { Databaseconnection } from "./connection/connection";
const PORT = process.env.PORT || 5000

const start = async ()=>{
    try {
        await Databaseconnection()
    } catch (error) {
        console.log(error)
        
    }
}

app.listen(PORT,()=>{
    console.log(PORT,"started");
    
})

// Start the application
start()

