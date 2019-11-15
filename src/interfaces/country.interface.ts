import { IContinent } from './continent.interface';
import { ILanguage } from './language.interface';

export interface ICountry {
    name: string;
    code: string;
    native: string;
    currency: string;
    emoji: string;
    continent: IContinent;
    languages: ILanguage[];
}
