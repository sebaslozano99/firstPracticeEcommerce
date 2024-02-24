import PropTypes from "prop-types";



function Button ({
    children,
    classname = "",
    backgroundColor = "fff",
    color = "",
    padding = 0,
    handleFunc, //dispatchFunction
    type = "", //type of dispatchFunc we are gonna execute
    payload = {}, // payload to update state
    fontSize = 20
}){


    const buttonStyles= {
        backgroundColor: `#${backgroundColor}`,
        padding: `${padding}px`,
        cursor: "pointer",
        outlineStyle: "none",
        borderStyle: "none",
        borderRadius: "5px",
        color: `#${color}`,
        fontSize: `${fontSize}px`
    }
    


  return (
    <button style={buttonStyles} className={classname} onClick={() => handleFunc({type: `${type}`, payload: payload})} >
        {
            children
        }
    </button>
  )
}

export default Button


Button.propTypes = {
    children: PropTypes.string,
    backgroundColor: PropTypes.string,
    classname: PropTypes.string,
    padding: PropTypes.number,
    handleFunc: PropTypes.func,
    type: PropTypes.string,
    payload: PropTypes.object,
    color: PropTypes.string,
    fontSize: PropTypes.number,
}