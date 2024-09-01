import { Response,Request } from "express"
import calculationModel from "../db/models/calculationSchema"
import { timeStamp } from "console"

export const calculationController = ()=>{
      
    const calculation = async(req:Request,res:Response)=>{
        const {calculation, result} = req.body
        console.log(calculation,"hellooo",result);
        try {
         
        const newCalculation = new calculationModel({calculation,result})
        await newCalculation.save()
        res.status(201).json({ message: 'Calculation saved successfully', calculation: newCalculation });         
        } catch (error) {
        res.status(500).json({ message: 'Server error' });
        }
        
    }

    const history = async(req:Request, res:Response)=>{
        try {
            const historyData = await calculationModel.find().sort({timeStamp:-1}).limit(10)
            res.json(historyData)
        } catch (error) {
            res.status(500).json({ message: 'Error fetching history'})
        }
    }  
    

    const deletehistory = async (req:Request , res:Response)=>{
        try {
            await calculationModel.deleteMany({})
            res.status(200).json({ message: 'Calculation history deleted successfully' });    
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete history', error });
        }
    }
    return {
        calculation,
        history,
        deletehistory
     
    }
}