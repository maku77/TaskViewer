import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Config } from './Config';

export const SignOut: React.FC<{}> = () => {
  Config.removeToken();
  return <Redirect to="/" />;
};
