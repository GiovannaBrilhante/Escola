import React, { Component } from 'react';
import axios from 'axios';
import './CrudCarometro.css';
import Main from '../templates/Main';
const title = "Carometro";
const urlAPIaluno = "http://localhost:5258/api/aluno";//"http://localhost:7250/api/aluno";
const urlAPIcurso = "http://localhost:5258/api/curso";
const initialState = {
    listaAluno: [],
    listaCurso: [],
    listaCarometro:[],
}
export default class CrudCarometro extends Component {
    state = { ...initialState }
    componentDidMount() {
        axios(urlAPIcurso).then(resp => {
            this.setState({ listaCurso: resp.data })
        })

        axios(urlAPIaluno).then(resp => {
            this.setState({ listaAluno: resp.data })
        })
    }

    atualizaListaAlunos(event){
       const lista= this.state.listaAluno.filter(aluno => aluno.codCurso == event.target.value)
        
        console.log(this.state.listaCarometro)
        console.log(event.target.value)
        this.setState({ listaCarometro: lista})
    }

    renderForm() {
        return (
            <div className="select-container">
                <label> Curso: </label>
                <select name="nomeCurso" onChange={e => this.atualizaListaAlunos(e)} required >
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
            </div>
        )
    }

    letrasAleatorias() {
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
                                    <div>{aluno.ra}</div>
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
                {this.renderForm()}
                {this.renderCards()}
            </Main>
        )
    }
}

/*
import React, { Component } from 'react';
import axios from 'axios';
import './CrudCarometro.css';
import Main from '../templates/Main';
const title = "Carometro";
const urlAPI = "http://localhost:5258/api/carometro";
const urlAPIaluno = "http://localhost:5258/api/aluno";//"http://localhost:7250/api/aluno";
const urlAPIcurso = "http://localhost:5258/api/curso";
const initialState = {
    curso: { id: 0, codCurso: '', nomeCurso: '', periodo: '' },
    listaAluno: [],
    listaCurso: [],
}
export default function CrudCarometro(props) {
    const [curso, setCurso] = useState(initialState.curso);
    const [listaAluno, setListaAluno] = useState(initialState.listaAluno);
    const [listaCurso, setListaCurso] = useState(initialState.listaCurso);

    useEffect(() => {
        axios(urlAPI).then(resp => {
            setLista(resp.data )
        })
    }, [listaAluno]);

    const atualizaLista = (event) => {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const listaAlunos = { ...listaAluno };
        //usar o atributo NAME do input identificar o campo a ser atualizado
        listaAlunos[event.target.name] = event.target.value;
        //atualizar o state
        setListaAluno(listaAlunos);
    }

    const getListaAtualizada = (cursos, add = true) => {
        const listas = lista.filter(a => a.id !== cursos.id);
        if (add) listas.unshift(cursos);
        return listas;
    }

    const renderSelect = () => {
        return (
            <div className="select-container">
                <label> Curso: </label>
                <select name="nomeCurso" onChange={e => this.atualizaLista(e)} required >
                    <option selected disabled={true} value="">
                        -- Escolha uma opção --
                    </option>
                {this.state.listaCurso.map(
                            (curso) =>
                            <option name="nomeCurso" value={curso.nomeCurso}>
                                {curso.codCurso} - {curso.periodo}
                            </option>
                        )}
                </select>
                
                <button className="btnVisualizar"
                    onClick={e => this.renderCards(e)} >
                    Visualizar
                </button>

                <card></card>
            </div>
        )
    }

    const renderCards = () => {
        return (
            <card>
                <div className="carometro">
                <table className="listaCarometros" id="tblistaCarometro">
                    <tbody>
                        {this.state.listaCarometro.map(
                            (carometro) =>
                                <tr key={aluno.id}>
                                    <td>{aluno.ra}</td>
                                    <td>{aluno.nome}</td>
                                    <td><img className='imagemCarometro' ></img></td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
            </card>
        )
    }

    return (
        <Main title={title}>
            {renderSelect()}
            {renderCards()}
        </Main>
    )
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

    atualizaListaAlunos(event){

    }

    renderForm() {
        return (
            <div className="select-container">
                <label> Curso: </label>
                <select name="nomeCurso" onChange={e => this.atualizaCurso(e)} required >
                    <option selected disabled={true} value="">
                        -- Escolha uma opção --
                    </option>
                {this.state.listaCurso.map(
                            (curso) =>
                            <option name="nomeCurso" value={curso.nomeCurso}>
                                {curso.codCurso} - {curso.periodo}
                            </option>
                        )}
                </select>
                
                <button className="btnVisualizar"
                    onClick={e => this.renderCards(e)} >
                    Visualizar
                </button>

                <card></card>
            </div>
        )
    }

    renderCards() {
        return (
            <card>
                <div className="carometro">
                <table className="listaCarometros" id="tblistaCarometro">
                    <tbody>
                        {this.state.listaCarometro.map(
                            (carometro) =>
                                <tr key={aluno.id}>
                                    <td>{aluno.ra}</td>
                                    <td>{aluno.nome}</td>
                                    <td><img className='imagemCarometro' ></img></td>
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
}*/