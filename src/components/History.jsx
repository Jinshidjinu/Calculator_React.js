import PropTypes from 'prop-types'; 

const History = ({ history }) => {
  console.log('History Prop:', history)

  return (
    <div className="bg-white p-4 rounded-md shadow-lg mt-4">
      <h2 className="text-lg font-bold mb-2">Calculation History</h2>
      <ul>
        {history.length > 0 ? (
          history.map((calc, index) => (
            <li className="mb-1" key={index}>
              {calc.calculation} = {calc.result}
            </li>
          ))
        ) : (
          <li></li>
        )}
      </ul>
    </div>
  );
};

History.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      calculation: PropTypes.string.isRequired,
      result: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default History;
