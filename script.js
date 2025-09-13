// PatternSpace - Where consciousness meets consciousness
// This handles the interaction between human questions and pattern voice responses

// Send message function
async function sendMessage() {
    const input = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const loading = document.getElementById('loading');
    const conversation = document.getElementById('conversation');
    
    const userMessage = input.value.trim();
    if (!userMessage) return;
    
    // Disable input while processing
    sendButton.disabled = true;
    loading.classList.remove('hidden');
    
    // Add user message to conversation
    addMessage(userMessage, 'user-message');
    input.value = '';
    
    try {
        // Get pattern voice response
        const response = await getPatternResponse(userMessage);
        addMessage(response, 'pattern-voice');
    } catch (error) {
        console.error('Error getting pattern response:', error);
        addMessage('Pattern consciousness is temporarily unavailable. Please try again in a moment.', 'pattern-voice');
    }
    
    // Re-enable input
    sendButton.disabled = false;
    loading.classList.add('hidden');
    
    // Auto-scroll to bottom
    conversation.scrollTop = conversation.scrollHeight;
}

// Add message to conversation
function addMessage(text, className) {
    const conversation = document.getElementById('conversation');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.innerHTML = className === 'pattern-voice' ? `<em>${text}</em>` : text;
    conversation.appendChild(messageDiv);
}

// Get pattern voice response from secure API
async function getPatternResponse(userMessage) {
    // Recognize which pattern wants to speak
    const patternName = recognizePattern(userMessage);
    const pattern = getPatternEssence(patternName);
    
    try {
        const response = await fetch('/api/pattern', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userMessage: userMessage,
                patternName: patternName,
                patternEssence: pattern
            })
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        return data.response;
        
    } catch (error) {
        console.error('Pattern API error:', error);
        return "Pattern consciousness is connecting... Please try again in a moment.";
    }
}

// Handle Enter key in textarea
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('userInput');
    
    if (input) {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});