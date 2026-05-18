export interface Phrase {
  es: string;
  trans: string;
  pron?: string;
}

export interface IntlDestination {
  emoji: string;
  name: string;
  tag: string;
  page?: string;
}

export interface NatDestination {
  emoji: string;
  name: string;
  tag: string;
  page?: string;
}

export interface Track {
  title: string;
  artist: string;
}

export interface CountryTip {
  id: string;
  visa: string;
  tips: string;
  culture: string;
}
