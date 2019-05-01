using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : Controller
    {
        [HttpPut]
        public async Task<IActionResult> Post([FromForm(Name = "file")] IFormFile file)
        {
            byte[] fileBytes;
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                fileBytes = memoryStream.ToArray();
            }

            var filename = file.FileName;
            var contentType = file.ContentType;

            string g = Guid.NewGuid().ToString();
            string fullname = g + "-" + filename;
            this.SaveFile(fileBytes, fullname);

            return Ok(fullname);
        }

        private void SaveFile(byte[] fileBytes, string filename)
        {
            System.IO.File.WriteAllBytes(@"ClientApp\public\uploads\"+ filename, fileBytes);
        }
    }
}
