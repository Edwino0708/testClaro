using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using claroTest.ModelsDto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

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
        public IActionResult GetBook()
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {

                return Ok();
            }
        }

        [HttpGet]
        public IActionResult GetBookById(int id)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {

                return Ok();
            }
        }

        [HttpGet]
        public IActionResult AddBook(Book b)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {

                return Ok();
            }
        }


        [HttpGet]
        public IActionResult UpdateBook(Book b)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {

                return Ok();
            }
        }


        [HttpGet]
        public IActionResult DeletBook(int id)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {

                return Ok();
            }
        }

    }
}
