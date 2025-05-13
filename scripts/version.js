const fs = require('fs');
const path = require('path');

const VERSION_FILE = path.join(__dirname, '../src/config/version.js');

function updateVersion(type) {
  // Read the current version file
  const content = fs.readFileSync(VERSION_FILE, 'utf8');
  
  // Extract current version numbers
  const majorMatch = content.match(/major: (\d+)/);
  const minorMatch = content.match(/minor: (\d+)/);
  const patchMatch = content.match(/patch: (\d+)/);
  
  let major = parseInt(majorMatch[1]);
  let minor = parseInt(minorMatch[1]);
  let patch = parseInt(patchMatch[1]);
  
  // Update version based on type
  switch (type) {
    case 'major':
      major++;
      minor = 0;
      patch = 0;
      break;
    case 'minor':
      minor++;
      patch = 0;
      break;
    case 'patch':
      patch++;
      break;
    default:
      console.error('Invalid version type. Use: major, minor, or patch');
      process.exit(1);
  }
  
  // Create new version content
  const newContent = content
    .replace(/major: \d+/, `major: ${major}`)
    .replace(/minor: \d+/, `minor: ${minor}`)
    .replace(/patch: \d+/, `patch: ${patch}`);
  
  // Write back to file
  fs.writeFileSync(VERSION_FILE, newContent);
  
  console.log(`Version updated to ${major}.${minor}.${patch}`);
}

// Get version type from command line argument
const type = process.argv[2];
if (!type) {
  console.error('Please specify version type: major, minor, or patch');
  process.exit(1);
}

updateVersion(type); 