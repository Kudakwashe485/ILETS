// wwwroot/js/recorder.js
document.addEventListener('DOMContentLoaded', function () {
    let mediaRecorder;
    let audioChunks = [];

    document.getElementById('startRecording').addEventListener('click', async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };
        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const formData = new FormData();
            formData.append('audioFile', audioBlob, 'recording.wav');

            const response = await fetch('/IELTSSpeaking/SubmitAudio', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            document.getElementById('feedback').innerText = `Transcript: ${result.transcript}\nAI Response: ${result.aiResponse}\nScores: Fluency - ${result.scores.fluencyScore}, Lexical - ${result.scores.lexicalScore}, Grammar - ${result.scores.grammarScore}`;
        };
        mediaRecorder.start();
        document.getElementById('startRecording').disabled = true;
        document.getElementById('stopRecording').disabled = false;
    });

    document.getElementById('stopRecording').addEventListener('click', () => {
        mediaRecorder.stop();
        document.getElementById('stopRecording').disabled = true;
        document.getElementById('submitAudio').disabled = false;
    });

    document.getElementById('submitAudio').addEventListener('click', async () => {
        // Submit the audio data
        document.getElementById('submitAudio').disabled = true;
    });
});
