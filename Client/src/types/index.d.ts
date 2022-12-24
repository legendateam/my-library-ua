import { HTMLAttributes, HTMLProps } from 'react';
import { FieldErrorsImpl } from 'react-hook-form';

interface Props extends FieldErrorsImpl{
    nickName?: {
        message?: string,
        type?: string,
        ref?: HTMLElement,
    };
    password?: {
        message?: string,
        type?: string,
        ref?: HTMLElement,
    };
    confirmPassword:? {
        message?: string,
        type?: string,
        ref?: HTMLElement,
    };
    email?: {
        message?: string,
        type?: string,
        ref?: HTMLElement,
    };
    avatar?: {
        message?: string,
        type?: string,
        ref?: HTMLElement,
    };
}

export type ErrorAuthForm = Props & HTMLProps<HTMLButtonElement> & HTMLAttributes<HTMLButtonElement>;
