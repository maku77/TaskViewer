import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Config } from './Config';

export const Top: React.FC = () => {
  if (Config.isSignedIn()) {
    return <Redirect to="/main" />;
  }

  return <>
    <h1>Top（トップ画面）</h1>
    <p>
      サインインボタンを押すと、サインイン処理 (/signin) を行い、<br />
      メイン画面 (/main) へ遷移します。<br />
      すでにサインイン済みであれば、自動的にメイン画面へ遷移します。
    </p>
    <Link to="/signin">サインイン</Link>
  </>;
};