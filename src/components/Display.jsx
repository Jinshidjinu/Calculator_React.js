
const Display = ({value,prevCalculation }) => {
  return (
     <div className="bg-gradient-to-r from-pink-500 to-orange-400 text-white p-10 rounded-t-md   text-right">
        <div>{value}</div>
        <div>{prevCalculation}</div>
    </div>
  )
}

export default Display