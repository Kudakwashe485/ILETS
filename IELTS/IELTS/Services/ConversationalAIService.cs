using OpenAI.API;
using OpenAI.API.Completions;
using System.Threading.Tasks;

namespace IELTS.Services
{
	public class ConversationalAIService
	{
		public async Task<string> GetResponseAsync(string userInput)
		{
			var apiKey = "YourOpenAIApiKey";
			var client = new OpenAIAPI(apiKey);
			var response = await client.Completions.CreateCompletionAsync(new CompletionRequest
			{
				Prompt = userInput,
				MaxTokens = 150
			});

			// Assuming the correct property name is Completions
			return response.Completions.First().Text;
		}
	}
}
