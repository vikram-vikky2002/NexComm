using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NexCommDAL;
using NexCommDAL.Models;

namespace NexCommWebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NexCommController : Controller
    {
        private readonly NexCommRepository _repository;
        public NexCommController(NexCommRepository repository)
        {
            _repository = repository;
        }
        
    }
}
