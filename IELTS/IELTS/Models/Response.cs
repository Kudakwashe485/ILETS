namespace IELTS.Models
{
	public class Response
	{
		public int Id { get; set; }
		public int SessionId { get; set; }
		public string Text { get; set; }
		public string Feedback { get; set; }
		public int FluencyScore { get; set; }
		public int LexicalScore { get; set; }
		public int GrammarScore { get; set; }
	}
}
