using IELTS.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IELTS.Controllers
{
	public class TestController : Controller
	{
		private readonly ConversationalAIService _conversationalAIService;

		public TestController()
		{
			_conversationalAIService = new ConversationalAIService();
		}

		public async Task<IActionResult> Index()
		{
			var response = await _conversationalAIService.GetResponseAsync("Hello, how are you?");
			return Content(response);
		}
	}
}
