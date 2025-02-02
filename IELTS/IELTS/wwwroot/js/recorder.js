document.addEventListener('DOMContentLoaded', function () {
    let audioChunks = []; // Declare audioChunks globally to store the audio fragments

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true; // Keep recognizing continuously
    recognition.interimResults = true; // Allow interim results

    // Initialize the recognition event handlers
    recognition.onstart = () => {
        console.log('Speech recognition started');
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
        console.log('Speech recognition ended');
    };

    // Process the result from speech-to-text
    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        console.log('Transcript:', transcript);

        // Display the latest transcript to the user
        document.getElementById('feedback').innerText = `Transcript: ${transcript}`;

        // Push the current result to audioChunks array
        audioChunks.push(transcript);
    };

    // Start recording when the start button is clicked
    document.getElementById('startRecording').addEventListener('click', () => {
        audioChunks = []; // Reset the audio chunks before starting a new recording
        recognition.start();
        disableButton(document.getElementById('startRecording'));
        enableButton(document.getElementById('stopRecording'));
    });

    // Stop recording when the stop button is clicked
    document.getElementById('stopRecording').addEventListener('click', () => {
        recognition.stop();
        disableButton(document.getElementById('stopRecording'));
        enableButton(document.getElementById('submitAudio'));
    });

    // Submit the transcript when the user clicks the submit button
    document.getElementById('submitAudio').addEventListener('click', async () => {
        const submitButton = document.getElementById('submitAudio');
        submitButton.disabled = true; // Disable the button while submitting

        // Join the audio chunks into a single string (the full transcript)
        const transcript = audioChunks.join(' ');

        // Check if the transcript is empty
        if (!transcript.trim()) {
            document.getElementById('feedback').innerText = 'Error: Transcript is empty.';
            submitButton.disabled = false; // Re-enable the button
            return; // Avoid submitting an empty transcript
        }

        try {
            // Submit the transcript to the server
            const response = await fetch('/IELTSSpeaking/ProcessTranscript', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ transcript }), // Send transcript as JSON
            });

            // Check if the response is not OK (status 200)
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            // Parse the server response
            const result = await response.json();

            if (result.error) {
                throw new Error(result.error);
            }

            // Display the AI response and scores
            const scores = result.scores || {};
            document.getElementById('feedback').innerText = `
                Transcript: ${result.transcript}
                \nAI Response: ${result.aiResponse}
                \nScores:
                \nFluency: ${scores.fluencyScore}
                \nLexical: ${scores.lexicalScore}
                \nGrammar: ${scores.grammarScore}
            `;

        } catch (error) {
            console.error('Error submitting transcript:', error);
            document.getElementById('feedback').innerText = `Error: ${error.message}`;
        } finally {
            submitButton.disabled = false; // Re-enable the button after submission
        }
    });

    // Dynamic Cue Card Data
    const cueCardData = {
        topics: {
            Birthdays: {
                points: [
                    'Do you enjoy your birthdays?',
                    'Do you usually celebrate your birthday?',
                    'What did you do on your last birthday?',
                    'Can you remember a birthday you enjoyed as a child?',
                    'Do most people celebrate their birthdays with a party in your country?',
                    'Which birthdays are considered important in your country?',
                ],
            },
            Computers: {
                points: [
                    'Do you often use a computer?',
                    'How do you usually get online?',
                    'Do you have your own computer?',
                    'What’s your favourite website?',
                    'Do you think children should be allowed unsupervised access to the internet?',
                ],
            },
            'Daily Routine': {
                points: [
                    'When do you usually get up in the morning?',
                    'Do you usually have the same routine every day?',
                    'What is your daily routine?',
                    'Do you ever change your routine?',
                    'Is your routine the same today as it was when you were a child?',
                ],
            },
            Dictionaries: {
                points: [
                    'Do you often use a dictionary?',
                    'What do you use dictionaries for?',
                    'What kinds of dictionaries do you think are most useful?',
                    'Do you think dictionaries are useful for learning a language?',
                    'What kind of information can you find in a dictionary?',
                ],
            },
            Clothes: {
                points: [
                    'Are clothes important to you?',
                    'What kind of clothes do you usually wear?',
                    'Do you ever wear the traditional clothes of your country?',
                    'Where do you usually buy your clothes?',
                    'Have you ever worn a uniform?',
                    'Do most people in your country follow fashion?',
                ],
            },
        }
    };

    // Dynamically display Cue Card content based on topic
    function displayCueCard(topic) {
        const cueCard = cueCardData.topics[topic];
        if (cueCard) {
            const pointsList = cueCard.points.map(point => `<li>${point}</li>`).join('');
            document.getElementById('cue-card-topic').innerText = topic;
            document.getElementById('cue-card-questions').innerHTML = pointsList;
        } else {
            document.getElementById('cue-card-questions').innerHTML = '<li>Topic not found.</li>';
        }
    }

    // Select topic button listener
    document.querySelectorAll('.topic-button').forEach(button => {
        button.addEventListener('click', () => {
            // Display cue card based on the selected topic
            displayCueCard(button.innerText);

            // Reset and enable all buttons
            document.querySelectorAll('.topic-button').forEach(btn => enableButton(btn));

            // Disable the clicked button
            disableButton(button);

            // Enable the start recording button again
            enableButton(document.getElementById('startRecording'));
        });
    });

    function resetButtonStyles() {
        document.getElementById('startRecording').disabled = false;
        document.getElementById('stopRecording').disabled = true;
        document.getElementById('submitAudio').disabled = true;

        document.getElementById('startRecording').style.backgroundColor = ''; // Default color
        document.getElementById('stopRecording').style.backgroundColor = ''; // Default color
        document.getElementById('submitAudio').style.backgroundColor = ''; // Default color
    }

    function disableButton(button) {
        button.disabled = true;
        button.style.backgroundColor = '#008CBA'; // Dimmed color
    }

    function enableButton(button) {
        button.disabled = false;
        button.style.backgroundColor = ''; // Reset color to default
    }
});
