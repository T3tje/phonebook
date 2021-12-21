import React from "react";

const Filterinput = ({filter, handleFilter}) => {
    return (
        <div>
        filter shown with a <input value={filter} onChange={handleFilter}/>
        </div>
    )
}

export default Filterinput