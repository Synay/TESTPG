namespace TestWebAPIRest.Models
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Telefono { get; set; }
        public string Pais { get; set; }
        public string? FechaCreacion { get; set; }
    }
}
