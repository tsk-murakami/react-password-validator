
import React, { useState } from "react";

import { withValidState, WithProps } from 'react-password-validator';

interface IProps {
    title: string;
};

const Component: React.FC<IProps&WithProps> = props => {
    const [ password, setPassword ] = useState("")
    const { title, isValid, setIsValid } = props;

    return <div>
        <h5>{title}</h5>
        <input
          type="password"
          value={password}
          onChange={ e => { 
            setPassword(e.target.value)
            setIsValid(e.target.value)
          }}>
        </input>
        <p>IsValid: {String(isValid)}</p>
    </div>
};

export default withValidState(Component, { spaces: 1, uppercase: 1, lowercase: 1, digits: 1, symbols: 1, min: 5, max: 10 })
