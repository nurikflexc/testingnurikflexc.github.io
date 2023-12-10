const { Client } = require('pg');

const connectionString = 'postgresql://nurikflexc:W6CtGvQmI3Fp@ep-small-cherry-31928313.eu-central-1.aws.neon.tech/fully_working_register?sslmode=require';

let password = document.getElementById('password').innerText;
const username = document.getElementById('username').innerText;
const hashedPassword = hashPassword(password).toString();

const client = new Client({
  connectionString
});

client.connect()
  .then(() => {
    const query = {
      text: 'INSERT INTO users (username, hashcode) VALUES ($1, $2)',
      values: [username, hashedPassword]
    };

    return client.query(query);
  })
  .then(() => {
    console.log('Hashed password saved successfully');
  })
  .catch(error => {
    console.error('Error saving hashed password:', error);
  })
  .finally(() => {
    client.end();
  });

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashedPassword;
  }