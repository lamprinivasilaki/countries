import { ContinentEntity } from './continent.interface';
import { LanguageEntity } from './language.interface';

export interface CountryEntity {
    name: string;
    code: string;
    native: string;
    currency: string;
    emoji: string;
    continent: ContinentEntity;
    languages: LanguageEntity[];
}
