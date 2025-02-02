using IELTS.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IELTS.Controllers
{
    public class TestController : Controller
    {
        private readonly ConversationalAIService _conversationalAIService;

        public TestController(ConversationalAIService conversationalAIService)
        {
            _conversationalAIService = conversationalAIService;
        }

        public async Task<IActionResult> Index()
        {
            var response = await _conversationalAIService.GetExaminerResponseAsync("Hello, how are you?");
            return Content(response);
        }
    }
}
