import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../Config/axiosConfig';

const CalculatorContext = createContext();


const CalculatorProvider = ({ children }) => {
  const [display, setDisplay] = useState('0');
  const [prevCalculation, setPrevCalculation] = useState('');
  const [currentOperand, setCurrentOperand] = useState(null);
  const [operation, setOperation] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axiosInstance.get('/history');
      setHistory(Array.isArray(response.data) ? response.data : []);
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
        setDisplay(prev => {
          const newValue = parseFloat(prev) * -1;
          setCurrentOperand(newValue);
          return newValue.toString();
        });
        break;
      case '%':
        setDisplay(prev => {
          const newValue = parseFloat(prev) / 100;
          setCurrentOperand(newValue);
          return newValue.toString();
        });
        break;
      case '÷':
      case '×':
      case '-':
      case '+':
        handleOperationClick(label);
        break;
      case '=':
        handleEqualsClick();
        break;
      case '.':
        if (!display.includes('.')) {
          setDisplay(prev => prev + '.');
          setCurrentOperand(parseFloat(display + '.'));
        }
        break;
      default:
        handleNumberClick(label);
        break;
    }
  };

  const handleNumberClick = (num) => {
    setDisplay(prev => {
      const newDisplay = prev === '0' ? num : prev + num;
      setCurrentOperand(parseFloat(newDisplay));
      return newDisplay;
    });
  };
  const handleOperationClick = (op) => {
    // Prevent multiple operators in a row
    if (operation) {
      setPrevCalculation(prev => prev.slice(0, -1) + ' ' + op);
    } else {
      setPrevCalculation(prev => `${prev} ${display} ${op}`.trim());
    }
    setOperation(op);
    setDisplay('0');
    setCurrentOperand(null);
  };
  
  const handleEqualsClick = async () => {
    if (currentOperand !== null && operation) {
      const operands = prevCalculation.trim().split(' ');
  
      // Validate operands and operation
      if (operands.length < 2 || isNaN(parseFloat(operands[operands.length - 2])) || isNaN(currentOperand)) {
        console.error('Invalid operands or operation:', operands, currentOperand);
        return;
      }
  
      const prevOperand = parseFloat(operands[operands.length - 2]); // Get the last operand
  
      let result;
      switch (operation) {
        case '+':
          result = prevOperand + currentOperand;
          break;
        case '-':
          result = prevOperand - currentOperand;
          break;
        case '×':
          result = prevOperand * currentOperand;
          break;
        case '÷':
          if (currentOperand === 0) {
            console.error('Cannot divide by zero');
            return;
          }
          result = prevOperand / currentOperand;
          break;
        default:
          console.error('Unknown operation:', operation);
          return;
      }
  
      // Format the result and calculation string
      const calculation = `${prevCalculation} ${display}`;
      setDisplay(result.toString());
      setPrevCalculation('');
      setCurrentOperand(result);
      setOperation(null);
  
      try {
        await axiosInstance.post('/calculation', { calculation, result: result.toString() });
        fetchHistory();
      } catch (error) {
        console.error('Failed to save calculation:', error.response ? error.response.data : error.message);
      }
    } else {
      console.error('Invalid state for calculation:', { currentOperand, operation });
    }
  };
  

  const deleteHistory = async () => {
    try {
      await axiosInstance.delete('/deletehistory'); 
      setHistory([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CalculatorContext.Provider
      value={{
        display,
        prevCalculation,
        currentOperand,
        operation,
        history,
        handleButtonClick,
        deleteHistory,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export { CalculatorContext, CalculatorProvider };