using iTextSharp.text;
using iTextSharp.text.pdf;

public class ReportService
{
    public void GeneratePdfReport(Feedback feedback, string filePath)
    {
        using (var document = new Document())
        {
            PdfWriter.GetInstance(document, new FileStream(filePath, FileMode.Create));
            document.Open();
            document.Add(new Paragraph($"Fluency: {feedback.Fluency}"));
            document.Add(new Paragraph($"Lexical Resource: {feedback.LexicalResource}"));
            document.Add(new Paragraph($"Grammatical Range: {feedback.GrammaticalRange}"));
            document.Add(new Paragraph($"Pronunciation: {feedback.Pronunciation}"));
            document.Add(new Paragraph($"Overall Score: {feedback.OverallScore}"));
            document.Close();
        }
    }
}
