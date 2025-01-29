using Google;
using IELTS.Models;
using IELTS.Services;
using Microsoft.AspNetCore.Mvc;
using IELTS.Data;
using System.Threading.Tasks;

namespace IELTS.Controllers
{
    public class IELTSSpeakingController : Controller
    {
        private readonly AppDbContext _context;
        private readonly SpeechToTextService _speechToTextService;
        private readonly ConversationalAIService _conversationalAIService;
        private readonly ScoringService _scoringService;

        public IELTSSpeakingController(AppDbContext context, SpeechToTextService speechToTextService, ConversationalAIService conversationalAIService, ScoringService scoringService)
        {
            _context = context;
            _speechToTextService = speechToTextService;
            _conversationalAIService = conversationalAIService;
            _scoringService = scoringService;
        }

        public IActionResult Practice()
        {
            var model = new PracticeViewModel
            {
                // Initialize properties as needed
            };
            return View(model);
        }

        public IActionResult Test()
        {
            var model = new TestViewModel
            {
                // Initialize properties as needed
            };
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> SubmitAudio(IFormFile audioFile)
        {
            using (var stream = audioFile.OpenReadStream())
            {
                var transcript = await _speechToTextService.TranscribeAudioAsync(stream);
                var aiResponse = await _conversationalAIService.GetResponseAsync(transcript);
                var scores = _scoringService.ScoreResponse(transcript);

                // Save to database
                var user = _context.Users.FirstOrDefault();
                var session = new Session { UserId = user.Id, Type = "Practice", Date = DateTime.Now };
                var response = new Response
                {
                    SessionId = session.Id,
                    Text = transcript,
                    Feedback = aiResponse,
                    FluencyScore = scores.FluencyScore,
                    LexicalScore = scores.LexicalScore,
                    GrammarScore = scores.GrammarScore
                };

                _context.Sessions.Add(session);
                _context.Responses.Add(response);
                await _context.SaveChangesAsync();

                return Json(new { transcript, aiResponse, scores });
            }
        }
    }
}
