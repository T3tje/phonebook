import React from "react";

const notificatonStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const ConfirmMsg = ({msg}) => {
    if (msg === null) {
        return null
    }
    return(
        <div style={notificatonStyle}>{msg}</div>
    )
}

export default ConfirmMsg