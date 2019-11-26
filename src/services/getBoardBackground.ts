import africa from '../assets/africa.svg';
import asia from '../assets/asia.svg';
import antarctica from '../assets/arctic.svg';
import europe from '../assets/europe.svg';
import northAmerica from '../assets/north-america.svg';
import oceania from '../assets/australia.svg';
import southAmerica from '../assets/south-america.svg';

export function getBoardBackground(continentCode: string) {
    switch (continentCode) {
        case 'AF':
            return africa;
        case 'AN':
            return antarctica;
        case 'AS':
            return asia;
        case 'EU':
            return europe;
        case 'NA':
            return northAmerica;
        case 'OC':
            return oceania;
        case 'SA':
            return southAmerica;

        default:
            break;
    }
}
