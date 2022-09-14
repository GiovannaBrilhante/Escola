using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoEscola_API.Data;
using ProjetoEscola_API.Models;
using System.ComponentModel.DataAnnotations;

namespace ProjetoEscola_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunoController : ControllerBase
    {
        private EscolaContext _context;

        public AlunoController(EscolaContext context)
        {
            // construtor
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Aluno>> GetAll()
        {
            return _context.Aluno.ToList();
        }
        
        [HttpGet("{AlunoId}")]
        public ActionResult<List<Aluno>> Get(int AlunoId)
        {
            try
            {
                var result = _context.Aluno.Find(AlunoId);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
   
        [HttpPost]
        public async Task<ActionResult> post(Aluno model)
        {
            try
            {
                _context.Aluno.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok(); //status 200
                    return Created($"/api/aluno/{model.ra}",model);
                }
            
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        // retorna BadRequest se não conseguiu incluir
        return BadRequest();
        }
        
        //atributo para verificar o tipo de requisição
        [HttpPut("{AlunoId}")]

        //dois tipos de parametros
        public async Task<IActionResult> put(int AlunoId, Aluno dadosAlunoAlt)
        {
            try 
            {
                //verifica se existe aluno a ser alterado
                var result = await _context.Aluno.FindAsync(AlunoId);
                if (AlunoId != result.id)
                {
                    return BadRequest();
                }
            //estrai as informações do parametro
            result.ra = dadosAlunoAlt.ra;
            result.nome = dadosAlunoAlt.nome;
            result.codCurso = dadosAlunoAlt.codCurso;
            //como ha operação de alteração na tabela tem que salvar
            await _context.SaveChangesAsync();
            //retorno os dados que foram salvos no banco, poderia ser qualquer return que avisa sobre sucesso
            return Created($"/api/aluno/{dadosAlunoAlt.ra}", dadosAlunoAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }
        
        //com parametro para ele localizar o registro a ser excluido
        [HttpDelete("{AlunoId}")]

        //metodo asincrono
        public async Task<ActionResult> delete(int AlunoId)
        {
            try
            {
                //verifica se existe aluno a ser excluído
                var aluno = await _context.Aluno.FindAsync(AlunoId);
                if (aluno == null)
                {
                    //método do EF
                    return NotFound(); //status 404
                }
                //remover o aluno encontrado
            _context.Remove(aluno);
            //salvar as mudanças
            await _context.SaveChangesAsync();
            return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }
    }
}