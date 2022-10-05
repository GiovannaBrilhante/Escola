import React, { Component } from 'react';
import axios from 'axios';
import './CrudCarometro.css';
import Main from '../templates/Main';
const title = "Carometro";
const urlAPI = "http://localhost:5258/api/carometro";
const urlAPIaluno = "http://localhost:5258/api/aluno";//"http://localhost:7250/api/aluno";
const urlAPIcurso = "http://localhost:5258/api/curso";
const initialState = {
    aluno: { id: 0, ra: '', nome: '', codCurso: 0 },
    lista: [],
    listaCurso: [],
    listaCarometro:[],
}
export default class CrudCarometro extends Component {
    state = { ...initialState }
    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        })

        axios(urlAPIcurso).then(resp => {
            this.setState({ listaCurso: resp.data })
        })

        axios(urlAPIaluno).then(resp => {
            this.setState({ listaAluno: resp.data })
        })
    }

    renderForm() {
        return (
            <div className="inclui-container">
                <label> Código do Curso: </label>
                <select name="codCurso" onChange={e => this.atualizaCurso(e)} required >
                    <option selected disabled={true} value="">
                        -- Escolha uma opção --
                    </option>
                {this.state.listaCurso.map(
                            (curso) =>
                            <option name="codCurso" value={curso.codCurso}>
                                {curso.nomeCurso} - {curso.periodo}
                            </option>
                        )}
                </select>
                
                <button className="btnSalvar"
                    onClick={e => this.salvar(e)} >
                    Visualizar
                </button>

                <card></card>
            </div>
        )
    }

    renderTable() {
        return (
            <card>
                <div className="listagem">
                <table className="listaAlunos" id="tblistaAlunos">
                    <tbody>
                        {this.state.lista.map(
                            (aluno) =>
                                <tr key={aluno.id}>
                                    <td>{aluno.ra}</td>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.codCurso}</td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
            </card>
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
}