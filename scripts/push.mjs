import fs from 'fs';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

const projectDir = process.cwd();
const token = process.env.GITHUB_TOKEN || process.argv[2];

if (!token || token === 'YOUR_GITHUB_PAT' || token.startsWith('<')) {
  console.error('\n⚠️  Please replace YOUR_GITHUB_PAT with your actual GitHub Personal Access Token.');
  console.error('It usually looks like: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n');
  console.error('1. Open https://github.com/settings/tokens');
  console.error('2. Generate a token (classic) with "repo" permission checked.');
  console.error('3. Run: node scripts/push.mjs ghp_yourActualTokenHere\n');
  process.exit(1);
}

async function run() {
  console.log('Connecting to https://github.com/deepanshuarora5810-bot/Student_verse.git ...');
  try {
    const result = await git.push({
      fs,
      http,
      dir: projectDir,
      remote: 'origin',
      ref: 'main',
      force: true,
      onAuth: () => ({
        username: token,
        password: token
      })
    });
    console.log('✅ Push succeeded!', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('❌ Push error:', error.message || error);
    process.exit(1);
  }
}

run();
