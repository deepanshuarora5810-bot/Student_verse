import fs from 'fs';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

const projectDir = process.cwd();
const rawToken = process.env.GITHUB_TOKEN || process.argv[2];

if (!rawToken || rawToken === 'YOUR_GITHUB_PAT' || rawToken.startsWith('<')) {
  console.error('\n⚠️  Please provide your GitHub Personal Access Token.');
  console.error('Usage: node scripts/push.mjs ghp_yourTokenHere\n');
  process.exit(1);
}

const token = rawToken.trim();

async function diagnoseToken(tok) {
  try {
    const res = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tok}`,
        'User-Agent': 'STUDENTVERSE-Deployer',
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    const scopes = res.headers.get('x-oauth-scopes') || '(none or fine-grained)';
    if (res.status === 401) {
      console.error('\n❌ GitHub API Authentication Failed: 401 Bad Credentials.');
      console.error('The token provided is invalid, expired, or has a typo.');
      return null;
    }

    if (!res.ok) {
      console.warn(`⚠️ GitHub API returned status ${res.status}: ${res.statusText}`);
      return null;
    }

    const userData = await res.json();
    console.log(`\n🔑 Authenticated as GitHub user: @${userData.login}`);
    console.log(`📋 Token scopes: ${scopes}`);

    // Verify repo write access
    const repoRes = await fetch('https://api.github.com/repos/deepanshuarora5810-bot/Student_verse', {
      headers: {
        'Authorization': `Bearer ${tok}`,
        'User-Agent': 'STUDENTVERSE-Deployer',
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (repoRes.ok) {
      const repoData = await repoRes.json();
      const permissions = repoData.permissions || {};
      console.log(`📦 Target repo found: ${repoData.full_name}`);
      console.log(`🔒 Permissions: push=${permissions.push}, admin=${permissions.admin}`);
      if (permissions.push === false) {
        console.error('❌ Your token does not have PUSH (write) permission to this repository!');
      }
    } else {
      console.warn(`⚠️ Repo check returned ${repoRes.status}: ${repoRes.statusText}`);
    }

    return userData.login;
  } catch (err) {
    console.warn('Could not contact GitHub API for pre-flight check:', err.message);
    return null;
  }
}

async function tryPushWithAuth(username, password, label) {
  console.log(`\nAttempting push (${label})...`);
  return await git.push({
    fs,
    http,
    dir: projectDir,
    remote: 'origin',
    ref: 'main',
    force: true,
    onAuth: () => ({ username, password })
  });
}

async function run() {
  const accountLogin = await diagnoseToken(token);
  const username = accountLogin || 'deepanshuarora5810-bot';

  // Strategy 1: username = GitHub username, password = token
  try {
    const res = await tryPushWithAuth(username, token, `username: ${username}, password: [token]`);
    console.log('\n🎉 Push succeeded!', JSON.stringify(res, null, 2));
    return;
  } catch (err1) {
    console.warn('Strategy 1 attempt failed:', err1.message);
  }

  // Strategy 2: username = token, password = ''
  try {
    const res = await tryPushWithAuth(token, '', 'username: [token], password: [empty]');
    console.log('\n🎉 Push succeeded!', JSON.stringify(res, null, 2));
    return;
  } catch (err2) {
    console.warn('Strategy 2 attempt failed:', err2.message);
  }

  // Strategy 3: username = 'x-access-token', password = token
  try {
    const res = await tryPushWithAuth('x-access-token', token, 'username: x-access-token, password: [token]');
    console.log('\n🎉 Push succeeded!', JSON.stringify(res, null, 2));
    return;
  } catch (err3) {
    console.error('\n❌ All push authentication attempts failed.');
    console.error('Final error:', err3.message);
    process.exit(1);
  }
}

run();
