using Google.Cloud.Speech.V1;

namespace IELTS.Services
{
	public class SpeechToTextService
	{
		public async Task<string> TranscribeAudioAsync(Stream audioStream)
		{
			var speech = SpeechClient.Create();
			var response = await speech.RecognizeAsync(new RecognitionConfig()
			{
				Encoding = RecognitionConfig.Types.AudioEncoding.Linear16,
				SampleRateHertz = 16000,
				LanguageCode = "en",
			}, RecognitionAudio.FromStream(audioStream));

			return response.Results.First().Alternatives.First().Transcript;
		}
	}
}
