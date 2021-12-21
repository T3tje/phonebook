import React from "react";

const notificatonStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const ErrMsg = ({msg}) => {
    if (msg === null) {
        return null
    }
    return(
        <div style={notificatonStyle}>{msg}</div>
    )
}

export default ErrMsg