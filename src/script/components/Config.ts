export class Config {
  /** ローカルストレージ用のキー */
  private static KEY_GITHUB_TOKEN = 'GITHUB_TOKEN';

  /** サインイン済みかどうか確認します。 */
  public static isSignedIn(): boolean {
    return !!this.getToken();
  }

  /** アクセストークンを保存します。 */
  public static setToken(token: string) {
    localStorage.setItem(this.KEY_GITHUB_TOKEN, token);
  }

  /** アクセストークンを取得します。 */
  public static getToken(): string {
    return localStorage.getItem(this.KEY_GITHUB_TOKEN);
  }

  /** アクセストークンを削除します。 */
  public static removeToken() {
    localStorage.removeItem(this.KEY_GITHUB_TOKEN);
  }
}
