
export default interface IDecoded {
  id: string;
  verified?: boolean;
  blocked?: boolean;
  role?: string;
  expiresIn?: string;
  aud?: string;
  iss?: string;
  browser?: string;
  platform?: string;
}
