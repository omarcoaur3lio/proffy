import React from 'react';
import { Link } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg'
import logoImg from '../../assets/images/logo.svg'

import './styles.css'

// Objeto com a definição das propriedades do componente e seus tipos
interface PageHeaderProps {
  //title?: string; // O " ? " indicaria que a propriedade NÃO é obrigatória
  title: string;
  description?: string;
}

// React.FC indica que o componente é do tipo Functional Component
const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
    
        <Link to="/">
          <img src={ backIcon } alt="Voltar"/>
        </Link>
    
        <img src={ logoImg } alt="Proffy"/>
      </div>
    
      <div className="header-content">
        <strong>{ props.title }</strong>
        {  props.description && <p>{props.description}</p>} {/* Funciona como uma if ternário que não possui o 'else */}
        { props.children } {/* recebe todo o conteúdo passado */}
      </div>
    
    </header>
  );
}
  
export default PageHeader;