document.addEventListener('DOMContentLoaded', () => {
  const tokenForm = document.getElementById('tokenForm');
  const tokenList = document.getElementById('tokenList');
  const url = "http://localhost:3000";

  // Handle token creation form submission
  tokenForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(tokenForm);

    // Send data to backend to create a token
    const response = await fetch(url+'/api/tokens', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert('Token created successfully!');
      tokenForm.reset();
      loadTokens();  // Reload token list
    } else {
      alert('Failed to create token');
    }
  });

  // Load existing tokens
  async function loadTokens() {
    const response = await fetch(url+'/api/tokens');
    const tokens = await response.json();

    tokenList.innerHTML = tokens.map(token => `
      <div class="token">
        <h3>${token.name} (${token.symbol})</h3>
        <p>${token.description}</p>
        <img src="${token.imageUrl}" alt="Token Image" width="100" height="100">
        <p>Supply: ${token.supply}</p>
        <p>Decimals: ${token.decimals}</p>
        <div>
          ${token.website ? `<a href="${token.website}" target="_blank">Website</a>` : ''}
          ${token.twitter ? `<a href="${token.twitter}" target="_blank">Twitter</a>` : ''}
          ${token.telegram ? `<a href="${token.telegram}" target="_blank">Telegram</a>` : ''}
          ${token.discord ? `<a href="${token.discord}" target="_blank">Discord</a>` : ''}
        </div>
      </div>
    `).join('');
  }

  loadTokens(); // Initial load of tokens
});
