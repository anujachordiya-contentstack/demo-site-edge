const { execSync } = require('child_process');

function isPnpmInstalled() {
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

if (!isPnpmInstalled()) {
  console.log('pnpm is not installed. Installing pnpm...');
  try {
    execSync('npm install -g pnpm', { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to install pnpm:', error);
    process.exit(1);
  }
}

if (process.env.npm_execpath.includes('pnpm')) {
  console.log('Already using pnpm, skipping...');
  process.exit(0);
}

try {
  console.log('Switching to pnpm to install dependencies...');
  execSync('pnpm install', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to install dependencies using pnpm:', error);
  process.exit(1);
}