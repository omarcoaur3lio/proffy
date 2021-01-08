import React ,{ InputHTMLAttributes } from 'react';

import './styles.css'

// extends InputHTMLAttributes<HTMLInputElement> permite que o input possa receber todas as propriedades de um input HTML padrão
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}

// ...rest é o elemento que receberá todos os atributos possíveis para um input HTML
const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
    return (
        <div className="input-block">
            <label htmlFor={ name }>{ label }</label>
            <input type="text" id={ name } { ...rest } />
        </div>
    );
}

export default Input