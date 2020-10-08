using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using claroTest.ModelsDto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace claroTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        public BookController(HttpClient httpClient, IConfiguration configuration)
        {
            _configuration = configuration;
             httpClient.BaseAddress = new Uri(_configuration.GetSection("ApiUrl").Value);
            _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<IActionResult> GetBookById(int id)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await _httpClient.GetAsync(_httpClient.BaseAddress+$"/{id}");
                response.EnsureSuccessStatusCode();
                var resp = await response.Content.ReadAsStringAsync();

                Book book = JsonConvert.DeserializeObject<Book>(resp);

                return Ok(book);
            }
            catch (Exception ex)
            {
            //    _logger.LogError("Error retorna un libro por Id");
                return Ok(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetBook()
        {
            try
            {   _httpClient.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await _httpClient.GetAsync("");
                response.EnsureSuccessStatusCode();
                var resp = await response.Content.ReadAsStringAsync();

                List<Book> books = JsonConvert.DeserializeObject<List<Book>>(resp);
       
                return Ok(books);
            }
            catch (Exception ex)
            {
                return Ok(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddBook(Book b)
        {
            try
            {
                string content = JsonConvert.SerializeObject(b);
                var buffer = Encoding.UTF8.GetBytes(content);
                var byteContent = new ByteArrayContent(buffer);
                byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                var response = await _httpClient.PostAsync("", byteContent).ConfigureAwait(false);

                if (response.StatusCode.Equals(StatusCodes.Status200OK)) return Ok(StatusCodes.Status500InternalServerError);

                return Ok();
            }
            catch (Exception ex)
            {
                return Ok(StatusCodes.Status500InternalServerError);
            }
        }


        [HttpPut]
        public async Task<IActionResult> UpdateBook(Book b)
        {
            try
            {
                string content = JsonConvert.SerializeObject(b);
                var buffer = Encoding.UTF8.GetBytes(content);
                var byteContent = new ByteArrayContent(buffer);
                byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                var response = await _httpClient.PutAsync("", byteContent).ConfigureAwait(false);

                if (response.StatusCode.Equals(StatusCodes.Status200OK)) return Ok(StatusCodes.Status500InternalServerError);

                return Ok();
            }
            catch (Exception ex)
            {
                return Ok(StatusCodes.Status500InternalServerError);
            }
        }


        [HttpDelete]
        public async Task<IActionResult> DeletBook(int id)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await _httpClient.DeleteAsync(_httpClient.BaseAddress + $"/{id}");
                response.EnsureSuccessStatusCode();
                var resp = await response.Content.ReadAsStringAsync();

                Book book = JsonConvert.DeserializeObject<Book>(resp);

                if (book != null) return Ok(StatusCodes.Status500InternalServerError);

                return Ok();
            }
            catch (Exception ex)
            {
                return Ok(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
