using Microsoft.AspNetCore.Mvc;

namespace ProjetoEscola_API.Controllers
{
    [ApiController] //configura minha classe para receber requisições externas 
    [Route("/")] //indica qual o endereço que tenho que colocar na web para acessar essa classe
    public class HomeController: ControllerBase
    {
        [HttpGet] //requisição get joga para o metodo inicio que retorna um texto
        public ActionResult Inicio() //retorna uma pagina web
        {
            return new ContentResult //conteúdo
            {
                ContentType ="text/html",
                Content = "<h1>API Projeto Escola: Funcionou!!!<h1>"
            };
        }

    }
}