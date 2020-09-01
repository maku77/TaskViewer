import * as querystring from 'querystring';
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Config } from './Config';

// For https://tvappfunc.azurewebsites.net/api/GitHubToken
const GITHUB_CLIENT_ID = 'e1807cd885ac8299d75e';
// For https://sample-xxx.azurewebsites.net/api/GitHubToken
//const GITHUB_CLIENT_ID = 'af5342d5bd29ed0f3a65';
const GITHUB_API_SCOPE = 'repo';

/**
 * GitHub のサインイン（OAuth 認証処理を開始）画面へ遷移します。
 * すでに認可されている場合は、GitHub からコールバック URL へ即リダイレクトされます。
 */
function signIn() {
  const query = querystring.stringify({
    client_id: GITHUB_CLIENT_ID,
    scope: GITHUB_API_SCOPE,
  });
  window.location.href = 'https://github.com/login/oauth/authorize?' + query;
}

/**
 * GitHub からのリダイレクト時に URL からアクセストークンを取得します。
 */
function handleSignInCallback() {
  const params = window.location.search;
  const code = params.startsWith('?code=') ? params.split('=')[1] : undefined;
  return code;
}

/**
 * Azure Functions 経由で GitHub のアクセストークンを取得します。
 */
function getGitHubToken(code: string, callback: (token: string) => void) {
  const query = querystring.stringify({
    client_id: GITHUB_CLIENT_ID,
    code: code,
  });
  const url = 'https://tvappfunc.azurewebsites.net/api/GitHubToken?' + query;
  //const url = 'https://sample-xxx.azurewebsites.net/api/GitHubToken?' + query;
  fetch(url)
    .then(res => res.json())
    .then(json => {
      if (json.access_token) {
        callback(json.access_token);
      } else {
        throw new Error('Could not obtain access token (bad request)');
      }
    })
    .catch(err => alert(err.name + ': ' + err.message));
}

export const SignIn: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  // 非同期なサインイン処理は useEffect の中で行う
  React.useEffect(() => {
    // サインイン済みであればステートを変更して終了
    if (Config.isSignedIn()) {
      setIsSignedIn(true);
      return;
    }

    // URL から GitHub からの一時コードを抽出
    const code = handleSignInCallback();
    if (code) {
      // 一時コードを見つけたらアクセストークンの取得処理を行う
      // alert('一時コード: ' + code);
      getGitHubToken(code, (token: string) => {
        // alert('アクセストークン: ' + token);
        Config.setToken(token);
        setIsSignedIn(true);
      });
    } else {
      // 純粋な '/signin' へのアクセスであれば、GitHub の認証ページへジャンプ
      signIn();
    }
  }, []);

  if (isSignedIn) {
    return <Redirect to="/main" />;
  } else {
    return <p>サインイン処理中...</p>;
  }
};