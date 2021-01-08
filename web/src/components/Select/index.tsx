import React ,{ SelectHTMLAttributes } from 'react';

import './styles.css'

// extends SelectHTMLAttributes<HTMLSelectElement> permite que o Select possa receber todas as propriedades de um Select HTML padrão
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    // Como o atributo criado recebe um Array, e dentro desse array temos um Objeto, precisamos passar o tipo de cada elemento do objeto
    options: Array<{
        value: string;
        label: string;
    }>;
}

// ...rest é o elemento que receberá todos os atributos possíveis para um Select HTML
const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
    return (
        <div className="select-block">
            <label htmlFor={ name }>{ label }</label>
            <select value="" id={ name } { ...rest } >
                <option value="" disabled hidden>Selecione uma opção</option>
                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>
    );
}

export default Select