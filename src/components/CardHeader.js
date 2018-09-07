import React from 'react';

const CardHeader = ({...props}) => (
    <div className="cardHeader">
        {props.children}
    </div>
)

export default CardHeader;