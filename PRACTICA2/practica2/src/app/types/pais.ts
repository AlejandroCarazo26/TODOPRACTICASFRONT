export type Country = {
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc?: string;
  independent: boolean;
  status: string;
  unMember: boolean;

  idd: {
    root: string;
    suffixes: string[];
  };

  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  landlocked: boolean;
  borders?: string[];
  area: number;

  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };

  population: number;
  fifa?: string;

  car: {
    signs: string[];
    side: string;
  };

  timezones: string[];
  continents: string[];
  flag: string;

  name: {
    common: string;
    official: string;
    nativeName: Record<
      string,
      {
        official: string;
        common: string;
      }
    >;
  };

  currencies: Record<
    string,
    {
      name: string;
      symbol: string;
    }
  >;

  languages: Record<string, string>;

  latlng: number[];

  demonyms: {
    eng: {
      f: string;
      m: string;
    };
    fra: {
      f: string;
      m: string;
    };
  };

  translations: Record<
    string,
    {
      official: string;
      common: string;
    }
  >;

  gini?: Record<string, number>;

  flags: {
    png: string;
    svg: string;
    alt?: string;
  };

  coatOfArms: {
    png: string;
    svg: string;
  };

  startOfWeek: string;

  capitalInfo: {
    latlng: number[];
  };

  postalCode?: {
    format: string;
    regex: string;
  };
};