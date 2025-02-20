export interface User {
  id: string;
  name: string;
  location: string;
}

export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface Photo {
  id: string;
  description: string | null;
  alt_description: string | null;
  urls: Urls;
  user: User;
}