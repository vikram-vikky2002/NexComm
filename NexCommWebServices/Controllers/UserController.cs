using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NexCommDAL;

namespace NexCommWebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly NexCommRepository _repository;
        public UserController(NexCommRepository repository)
        {
            _repository = repository;
        }

        [HttpPut("room")]
        public JsonResult AddNewUser(Models.User user)
        {
            bool status = false;
            try
            {
                if (ModelState.IsValid)
                {
                    NexCommDAL.Models.User UserObj = new NexCommDAL.Models.User();
                    UserObj.UserId = user.UserId;
                    UserObj.UserName = user.UserName;
                    UserObj.EmailId = user.EmailId;
                    UserObj.Phone = user.Phone;
                    UserObj.Role = user.Role;
                    UserObj.NewUser = user.NewUser;
                    UserObj.Password = user.Password;
                    UserObj.LastLogin = user.LastLogin;
                    UserObj.Live = user.Live;
                    UserObj.IsAdmin = user.IsAdmin;

                    status = _repository.AddUser(UserObj);

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                if (ex.InnerException != null)
                {
                    Console.WriteLine(ex.InnerException.Message);
                }
                status = false;
            }
            return Json(status);
        }
    }
}
