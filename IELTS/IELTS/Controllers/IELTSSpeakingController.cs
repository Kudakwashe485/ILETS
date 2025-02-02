using IELTS.Data;
using IELTS.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IELTS.Models;
using System;
using System.Threading.Tasks;

namespace IELTS.Controllers
{
    [ApiController]
    [Route("api/ielts")]
    public class IELTSSpeakingController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ConversationalAIService _conversationalAIService;
        private readonly ScoringService _scoringService;
        private readonly AssessmentService _assessmentService;

        public IELTSSpeakingController(
            AppDbContext context,
            AssessmentService assessmentService,
            ConversationalAIService conversationalAIService,
            ScoringService scoringService)
        {
            _context = context;
            _conversationalAIService = conversationalAIService;
            _scoringService = scoringService;
            _assessmentService = assessmentService;
        }

        [HttpGet("practice")]
        public IActionResult Practice()
        {
            var model = new PracticeViewModel();
            return View("Practice", model);
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            var model = new TestViewModel();
            return View("Test", model);
        }

        [HttpPost("start-session")]
        public async Task<IActionResult> StartSession([FromBody] string mode)
        {
            var session = new Session
            {
                StartTime = DateTime.Now,
                Mode = mode
            };

            _context.Sessions.Add(session);
            await _context.SaveChangesAsync();

            return Ok(new { SessionId = session.Id });
        }

        [HttpPost("process-transcript")]
        public async Task<IActionResult> ProcessTranscript([FromBody] TranscriptRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Transcript))
            {
                return BadRequest(new { error = "Transcript cannot be empty." });
            }

            try
            {
                // Get AI-generated examiner response
                string examinerResponse = await _conversationalAIService.GetExaminerResponseAsync(request.Transcript);

                // Save user response
                var userResponse = new UserResponse
                {
                    Transcript = request.Transcript,
                    Timestamp = DateTime.Now,
                    SessionId = request.SessionId
                };

                _context.UserResponses.Add(userResponse);
                await _context.SaveChangesAsync();

                // Assess the transcript for IELTS scoring
                var feedback = new Feedback
                {
                    SessionId = request.SessionId,
                    Fluency = _assessmentService.AssessFluency(request.Transcript),
                    LexicalResource = _assessmentService.AssessLexicalResource(request.Transcript),
                    GrammaticalRange = _assessmentService.AssessGrammaticalRange(request.Transcript),
                    Pronunciation = _assessmentService.AssessPronunciation(request.Transcript)
                };

                _context.Feedbacks.Add(feedback);
                await _context.SaveChangesAsync();

                return Ok(new { examinerResponse, feedback });
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, new { error = "Failed to get a response from OpenAI.", details = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Internal server error.", details = ex.Message });
            }
        }

        [HttpPost("end-session")]
        public async Task<IActionResult> EndSession([FromBody] int sessionId)
        {
            var session = await _context.Sessions.FindAsync(sessionId);
            if (session == null)
            {
                return NotFound(new { error = "Session not found." });
            }

            session.EndTime = DateTime.Now;
            await _context.SaveChangesAsync();

            var feedback = await _context.Feedbacks.FirstOrDefaultAsync(f => f.SessionId == sessionId);
            return Ok(new { message = "Session ended.", feedback });
        }
    }

    public class TranscriptRequest
    {
        public int SessionId { get; set; }
        public string Transcript { get; set; }
    }
}
