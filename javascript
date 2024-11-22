const apiKey = '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';  
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const messagesDiv = document.getElementById('messages');

sendBtn.addEventListener('click', () => {
    const input = userInput.value;
    if (input.trim()) {
        displayMessage(input, 'user');
        userInput.value = '';
        sendBtn.disabled = true;

        getConfusedBotAnswer(input).then(response => {
            const wrongAnswer = intentionallyWrongAnswer(response);
            displayMessage(wrongAnswer, 'bot');
            sendBtn.disabled = false;
        });
    }
});

function displayMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-msg' : 'bot-msg');
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function getConfusedBotAnswer(input) {
    const url = 'https://api.openai.com/v1/completions';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4", // or "gpt-3.5-turbo" for GPT-3
            prompt: input,
            max_tokens: 100,
            temperature: 0.7
        })
    });

    const data = await response.json();
    return data.choices[0].text.trim();
}

// Function to intentionally return wrong answers
function intentionallyWrongAnswer(correctAnswer) {
    // For simplicity, this function reverses the correct answer or makes it nonsensical
    return 'Wrong answer: ' + correctAnswer.split('').reverse().join('');
}
