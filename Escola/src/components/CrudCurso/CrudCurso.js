import Main from '../templates/Main';
import Header from '../templates/Header';
import { useEffect, useState } from 'react';
import React, { Component } from 'react';
import axios from 'axios';
import './CrudCurso.css';
const title = "cadastro de cursos";
const urlAPI = "http://localhost:5258/api/curso";//"http://localhost:7250/api/curso";
const initialState = {
    curso: { id: 0, codCurso: 0, nomeCurso: '', periodo: '' },
    lista: []
}

export default function CrudCurso(props) {
    const [curso, setCurso] = useState(initialState.curso);
    const [lista, setLista] = useState(initialState.lista);

    useEffect(() => {
        axios(urlAPI).then(resp => {
            setLista(resp.data )
        })
    }, [curso]);

    const limpar = () => {
        setCurso({ curso: initialState.curso });
    }
    
    const salvar = () => {
        const cursos = curso;
        cursos.codCurso = Number(cursos.codCurso);
        const metodo = cursos.id ? 'put' : 'post'; //se id n é nulo significa que vou inserir, se já tem que vou alterar
        const url = cursos.id ? `${urlAPI}/${cursos.id}` : urlAPI;
        axios[metodo](url, cursos)
            .then(resp => {
                const lista = getListaAtualizada(resp.data)
                setCurso({ curso: initialState.curso, lista })
            })
    }

    const getListaAtualizada = (cursos, add = true) => {
        const listas = lista.filter(a => a.id !== cursos.id);
        if (add) listas.unshift(cursos);
        return listas;
    }

    const atualizaCampo = (event) => {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const curso1 = { ...curso };
        //usar o atributo NAME do input identificar o campo a ser atualizado
        curso1[event.target.name] = event.target.value;
        //atualizar o state
        setCurso(curso1);
    }

    const carregar = (curso) => {
        setCurso(curso )
    }
    
    const remover = (curso) => {
        const url = urlAPI + "/" + curso.id;
        if (window.confirm("Confirma remoção do curso: " + curso.codCurso)) {
            console.log("entrou no confirm");
            axios['delete'](url, curso)
                .then(resp => {
                    const lista = getListaAtualizada(curso, false)
                    setCurso({ curso: initialState.curso, lista })
                })
        }
    }

    const renderForm = ()=> {
        return (

            <div className="inclui-container">
                <label> Código do Curso: </label>
                <input
                    type="number"
                    id="codCurso"
                    placeholder="Cod do curso"
                    className="form-input"
                    name="codCurso"

                    value={curso.codCurso}

                    onChange={e => atualizaCampo(e)}
                />
                <label> Nome do Curso: </label>
                <input
                    type="text"
                    id="nomeCurso"
                    placeholder="Nome do curso"
                    className="form-input"
                    //nome do campo que eu passo na API
                    name="nomeCurso"

                    value={curso.nomeCurso}

                    onChange={e => atualizaCampo(e)}
                />
                <label> Período do Curso: </label>
                <input
                    type="text"
                    id="periodo"
                    placeholder="Período do curso"
                    className="form-input"
                    name="periodo"

                    value={curso.periodo}
                    onChange={e => atualizaCampo(e)}
                />
                <button className="btnSalvar"
                    onClick={e => salvar(e)} >
                    Salvar
                </button>
                <button className="btnCancelar"
                    onClick={e => limpar(e)} >
                    Cancelar
                </button>
            </div>
        );
    }

    const renderTable = () =>  {
        return (
            <div className="listagem">
                <table className="listaCursos" id="tblistaCursos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloCodCurso">codCurso</th>
                            <th className="tabTituloNomeCurso">nomeCurso</th>
                            <th className="tabTituloPeriodo">periodo</th>
                            <th className="tabTituloAlterar">Alterar</th>
                            <th className="tabTituloRemover">Remover</th>
                        </tr>
                    </thead>

                    <tbody>
                        {lista.map(
                            (curso) =>
                                <tr key={curso.id}>
                                    <td>{curso.codCurso}</td>
                                    <td>{curso.nomeCurso}</td>
                                    <td>{curso.periodo}</td>
                                    <td>
                                        <button onClick={() => carregar(curso)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => remover(curso)} >
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

    return (
        <Main title={title}>
            {renderForm()}
            {renderTable()}
        </Main>
    )
}
    

