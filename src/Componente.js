// Importa o React (obrigatório para JSX funcionar)
import React, { useState } from "react";
import './index.css';

// Criando um componente funcional 
function BemVindo() {
    return (
        <div className="bem-vindo"> 
            <h1>Olá, bem-vindo ao React!</h1>
        </div>
    );
}

function Contador() {
    // Definindo o estado do contador
    const [contador, setContador] = useState(0);

    // Funções para aumentar e diminuir
    const aumentar = () => setContador(contador + 1);
    const diminuir = () => setContador(contador - 1);

    return (
        <div className="contador">
            <h2>Contador: {contador}</h2>
            <button onClick={aumentar}>Aumentar</button>
            <button onClick={diminuir}>Diminuir</button>
        </div>
    );
}

function CorDeFundo() {
    // Estado para armazenar a cor de fundo
    const [cor, setCor] = useState('white');

    // Funções para mudar a cor de fundo
    const mudarCor = (corNova) => setCor(corNova);

    return (
        <div className="cor-fundo" style={{ backgroundColor: cor, padding: '20px'}}>
            <h2>Escolha uma cor de fundo:</h2>
            <button onClick={() => mudarCor('lightblue')}>Azul claro</button>
            <button onClick={() => mudarCor('lightgreen')}>Verde claro</button>
            <button onClick={() => mudarCor('pink')}>Rosa</button>
            <button onClick={() => mudarCor('white')}>Resetar</button>
        </div>
    );
}

function FormularioContato() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Nome: ${nome}, Email: ${email}`);
    };

    return (
        <div className="formulario">
            <h2>Formulário de Contato</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form> 
        </div>
    );
}

function Componente() {
    return (
        <div>
            <BemVindo />
            <Contador />
            <CorDeFundo />
            <FormularioContato />
        </div>
    );
}

// Exportando o componente para poder usar em outros arquivos
export default Componente;