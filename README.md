Install the following packages

dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Google.Cloud.Speech.V1
dotnet add package OpenAI
dotnet add package OpenAI.API

Install deepSpeech application 
- https://github.com/mozilla/DeepSpeech/releases
  "SpeechToText": {
    "ModelPath": "deepspeech-0.9.3-models.pbmm",
    "ScorerPath": "deepspeech-0.9.3-models.scorer"
  },
