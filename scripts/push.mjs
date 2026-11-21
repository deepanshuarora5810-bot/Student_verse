import fs from 'fs';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

const projectDir = process.cwd();
const token = process.env.GITHUB_TOKEN || process.argv[2];

if (!token) {
  console.error('ERROR: No GITHUB_TOKEN or Personal Access Token provided.');
  console.error('Usage: GITHUB_TOKEN=your_pat node scripts/push.mjs OR node scripts/push.mjs your_pat');
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
        password: ''
      })
    });
    console.log('Push succeeded!', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Push error:', error.message || error);
    process.exit(1);
  }
}

run();
