import React ,{ TextareaHTMLAttributes } from 'react';

import './styles.css'

// extends TextareaHTMLAttributes<HTMLTextAreaElement> permite que o Textarea possa receber todas as propriedades de um Textarea HTML padrão
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label: string;
}

// ...rest é o elemento que receberá todos os atributos possíveis para um Textarea HTML
const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) => {
    return (
        <div className="textarea-block">
            <label htmlFor={ name }>{ label }</label>
            <textarea id={ name } { ...rest } />
        </div>
    );
}

export default Textarea