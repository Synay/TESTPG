using TestWebAPIRest.Models;
using System.Data;
using System.Data.SqlClient;

namespace TestWebAPIRest.Data
{
    public class ClienteData
    {

        private readonly string conexion;

        public ClienteData(IConfiguration configuration)
        {
            conexion = configuration.GetConnectionString("CadenaSQL")!;
        }

        public async Task<List<Cliente>> Lista()
        {
            List<Cliente> lista = new List<Cliente>();

            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_listaClientes", con);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        lista.Add(new Cliente
                        {
                            Id = Convert.ToInt32(reader["Id"]),
                            Nombre = reader["Nombre"].ToString(),
                            Telefono = reader["Telefono"].ToString(),
                            Pais = reader["Pais"].ToString(),
                            FechaCreacion = reader["FechaCreacion"].ToString()
                        });
                    }
                }
            }
            return lista;
        }

        public async Task<Cliente> Obtener(int Id)
        {
            Cliente objeto = new Cliente();

            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_obtenerCliente", con);
                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        objeto = new Cliente
                        {
                            Id = Convert.ToInt32(reader["Id"]),
                            Nombre = reader["Nombre"].ToString(),
                            Telefono = reader["Telefono"].ToString(),
                            Pais = reader["Pais"].ToString(),
                            FechaCreacion = reader["FechaCreacion"].ToString()                   };
                    }
                }
            }
            return objeto;
        }

        public async Task<bool> Crear(Cliente objeto)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("sp_crearCliente", con);
                cmd.Parameters.AddWithValue("@Nombre", objeto.Nombre);
                cmd.Parameters.AddWithValue("@Telefono", objeto.Telefono);
                cmd.Parameters.AddWithValue("@Pais", objeto.Pais);
                cmd.Parameters.AddWithValue("@FechaCreacion", objeto.FechaCreacion);
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    await con.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch
                {
                    respuesta = false;
                }
            }
            return respuesta;
        }

        public async Task<bool> Editar(Cliente objeto)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("sp_editarCliente", con);
                cmd.Parameters.AddWithValue("@Id", objeto.Id);
                cmd.Parameters.AddWithValue("@Nombre", objeto.Nombre);
                cmd.Parameters.AddWithValue("@Telefono", objeto.Telefono);
                cmd.Parameters.AddWithValue("@Pais", objeto.Pais);
                cmd.Parameters.AddWithValue("@FechaCreacion", objeto.FechaCreacion);
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    await con.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch
                {
                    respuesta = false;
                }
            }
            return respuesta;
        }

        public async Task<bool> Eliminar(int id)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("sp_eliminarCliente", con);
                cmd.Parameters.AddWithValue("@Id", id);
                cmd.CommandType = CommandType.StoredProcedure;
                try
                {
                    await con.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch
                {
                    respuesta = false;
                }
            }
            return respuesta;
        }
    }
}