using System.ComponentModel.DataAnnotations;
namespace ProjetoEscola_API.Models
{
    public class Curso{
        public int id { get; set; }

        
        [Required(ErrorMessage="O campo código de curso é obrigatório",AllowEmptyStrings=false)]
        [Range(2,99)]
        public int codCurso{get;set;}

        [Required(ErrorMessage="O campo nome do curso é obrigatório",AllowEmptyStrings=false)]
        [StringLength(30)]
        public string? nomeCurso{get;set;}

        [Required(ErrorMessage="O campo periodo é obrigatório",AllowEmptyStrings=false)]
        [StringLength(1), MinLength(1)]
        public string? periodo{get;set;}
    }
}
