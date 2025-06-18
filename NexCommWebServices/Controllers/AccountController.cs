using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NexCommDAL;

namespace NexCommWebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly NexCommRepository _repository;
        public AccountController(NexCommRepository repository)
        {
            _repository = repository;
        }

    }
}
