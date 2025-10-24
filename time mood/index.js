let currentMood = '';
        let intensity = 3;

        function selectMood(mood) {
            currentMood = mood;
            document.body.className = `mood-${mood}`;
            document.querySelectorAll('.mood-emoji').forEach(emoji => emoji.classList.remove('selected'));
            event.target.classList.add('selected');
        }

        function updateIntensity() {
            intensity = document.getElementById('intensity').value;
            const labels = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
            document.getElementById('intensity-value').textContent = labels[intensity - 1];
        }

        function submitMood() {
            const text = document.getElementById('mood-text').value;
            const moodData = {
                mood: currentMood,
                intensity: intensity,
                text: text,
                date: new Date().toISOString().split('T')[0]
            };
            console.log('Mood Submitted:', moodData); // Logs to console for testing
            document.getElementById('affirmation').classList.add('show');
            // In a full app, you'd transition to the next page or save to storage here
        }