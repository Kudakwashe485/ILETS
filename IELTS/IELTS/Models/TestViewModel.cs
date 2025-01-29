namespace IELTS.Models
{
    public class TestViewModel
    {
        public int SessionId { get; set; }
        public string UserName { get; set; }
        public DateTime Date { get; set; }
        public string Transcript { get; set; }
        public string AiResponse { get; set; }
        public int FluencyScore { get; set; }
        public int LexicalScore { get; set; }
        public int GrammarScore { get; set; }
    }
}
