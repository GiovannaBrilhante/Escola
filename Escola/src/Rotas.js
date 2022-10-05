import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./components/templates/Main";
import CrudAluno from "./components/CrudAluno/CrudAluno";
import CrudCurso from "./components/CrudCurso/CrudCurso";
import CrudCarometro from "./components/CrudCarometro/CrudCarometro";

export default function Rotas(){
    return(
        <Routes>
            <Route exact path="/"
                element={
                    <Main title="Bem vindo!">
                        <div>Cadastro de alunos, cursos e carômetros</div>
                    </Main>
                }
            />
            <Route path="/alunos" element={<CrudAluno />} />

            <Route path="/cursos" element={<CrudCurso/> } />

            <Route path="/carometro" element={<CrudCarometro/>} />
        </Routes>
    )
}