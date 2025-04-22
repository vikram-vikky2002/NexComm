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
        public async Task<IActionResult> SendMessageAsync([FromBody] Models.Message message)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    message.CreatedAt = DateTime.Now;

                    var msg = new NexCommDAL.Models.Message
                    {
                        UserId = message.UserId,
                        Text = message.Text,
                        CreatedAt = message.CreatedAt
                    };

                    var result = await _repository.SendMessageAsync(msg); // ✅ Await async call

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
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Optional: more detailed error
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetMessagesByUserAsync(int userId)
        {
            try
            {
                var messages = await _repository.GetMessagesByUserAsync(userId); // ✅ Await the actual method
                if (messages != null && messages.Any())
                {
                    return Ok(messages);
                }
                else
                {
                    return NotFound("No messages found for this user.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
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
        [HttpPost]
        public async Task<IActionResult> UploadFileAsync([FromBody] Models.File file)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    file.CreatedAt = DateTime.Now;

                    var fileEntity = new NexCommDAL.Models.File
                    {
                        UserId = file.UserId,
                        FileType = file.FileType,
                        CreatedAt = file.CreatedAt
                    };

                    var result = await _repository.UploadFileAsync(fileEntity);

                    return Ok(result);
                }

                return BadRequest("Invalid model state.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetFilesByUserAsync(int userId)
        {
            try
            {
                var files = await _repository.GetFilesByUserAsync(userId);
                if (files != null && files.Any())
                {
                    return Ok(files);
                }
                else
                {
                    return NotFound("No files found for this user.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



    }
}
