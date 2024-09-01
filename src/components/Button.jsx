import PropTypes from 'prop-types';

const Button = ({label , customClasses = "",onclick}) => {
    return (
      <button
         className={`bg-white text-gray-700 p-5 text-xl font-xl font-medium flex justify-center items-center ${customClasses}`}
         onClick={onclick}  
      >
        {label}
      </button>
    )
  }



  Button.propTypes = {
    label: PropTypes.string.isRequired,
    customClasses: PropTypes.string,
    onclick: PropTypes.func.isRequired, 
  };

  
  export default Button