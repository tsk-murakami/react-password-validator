# react-password-validator

> A React Hook that provides password validator functionality.

## Install

```bash
npm install --save react-use-password-validator
```

## Dependencies Packages
 - password-validator ^5.1.1

## Requirements
 - React 16.8+

## Usage

```tsx
import React, { useState } from 'react'
import usePasswordValidator from 'react-use-password-validator'

const PasswordForm: React.FC<{}> = props => {
  const [ password, setPassword ] = useState("")
  const [ isValid, setIsValid ] = usePasswordValidator()
  return <input 
    type='password'
    onChange={ e => {
      setPassword(e.target.value)
      setIsValid(e.target.value)
    }}
    value={password}
  >
  </input>
}
```

## API
```ts
type UsePasswordValidator = [ boolean, ( password: string ) => void ]
```

## Paramters
Basically, it refers to the parameters of `password-validator`.
Please check [ password-validator ](https://www.npmjs.com/package/password-validator)
```ts
type ValidatorOptionType = number | boolean;

interface IValidatorOption {
    min: number;
    max: number;
    digits: ValidatorOptionType;
    letters: ValidatorOptionType;
    lowercase: ValidatorOptionType;
    uppercase: ValidatorOptionType;
    symbols: ValidatorOptionType;
    spaces: ValidatorOptionType;
};
export function usePasswordValidator( option?: Partial<IValidatorOption> ) { /*  ... */ }

```
### ValidatorOptionType
  - if set `undefined`: Not checking anything.
  - if set `true`: Make sure it is included.  
  - if set `false`: Make sure it is not included.
  - if set `number`: Needs to contain more than the specified number.

### default paramter
```ts
const DEFAULT_OPTION = {
  min: 6,
  max: 100,
  spaces: false,
  letters: true
}
```

## Example
```ts
/*
* This rule is
* - At least six characters and no more than 100 characters
* - At least two numbers
* - At least two uppercase letters
* - include lowercase letters
* - Do not include spaces
*
*/
const [ isValid, setIsValid ] = usePasswordValidator({
  digits: 2,
  lowercase: true,
  uppercase: 2,
  spaces: false
})
```

## HOC
As a future challenge, I also created a HOC.

### Usage( HOC )
```tsx
import { withValidState, WithProps } from 'react-use-password-validator';

interface IProps {
    title: string;
};

const Component: React.FC<IProps&WithProps> = props => {
    const [ password, setPassword ] = useState("")
    const { title, isValid, setIsValid } = props;

    return <input
      type="password"
      value={password}
      onChange={ e => { 
        setPassword(e.target.value)
        setIsValid(e.target.value)
      }}>
    </input>
};

export default withValidState(Component, { spaces: 1, uppercase: 1, lowercase: 1, digits: 1, symbols: 1, min: 5, max: 10 })

```

## License

MIT © [tsk-murakami](https://github.com/tsk-murakami)
