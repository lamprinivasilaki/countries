import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CountryEntity } from '../interfaces/country.interface';
import { StateEntity } from '../interfaces/state.interface';

interface Props {
    country: CountryEntity;
    showDetails: boolean;
    showStates?: boolean;
}

const useStyles = makeStyles({
    card: {
        marginTop: 12,
    },
    content: {
        padding: 20,
    },
});

const Details: FunctionComponent<Props> = ({
    country,
    showDetails,
    showStates = false,
}: Props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent className={classes.content}>
                <Typography gutterBottom variant="h5" component="h2">
                    {country.emoji} {country.name}
                </Typography>
                {showDetails && (
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        <b>{country.name}</b> is a country located in{' '}
                        <b>{country.continent.name}</b>
                        {country.states.length !== 0 && showStates && (
                            <>
                                {' '}
                                and contains the following states:{' '}
                                <b>
                                    {country.states.map(
                                        (state: StateEntity, index: number) =>
                                            index !== country.states.length - 1
                                                ? `${state.name}, `
                                                : `${state.name}`,
                                    )}
                                </b>
                            </>
                        )}
                        .
                        <br />
                        The native name of the country is "
                        <b>{country.native}</b>" and its currency is{' '}
                        <b>{country.currency}</b>.
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default Details;
