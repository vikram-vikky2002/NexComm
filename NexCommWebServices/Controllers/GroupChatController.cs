using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NexCommDAL;
using NexCommDAL.Models; // Using DAL models instead of WebServices models
using System.IO; // Added for file operations
using System; // Added for Path operations
using NexCommWebServices.Models; // Added for FileUploadRequest model

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
        [HttpPut("update-group-name")]
        public async Task<IActionResult> UpdateGroupName([FromBody] GroupNameUpdateDto dto)
        {
            var result = await _repository.UpdateGroupNameAsync(dto.RoomId, dto.NewName);
            if (result)
                return Ok(true);
            return BadRequest("Failed to update group name");
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
                        CreatedAt = message.CreatedAt,
                        RoomId = message.RoomId
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

        [HttpGet]
        public async Task<IActionResult> GetFilesForRoomAsync(int roomId)
        {
            try
            {
                var files = await _repository.GetFilesByRoomAsync(roomId);
                if (files != null && files.Count > 0)
                {
                    return Ok(files);
                }
                else
                {
                    return NotFound("No files found for this room.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UploadFileAsync([FromForm] FileUploadRequest request)
        {
            try
            {
                if (request.File == null || request.File.Length == 0)
                {
                    return BadRequest("No file uploaded.");
                }

                // Define the uploads directory
                string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                
                // Create the directory if it doesn't exist
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // Generate a unique filename to avoid conflicts
                string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(request.File.FileName);
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                // Save the file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await request.File.CopyToAsync(stream);
                }

                // Create a file record
                var fileRecord = new NexCommDAL.Models.File
                {
                    UserId = request.UserId,
                    RoomId = request.RoomId,
                    Path = $"/uploads/{uniqueFileName}",
                    FileType = Path.GetExtension(request.File.FileName).ToLower(),
                    CreatedAt = DateTime.Now
                };

                // Save the file record to database
                var fileResult = await _repository.UploadFileAsync(fileRecord);

                if (fileResult != null)
                {
                    // Create a message to notify about the file upload
                    var message = new NexCommDAL.Models.Message
                    {
                        UserId = request.UserId,
                        Text = $"File: {request.File.FileName} uploaded",
                        CreatedAt = DateTime.Now,
                        RoomId = request.RoomId
                    };

                    // Save the message
                    var messageResult = await _repository.SendMessageAsync(message);

                    return Ok(new { 
                        message = messageResult,
                        file = fileResult,
                        fileUrl = $"/uploads/{uniqueFileName}"
                    });
                }
                else
                {
                    // Clean up if database save fails
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                    return BadRequest("Failed to save file record to database.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetFile/{fileName}")]
        public IActionResult GetFile(string fileName)
        {
            try
            {
                // Get the file from the uploads directory
                string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                string filePath = Path.Combine(uploadsFolder, fileName);

                if (!System.IO.File.Exists(filePath))
                {
                    return NotFound();
                }

                // Get the file extension to determine content type
                string fileExtension = Path.GetExtension(fileName).ToLower();
                string contentType = GetContentType(fileExtension);

                // Return the file with the appropriate content type
                return PhysicalFile(filePath, contentType);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private string GetContentType(string fileExtension)
        {
            switch (fileExtension)
            {
                case ".pdf":
                    return "application/pdf";
                case ".jpg":
                case ".jpeg":
                case ".png":
                case ".gif":
                    return "image/" + fileExtension.Substring(1);
                case ".doc":
                case ".docx":
                    return "application/msword";
                case ".xls":
                case ".xlsx":
                    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                case ".txt":
                    return "text/plain";
                default:
                    return "application/octet-stream";
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
