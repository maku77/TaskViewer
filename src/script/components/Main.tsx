import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Config } from './Config';

export const Main: React.FC<{}> = () => {
  if (!Config.isSignedIn()) {
    return <Redirect to="/" />;
  }

  return <>
    <h1>Main（メイン画面）</h1>
    <p>
      GitHub 認証後に表示可能なメイン画面です。<br />
      GitHub API で取得した情報を表示します。<br />
      サインアウトボタンを押すと、サインアウト処理 (/signout) を行い、<br />
      ようこそ画面 (/) に戻ります。
    </p>
    <Link to="/signout">サインアウト</Link>
  </>;
};