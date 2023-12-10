function generateHashCode(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Save the username and hashed password to the Neon-hosted PostgreSQL database
    const request = new XMLHttpRequest();
    request.open('POST', '/register');
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function() {
      if (request.status === 200) {
        document.getElementById('message').textContent = 'User saved successfully.';
      } else {
        document.getElementById('message').textContent = 'Error saving user.';
      }
    };
    request.send(JSON.stringify({ username, hashedPassword }));
  }