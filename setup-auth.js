// Run this script with 'node setup-auth.js' to generate a secure NEXTAUTH_SECRET
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function generateRandomKey(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

function createEnvFile() {
  const nextAuthSecret = generateRandomKey();
  const envContent = `# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=${nextAuthSecret}

# App Configuration
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
`;

  const envPath = path.join(__dirname, '.env.local');
  
  // Check if file already exists
  if (fs.existsSync(envPath)) {
    console.log('\x1b[33m%s\x1b[0m', '.env.local already exists! Not overwriting it.');
    console.log('\x1b[36m%s\x1b[0m', 'If you want to add a NEXTAUTH_SECRET, use this value:');
    console.log('\x1b[32m%s\x1b[0m', nextAuthSecret);
    return;
  }

  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\x1b[32m%s\x1b[0m', '.env.local file created successfully!');
    console.log('\x1b[36m%s\x1b[0m', 'Next steps:');
    console.log('1. Go to https://console.cloud.google.com/ and create a new project');
    console.log('2. Set up OAuth consent screen (External)');
    console.log('3. Create OAuth credentials (Web application)');
    console.log('4. Add authorized redirect URIs:');
    console.log('   - http://localhost:3000/api/auth/callback/google');
    console.log('5. Copy the Client ID and Client Secret to .env.local');
    console.log('\x1b[33m%s\x1b[0m', 'Happy coding!');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error creating .env.local file:', error);
  }
}

createEnvFile(); 