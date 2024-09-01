import Display from "../components/Display"
import Button from "../components/Button"
import ButtonConfig from "../Config/ButtonConfig"
import { useEffect, useState } from "react"
import axiosInsatance from "../Config/axiosConfig"
import History from "../components/History"
import { RiDeleteBin6Line } from "react-icons/ri";

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [prevCalculation, setPrevCalculation] = useState('');
  const [currentOperand, setCurrentOperand] = useState(null);
  const [operation, setOperation] = useState(null);
  const [history , setHistory] = useState([])
  console.log(history,'jinu');
  


  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axiosInsatance.get('/history');
      console.log('Fetched History:', response.data); // Log the fetched data
      setHistory(Array.isArray(response.data) ? response.data : []);
      console.log('Updated History State:', history); // Log updated state
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };
 
  const handleButtonClick = (label) => {
    switch (label) {
      case 'AC':
        setDisplay('0');
        setPrevCalculation('');
        setCurrentOperand(null);
        setOperation(null);
        break;

      case '+/-':
        setDisplay(prev => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
        setCurrentOperand(prev => parseFloat(prev) * -1);
        break;

      case '%': {
        const percentage = parseFloat(display) / 100;
        setDisplay(percentage.toString());
        setCurrentOperand(percentage);
        break;
      }

      case '÷':
      case '×':
      case '-':
      case '+':
        handleOperationClick(label);
        break;

      case '=':
        handleEqualsClick();
        break;

      case ',':
        if (!display.includes('.')) {
          setDisplay(display + '.');
        }
        break;

      default:
        handleNumberClick(label);
        break;
    }
  }

  const handleNumberClick = (num) => {
    setDisplay(prev => prev === '0' ? num : prev + num)
    setCurrentOperand(parseFloat(display === '0' ? num : display + num))
  }

  const handleOperationClick = (op) => {
    if (currentOperand !== null) {
      setPrevCalculation(display + ' ' + op);
      setOperation(op);
      setDisplay('0');
      setCurrentOperand(null);
    }
  }

  const handleEqualsClick = async() => {
    if (currentOperand !== null && operation) {
      let result;
      const [prevOperand] = prevCalculation.split(' ')

      switch (operation) {
        case '+':
          result = parseFloat(prevOperand) + currentOperand;
          break;
        case '-':
          result = parseFloat(prevOperand) - currentOperand;
          break;
        case '×':
          result = parseFloat(prevOperand) * currentOperand;
          break;
        case '÷':
          result = parseFloat(prevOperand) / currentOperand;
          break;
        default:
          return;
      }
      

      const calculation = `${prevOperand} ${operation} ${currentOperand}`
      setDisplay(result.toString());
      setPrevCalculation('');
      setCurrentOperand(result);
      setOperation(null);

      try {
        await axiosInsatance.post('/calculation',{calculation, result: result.toString()})
        fetchHistory()
      } catch (error) {
        console.error('Failed to save calculation', error);
        
      }
    }
  };

  const deleteHistory = async()=>{
    try {
      await axiosInsatance.delete('/deletehistory')
      setHistory([])
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[1000px]  flex mt-10   ">

    <div className="w-80 mx-auto mt-7  bg-gray-100    shadow-lg">
       <Display value={display} prevCalculation={prevCalculation}/>
       <div className="grid grid-cols-4 ">
        {ButtonConfig.map((button, index) => (
          <Button
            key={index}
            label={button.label}
            customClasses={button.customClasses}
            onclick={()=>handleButtonClick(button.label)}
          />
        ))} 
      </div>
    </div>
      <div className="relative">
        <History history={history} />
        <RiDeleteBin6Line
          onClick={deleteHistory}
          className="absolute top-0 right-0 text-red-500 cursor-pointer m-2"
        />
      </div>
    </div>
  )
}

export default Calculator