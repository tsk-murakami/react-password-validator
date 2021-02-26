
import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import * as React from 'react'
import {render, fireEvent } from '@testing-library/react'
import { withValidState, IWithProps } from "./with-valid-state";

const TestComponent: React.FC<{debug: string} & IWithProps > = props => {
    const [ password, setPassword ] = React.useState("")
    const { isValid, setIsValid, debug } = props;
    return <div>
        <h5>{debug}</h5>
        <input
        type="text"
        value={password}
        onChange={ e => { 
            setPassword(e.target.value)
            setIsValid(e.target.value)
        }}>
        </input>
        <p>IsValid: {String(isValid)}</p>
    </div>
};

test('shows the children when the checkbox is checked', () => {
    const testMessage = 'TEST!!!';

    const Component = withValidState(TestComponent)
    const { getAllByRole, getByText, queryByText } = render(<Component debug={testMessage} />)

    const propsMessageElement = getByText (testMessage)
    expect(propsMessageElement?.innerHTML).toEqual(testMessage)
    
    const inputElement = getAllByRole('textbox')
    
    fireEvent.input(inputElement[0], {
        target: { value: 'bad' },
    })

    const resultElement = queryByText(/IsValid/);
    expect( resultElement?.innerHTML ).toEqual( expect.stringContaining('false') )
    fireEvent.input(inputElement[0], {
        target: { value: 'goodpassword' },
    })
    expect( resultElement?.innerHTML ).toEqual( expect.stringContaining('true') )
})