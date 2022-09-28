import Main from '../templates/Main';
import Header from '../templates/Header';
import {useState} from 'react'; 
import React, { Component } from 'react';
import axios from 'axios';
import './CrudCurso.css';
const title= "cadastro de cursos";
const urlAPI = "http://localhost:5258/api/curso";//"http://localhost:7250/api/curso";
const initialState = {
    curso: { id: 0, codCurso: 0, nomeCurso: '', periodo: '' },
    lista: []
}

export default function CrudCurso(props){
    const [nome, setNome] = useState('Testando');
    
    return (
        
<div className="inclui-container">
<label> Código Curso : </label>
<input
    type="text"
    id="codCurso"
    placeholder="RA do aluno"
    className="form-input"
    name="ra"

    value={this.state.aluno.ra}

    onChange={e => this.atualizaCampo(e)}
/>
<label> Nome: </label>
<input
    type="text"
    id="nome"
    placeholder="Nome do aluno"
    className="form-input"
    name="nome"

    value={this.state.aluno.nome}

    onChange={e => this.atualizaCampo(e)}
/>
<label> Código do Curso: </label>
<input
    type="number"
    id="codCurso"
    placeholder="0"

    className="form-input"
    name="codCurso"

    value={this.state.aluno.codCurso}
    onChange={e => this.atualizaCampo(e)}
/>
<button className="btnSalvar"
    onClick={e => this.salvar(e)} >
    Salvar
</button>
<button className="btnCancelar"
    onClick={e => this.limpar(e)} >
    Cancelar
</button>
</div>
)
}

renderTable() {
return (
<div className="listagem">
<table className="listaAlunos" id="tblistaAlunos">
    <thead>
        <tr className="cabecTabela">
            <th className="tabTituloRa">Ra</th>
            <th className="tabTituloNome">Nome</th>
            <th className="tabTituloCurso">Curso</th>
            <th className="tabTituloAlterar">Alterar</th>
            <th className="tabTituloRemover">Remover</th>
        </tr>
    </thead>

    <tbody>
        {this.state.lista.map(
            (aluno) =>
                <tr key={aluno.id}>
                    <td>{aluno.ra}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.codCurso}</td>
                    <td>
                        <button onClick={() => this.carregar(aluno)} >
                            Altera
                        </button>
                    </td>
                    <td>
                        <button onClick={() => this.remover(aluno)} >
                            Remove
                        </button>
                    </td>
                </tr>
        )}
    </tbody>
</table>
</div>
)
}
render() {
return (
<Main title={title}>
{this.renderForm()}
{this.renderTable()}
</Main>
)
}
        /*
        <Main title={title}>
            {this.renderForm()}
            {this.renderTable()}
        </Main>*/
    )
}