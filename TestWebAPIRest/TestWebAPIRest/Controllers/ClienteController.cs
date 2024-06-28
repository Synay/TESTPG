using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using TestWebAPIRest.Data;
using TestWebAPIRest.Models;

namespace TestWebAPIRest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly ClienteData _clienteData;
        public ClienteController(ClienteData clienteData)
        {
            _clienteData = clienteData;
        }

        [HttpGet]
        public async Task<IActionResult> Lista()
        {
            List<Cliente> Lista = await _clienteData.Lista();
            return StatusCode(StatusCodes.Status200OK, Lista);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Obtener(int id)
        {
            Cliente objeto = await _clienteData.Obtener(id);
            return StatusCode(StatusCodes.Status200OK, objeto);
        }

        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] Cliente objeto)
        {
            bool respuesta = await _clienteData.Crear(objeto);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }

        [HttpPut]
        public async Task<IActionResult> Editar([FromBody] Cliente objeto)
        {
            bool respuesta = await _clienteData.Editar(objeto);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            bool respuesta = await _clienteData.Eliminar(id);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });
        }
    }
}