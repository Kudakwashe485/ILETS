using System.Diagnostics;

public class SpeechToTextService
{
    private readonly string modelPath;
    private readonly string scorerPath;

    public SpeechToTextService(string modelPath, string scorerPath)
    {
        this.modelPath = modelPath;
        this.scorerPath = scorerPath;
    }

    public async Task<string> TranscribeAsync(Stream audioStream)
    {
        string tempWavPath = Path.GetTempFileName() + ".wav";
        using (var fileStream = File.Create(tempWavPath))
        {
            await audioStream.CopyToAsync(fileStream);
        }

        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "deepspeech",
                Arguments = $"--model {modelPath} --scorer {scorerPath} --audio {tempWavPath}",
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            }
        };

        process.Start();
        string output = await process.StandardOutput.ReadToEndAsync();
        process.WaitForExit();

        File.Delete(tempWavPath);

        return output.Trim();
    }
}
