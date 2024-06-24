import { Api, TelegramClient } from "telegram";
import { ApiCredentials } from "telegram/client/auth";
import { Session, StringSession } from "telegram/sessions";

export class GramClient {
  private apiCredentials: ApiCredentials;
  private sessionString: string;
  private session: StringSession;
  private client: TelegramClient;

  private getApiCredentials(): ApiCredentials {
    const apiId = parseInt(process.env.NEXT_PUBLIC_TELEGRAM_API_ID!);
    const apiHash = process.env.NEXT_PUBLIC_TELEGRAM_API_HASH!;
    return { apiId, apiHash };
  }

  private getSessionString(): string {
    const sessionString = localStorage.getItem("session") || "";
    return sessionString;
  }

  private getSession(): StringSession {
    return new StringSession(this.sessionString);
  }

  private getClient(): TelegramClient {
    return new TelegramClient(
      this.session,
      this.apiCredentials.apiId,
      this.apiCredentials.apiHash,
      {
        connectionRetries: 2,
      }
    );
  }

  private saveSession(): void {
    this.sessionString = this.session.save();
    localStorage.setItem("session", this.sessionString);
  }

  private async resetAuth(): Promise<void> {
    localStorage.removeItem("session");
    this.sessionString = "";
    this.session = this.getSession();
    this.client = this.getClient();
  }

  constructor() {
    this.apiCredentials = this.getApiCredentials();
    this.sessionString = this.getSessionString();
    this.session = this.getSession();
    this.client = this.getClient();
  }

  // -------------------------------PUBLIC--------------------------------- //

  public async connect(): Promise<boolean> {
    return await this.client.connect();
  }

  public async isAuthorized(): Promise<boolean> {
    return await this.client.isUserAuthorized();
  }

  public async getUserSession(): Promise<string> {
    return this.sessionString;
  }

  public async getMe(): Promise<Api.User> {
    return await this.client.getMe();
  }

  public async sendCode(phoneNumber: string): Promise<string> {
    const res = await this.client.sendCode(this.apiCredentials, phoneNumber);
    return res.phoneCodeHash;
  }

  public async signIn(
    phoneNumber: string,
    phoneCodeHash: string,
    phoneCode: string
  ): Promise<void> {
    try {
      await this.client.invoke(
        new Api.auth.SignIn({
          phoneNumber,
          phoneCodeHash,
          phoneCode,
        })
      );
      this.saveSession();
    } catch (error) {
      type TSignInErrorMessage = "SESSION_PASSWORD_NEEDED";
      const err = error as { errorMessage: TSignInErrorMessage };
      throw new Error(err.errorMessage);
    }
  }

  public async signInWithPassword(password: string): Promise<void> {
    let error: Error | undefined = undefined;
    await this.client.signInWithPassword(this.apiCredentials, {
      password: async () => password,
      onError: async (err) => {
        error = err;
        return true;
      },
    });

    if (error) {
      throw error;
    }

    this.saveSession();
  }

  public async logout(): Promise<void> {
    await this.client.invoke(new Api.auth.LogOut());
    await this.client.disconnect();
    await this.resetAuth();
  }
}
