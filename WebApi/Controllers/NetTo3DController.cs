using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Network3dGraph;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NetTo3DController : ControllerBase
    {
        // GET: api/NetTo3D
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // POST: api/NetTo3D/exponent
        public string Post([FromBody] dynamic value)
        {
            string nodes = (string)value["test"];
            double exp = (double)value["exp"];
            Network3dForm N23D = new Network3dForm();
            return N23D.LoadNetwork(nodes, exp);

        }

        
        
    }
}
