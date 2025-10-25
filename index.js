let currentMood = '';
let intensity = 3;

// Load stored data
let moods = JSON.parse(localStorage.getItem('moods') || '[]');
let streak = parseInt(localStorage.getItem('streak') || 0);

// Select a mood
function selectMood(mood) {
    currentMood = mood;
    document.body.className = `mood-${mood}`;
    document.querySelectorAll('.mood-emoji').forEach(emoji => emoji.classList.remove('selected'));
    event.target.classList.add('selected');
}

// Update intensity slider label
function updateIntensity() {
    intensity = document.getElementById('intensity').value;
    const labels = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
    document.getElementById('intensity-value').textContent = labels[intensity - 1];
}

// Submit mood and store to localStorage
function submitMood() {
    const text = document.getElementById('mood-text').value;

    const moodData = {
        date: new Date().toISOString().split('T')[0],
        mood: currentMood,
        intensity: intensity,
        text: text
    };

    moods.push(moodData);
    localStorage.setItem('moods', JSON.stringify(moods));

    // Update streak
    streak++;
    localStorage.setItem('streak', streak);

    // Affirmations
    const affirmations = {
        happy: ["You're glowing today! 😄💛", "Keep that positive energy flowing ✨"],
        neutral: ["Balance is a beautiful thing ⚖️", "You're doing fine 💛"],
        sad: ["It’s okay to feel down 💙", "Better days are coming 🌈"],
        angry: ["Pause, breathe, and reset 🌬️", "Channel it into something positive 🔥"],
        tired: ["You deserve some rest 😴💤", "Rest is productive too 💤"]
    };

    const list = affirmations[currentMood] || ["Got it. Remember — every emotion matters 💙"];
    const message = list[Math.floor(Math.random() * list.length)];

    const affirmationElement = document.getElementById('affirmation');
    affirmationElement.textContent = message;
    affirmationElement.classList.add('show');

    // Redirect to dashboard after short delay
    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 2500);
}

// ===============================
// DASHBOARD LOGIC
// ===============================
function loadDashboard() {
    const streakCount = document.getElementById('streak-count');
    if (streakCount) streakCount.textContent = streak || 0;

    showPeriod('week'); // default view
}

// Filter moods by period
function showPeriod(period) {
    const barGraph = document.getElementById('bar-graph');
    if (!barGraph) return;

    barGraph.innerHTML = ''; // clear previous

    const now = new Date();
    let filtered = [];

    if (period === 'week') {
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        filtered = moods.filter(m => new Date(m.date) >= weekAgo);
    } else if (period === 'month') {
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        filtered = moods.filter(m => new Date(m.date) >= monthAgo);
    } else if (period === 'year') {
        const yearAgo = new Date(now);
        yearAgo.setFullYear(now.getFullYear() - 1);
        filtered = moods.filter(m => new Date(m.date) >= yearAgo);
    }

    if (filtered.length === 0) {
        barGraph.innerHTML = '<p>No mood entries yet for this period.</p>';
        return;
    }

    // Create simple bar chart
    filtered.forEach(entry => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${entry.intensity * 20}px`;

        // Mood color mapping
        const colors = {
            happy: '#FFD54F',
            neutral: '#BDBDBD',
            sad: '#64B5F6',
            angry: '#EF5350',
            tired: '#B39DDB'
        };
        bar.style.background = colors[entry.mood] || '#ccc';
        bar.title = `${entry.date}: ${entry.mood} (${entry.intensity})`;
        barGraph.appendChild(bar);
    });
}

// Return to mood picker
function newCheckin() {
    window.location.href = "index.html";
}

// Initialize dashboard when loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('dashboard')) {
        loadDashboard();
    }
});
