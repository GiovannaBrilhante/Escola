import React, { Component } from "react";
import axios from 'axios';
import './CrudAluno.css';
import Main from "../templates/Main";

const title = "Cadastro de Alunos";

const urlAPI = "http://localhost:5258/api/aluno";
const initialState = {
    aluno: {id:0, ra: '', nome:'', codCurso:0},
    lista: []
} 
/*const Alunos= [
    { 'id': 1, 'ra': 11111, 'nome': 'André', 'codCurso': 21 },
    { 'id': 2, 'ra': 22222, 'nome': 'Giovanna', 'codCurso': 41 },
    { 'id': 3, 'ra': 33333, 'nome': 'Pedro', 'codCurso': 51 },
    { 'id': 4, 'ra': 44444, 'nome': 'Maria', 'codCurso': 33 },
]*/

export default class CrudAluno extends Component{

    state = { ...initialState }

    componentDidMount(){
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        })
    }

    limpar(){
        this.setState({ lista: resp.data})
    }

    salvar(){
        const aluno = this.state.aluno;
        aluno.codCurso = Number(aluno.codCurso);
        const metodo = 'post';

        axios[metodo](urlAPI, aluno)
                .then(resp => {
                    const lista = this.getListaAtualizada(resp.data)
                    this.setState({ aluno: initialState.aluno, lista})
                })
    }

    getListaAtualizada(aluno){
        const lista = this.state.lista.filter(a =. a.id !== aluno.id);
        lista.unshift(aluno);
        return lista;
    }

    atualizaCampo(event){
        const aluno = { ... this.state.aluno};
    }
    renderTable(){
        return(
            <div className="listagem">
                <table className="listaAlunos" id="tblistaAlunos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloRa">ID</th>
                            <th className="tabTituloRa">Ra</th>
                            <th className="tabTituloNome">Nome</th>
                            <th className="tabTituloCurso">Curso</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.lista.map(
                            (aluno) =>
                            <tr>
                                <td>{aluno.id}</td>
                                <td>{aluno.ra}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.codCurso}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
    render(){
        return(
            <Main title={title}>
                {this.renderTable()}
            </Main>
        )
    }
}