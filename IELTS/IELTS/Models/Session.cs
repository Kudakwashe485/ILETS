namespace IELTS.Models
{
    public class Session
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Mode { get; set; } // Practice or Test
        public List<Response> Responses { get; set; }
    }
}
