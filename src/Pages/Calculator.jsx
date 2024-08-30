import Display from "../components/Display"
import Button from "../components/Button"
import ButtonConfig from "../Config/ButtonConfig"

const Calculator = () => {
  return (
    <div className="w-80 mx-auto mt-7  bg-gray-100    shadow-lg">
       <Display/>
       <div className="grid grid-cols-4">
        {ButtonConfig.map((button, index) => (
          <Button
            key={index}
            label={button.label}
            customClasses={button.customClasses}
          />
        ))}
      </div>
    </div>
  )
}

export default Calculator