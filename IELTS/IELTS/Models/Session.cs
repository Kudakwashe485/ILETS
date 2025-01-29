namespace IELTS.Models
{
	public class Session
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public DateTime Date { get; set; }
		public string Type { get; set; }
		public List<Response> Responses { get; set; }

	}
}
