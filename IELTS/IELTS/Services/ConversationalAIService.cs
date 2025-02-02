using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

public class ConversationalAIService
{
    private readonly string openAiApiKey;
    private readonly HttpClient httpClient;

    public ConversationalAIService(string openAiApiKey)
    {
        this.openAiApiKey = openAiApiKey;
        this.httpClient = new HttpClient();
        this.httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", openAiApiKey);
        this.httpClient.DefaultRequestHeaders.Add("User-Agent", "IELTS-Test-App");
    }

    public async Task<string> GetExaminerResponseAsync(string input)
    {
        var requestBody = new
        {
            model = "gpt-4-turbo", // Use "gpt-3.5-turbo" if cost is a concern
            messages = new[]
            {
                new { role = "system", content = "You are an IELTS examiner. Provide feedback as an examiner would." },
                new { role = "user", content = input }
            },
            max_tokens = 150,
            temperature = 0.7
        };

        var requestContent = new StringContent(JsonSerializer.Serialize(requestBody), System.Text.Encoding.UTF8, "application/json");

        var response = await httpClient.PostAsync("https://api.openai.com/v1/chat/completions", requestContent);

        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            throw new HttpRequestException($"OpenAI API Error: {response.StatusCode} ({response.ReasonPhrase}). Details: {errorContent}");
        }

        var responseContent = await response.Content.ReadAsStringAsync();
        var completion = JsonSerializer.Deserialize<OpenAIChatResponse>(responseContent);

        return completion?.Choices?[0]?.Message?.Content?.Trim() ?? "No response from AI.";
    }

    private class OpenAIChatResponse
    {
        public Choice[] Choices { get; set; }
    }

    private class Choice
    {
        public Message Message { get; set; }
    }

    private class Message
    {
        public string Role { get; set; }
        public string Content { get; set; }
    }
}
