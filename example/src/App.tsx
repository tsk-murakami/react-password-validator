import React, { Fragment, useState, useCallback } from 'react'

import usePasswordValidator from 'react-password-validator';

import Sample from "./with-component";

//import { FormControl } from "react-bootstrap";

const App = () => {
  return <Fragment>
    <Basic />
    <UseRule />
    <Sample title='Wrapper Sample' />
  </Fragment>
}

export default App

const Basic = () => {
  const [ isValid, setIsValid ] = usePasswordValidator();
  const [ password, setPassword ] = useState("")

  const handleChange = useCallback( (input: string) => {
    setPassword(input);
    setIsValid(input);
  }, [ setIsValid ] )

  return <View
    title="Basic"
    Main={(
      <input
        type="password"
        value={password}
        onChange={ e => { 
          handleChange(e.target.value)
        }}>
      </input>
    )}
    isValid={isValid}
  />
};

const UseRule = () => {
  const [ isValid, setIsValid ] = usePasswordValidator({ digits: 2, min: 3, max: 10});
  const [ password, setPassword ] = useState("")

  const handleChange = useCallback( (input: string) => {
    setPassword(input);
    setIsValid(input);
  }, [ setIsValid ] )

  return <View
    title="Rule"
    Main={(
      <input
        type="password"
        value={password}
        onChange={ e => { 
          handleChange(e.target.value)
        }}>
      </input>
    )}
    isValid={isValid}
  />
};


interface IViewProps {
  title: string;
  Main: JSX.Element;
  isValid: boolean;
}

const View: React.FC<IViewProps> = props => {
  const { title, Main, isValid } = props;
  return <div>
    <h5>{title}</h5>
    {Main}
    <p>IsValid: {String(isValid)}</p>
  </div>
};
