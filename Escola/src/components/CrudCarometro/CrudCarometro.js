import React, { Component } from 'react';
import axios from 'axios';
import './CrudCarometro.css';
import Main from '../templates/Main';

const title = "Carômetro";
const urlAPIaluno = "http://localhost:5258/api/aluno"; //"http://localhost:7250/api/aluno";
const urlAPIcurso = "http://localhost:5258/api/curso"; //"http://localhost:7250/api/curso";
const initialState = {
    listaAluno: [],
    listaCurso: [],
    listaCarometro:[],
}

//usando classe para relembrar
export default class CrudCarometro extends Component {

    state = { ...initialState }
    
    componentDidMount() {
        //busca de dados da API sobre os cursos para passar no select
        axios(urlAPIcurso).then(resp => {
            this.setState({ listaCurso: resp.data })
        })

        //busca de dados da API sobre os alunos para passar qual deve aparecer no select
        axios(urlAPIaluno).then(resp => {
            this.setState({ listaAluno: resp.data })
        })
    }

    atualizaCarometroAlunos(event){
        // guardar só os alunos correspondentes ao selecionado 
        // evento.quemdisparouoevento.valor
       const carometro= this.state.listaAluno.filter(aluno => aluno.codCurso == event.target.value)
        //console.log(this.state.listaCarometro)
        //console.log(event.target.value)
        this.setState({ listaCarometro: carometro})
    }

    renderSelect() {
        return (
            <div className="select-container">
                <label> Curso: </label>
                <select name="nomeCurso" onChange={e => this.atualizaCarometroAlunos(e)} required >
                    <option selected disabled={true} value="">
                        -- Escolha uma opção --
                    </option>
                {this.state.listaCurso.map(
                            (curso) =>
                            // quando o nomeCurso e peiodo é selecionado ele passa o cod do curso de valor
                            <option name="codCurso" value={curso.codCurso}>
                                {curso.nomeCurso} - {curso.periodo}
                            </option>
                        )}
                </select>
            </div>
        )
    }

    letrasAleatorias() {
        //sortear a imagem da api atraves de uma letra aleatoria que vai corresponder a imagem
        return Math.random().toString(36).substring(2, 9);
    }

    renderCards() {
        return (
            <card>
                <div className="carometro">      
                        {this.state.listaCarometro.map(
                            (aluno) =>
                                <div className="card" key={aluno.id}>
                                    <img  className="imagem" src={`https://avatars.dicebear.com/api/adventurer/${this.letrasAleatorias()}.svg`} alt={`Carometro de `+ aluno.nome}/>
                                    <div>ra: {aluno.ra}</div>
                                    <div>{aluno.nome}</div>
                                    <div>Curso: {aluno.codCurso}</div>
                                </div>
                        )}
            </div>
            </card>
        )
    }

    render() {
        return (
            <Main title={title}>
                {this.renderSelect()}
                {this.renderCards()}
            </Main>
        )
    }
}