using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NexCommDAL;
using NexCommDAL.Models;

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

        [HttpPost("room")]
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

        [HttpPut]
        public JsonResult UpdateUserDetails(int userId, string userName, string role, string emailId)
        {
            bool status = false;
            try
            {
                status = _repository.UpdateUserDetails(userId, userName,role,emailId);
                
            }
            catch (Exception ex)
            {
                status = false;
                Console.WriteLine(ex.Message);
            }
            return Json(status);
        }
    }
}
