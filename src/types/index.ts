import { ModsEnum } from '../utils/enums';

export type Mod = keyof typeof ModsEnum;
export type AnyObject = { [key: string]: unknown };
export type Scope =
  | 'chat.write'
  | 'delegate'
  | 'forum.write'
  | 'friends.read'
  | 'identify'
  | 'public';

export interface Token {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export type GuestToken = Omit<Token, 'refresh_token'>;
