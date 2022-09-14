using System.ComponentModel.DataAnnotations;
namespace ProjetoEscola_API.Models
{
    public class Aluno
    {
        public int id { get; set; }
        
        [Required(ErrorMessage="O campo ra é obrigatório",AllowEmptyStrings=false)]
        [StringLength(5), MinLength(5)]
        public string? ra { get; set; }

        [Required(ErrorMessage="O campo nome é obrigatório",AllowEmptyStrings=false)]
        [StringLength(30)]
        public string? nome { get; set; }
              
        [Required(ErrorMessage="O campo código de curso é obrigatório",AllowEmptyStrings=false)]
        [Range(2,99)]
        public int codCurso { get; set; }
    }
}