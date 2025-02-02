
using IELTS.Models;

public class Feedback
{
    public int Id { get; set; }
    public int SessionId { get; set; }
    public Session Session { get; set; }
    public string Fluency { get; set; }
    public string LexicalResource { get; set; }
    public string GrammaticalRange { get; set; }
    public string Pronunciation { get; set; }
    public string OverallScore { get; set; }
}