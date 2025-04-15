using Microsoft.AspNetCore.Mvc;
using NexCommDAL;

namespace NexCommWebServices.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : Controller
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public NexCommRepository Repository { get; set; }

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
            Repository = new NexCommRepository();
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public JsonResult GetLiveUsers()
        {
            var users = Repository.GetAllOnlineUsers();

            return Json(users);
        }
    }
}
