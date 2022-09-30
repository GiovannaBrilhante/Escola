import React, { Component } from 'react';
import axios from 'axios';
import './CrudAluno.css';
import Main from '../templates/Main';
import '../CrudCurso/CrudCurso.js';
const title = "Cadastro de Alunos";
const urlAPI = "http://localhost:5258/api/aluno";//"http://localhost:7250/api/aluno";
const urlAPIcurso = "http://localhost:5258/api/curso";
const initialState = {
    aluno: { id: 0, ra: '', nome: '', codCurso: 0 },
    lista: [],
    listaCurso: []
}
export default class CrudAluno extends Component {
    state = { ...initialState }
    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        })

        axios(urlAPIcurso).then(resp => {
            this.setState({ listaCurso: resp.data })
        })
    }
    limpar() {
        this.setState({ aluno: initialState.aluno });
    }
    salvar() {
        const aluno = this.state.aluno;
        aluno.codCurso = Number(this.state.curso.codCurso);
        const metodo = aluno.id ? 'put' : 'post'; //se id n é nulo significa que vou inserir, se já tem que vou alterar
        const url = aluno.id ? `${urlAPI}/${aluno.id}` : urlAPI;
        axios[metodo](url, aluno)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ aluno: initialState.aluno, lista })
            })
    }

    getListaAtualizada(aluno, add = true) {
        const lista = this.state.lista.filter(a => a.id !== aluno.id);
        if (add) lista.unshift(aluno);
        return lista;
    }

    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const aluno = { ...this.state.aluno };
        //usar o atributo NAME do input identificar o campo a ser atualizado
        aluno[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({ aluno });
    }

    atualizaCurso(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const curso = { ...this.state.curso };
        //usar o atributo NAME do input identificar o campo a ser atualizado
        curso[event.target.name] = Number(event.target.value);
        //atualizar o state
        this.setState({ curso });
    }


    carregar(aluno) {
        this.setState({ aluno })
    }
    
    remover(aluno) {
        const url = urlAPI + "/" + aluno.id;
        if (window.confirm("Confirma remoção do aluno: " + aluno.ra)) {
            console.log("entrou no confirm");
            axios['delete'](url, aluno)
                .then(resp => {
                    const lista = this.getListaAtualizada(aluno, false)
                    this.setState({ aluno: initialState.aluno, lista })
                })
        }
    }

    renderForm() {
        return (
            <div className="inclui-container">
                <label> RA: </label>
                <input
                    type="text"
                    id="ra"
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
}