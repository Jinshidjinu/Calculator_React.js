import PropTypes from 'prop-types';

const Button = ({label , customClasses = ""}) => {
    return (
      <button
         className={`bg-white text-gray-700 p-5 text-xl font-xl font-medium flex justify-center items-center ${customClasses}`}
      >
        {label}
      </button>
    )
  }



  Button.propTypes = {
    label: PropTypes.string.isRequired,
    customClasses: PropTypes.string
  };

  
  export default Button