using IELTS.Models;

public class UserResponse
{
    public int Id { get; set; }
    public string Transcript { get; set; }
    public DateTime Timestamp { get; set; }
    public int SessionId { get; set; }
    public Session Session { get; set; }
}