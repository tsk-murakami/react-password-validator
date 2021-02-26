
import React, { FC } from "react";
import { usePasswordValidator, IValidatorOption } from "./use-password-validator";

export interface IWithProps {
    isValid: boolean;
    setIsValid: (input: string) => void;
};


export function withValidState<PropsT>( WrappedComponent: FC<PropsT & IWithProps>, option?: Partial<IValidatorOption> ){
    return function(props: PropsT ) {
        const [ isValid, setIsValid ] = usePasswordValidator(option);
        const newProps: PropsT & IWithProps = {
            ...props, 
            isValid: isValid,
            setIsValid: setIsValid
        };
        return <WrappedComponent {...newProps} />
    };
}
    
