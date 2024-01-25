using Microsoft.AspNetCore.Mvc;
using MediatR;
using ImageStorageAPI.Core.Images.Queries;
using Microsoft.AspNetCore.Authorization;

namespace ImageStorageAPI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ImageController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("list")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> List()
        {
            try
            {
                var images = await _mediator.Send(new ListImagesQuery());
                return Ok(images);
            }
            catch (Exception ex)
            {
                Console.Write(@$"erro: {ex.Message}");
                ModelState.AddModelError("erro", "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde!");
                return BadRequest(ModelState);
            }           
        }
    }
}