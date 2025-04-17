using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NexCommDAL;
using NexCommDAL.Models;

namespace NexCommWebServices.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GroupChatController : ControllerBase
    {
        private readonly NexCommRepository _repository;
        public GroupChatController(NexCommRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public IActionResult SendMessageAsync(Models.Message message)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    message.CreatedAt = DateTime.Now;
                    var msg = new NexCommDAL.Models.Message(); 
                    msg.UserId = int.Parse(message.UserId); 
                    msg.Text = message.text;  
                    msg.CreatedAt = message.CreatedAt;
                    
                    var result = _repository.SendMessageAsync(msg);
                    if (result != null)
                    {
                        return Ok(result);
                    }
                    else
                    {
                        return BadRequest("Failed to send message.");
                    }
                }
                else
                {
                    return BadRequest("Invalid model state.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetMessagesByUserAsync()
        {
            try
            {
                var messages = _repository.GetMessagesByUserAsync;
                if (messages != null)
                {
                    return Ok(messages);
                }
                else
                {
                    return NotFound("No messages found.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public IActionResult GetMessagesForRoomAsync(int roomId)
        {
            try
            {
                var messages = _repository.GetMessagesForRoomAsync(roomId);
                if (messages != null)
                {
                    return Ok(messages);
                }
                else
                {
                    return NotFound("No messages found for this room.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
