import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CountryEntity } from '../interfaces/country.interface';

interface PropsType {
    country: CountryEntity;
    showDetails: boolean;
}

const useStyles = makeStyles({
    card: {
        marginTop: 12,
    },
    content: {
        padding: 20,
    },
});

const Details: FunctionComponent<PropsType> = ({
    country,
    showDetails,
}: PropsType) => {
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
                        <b>{country.continent.name}</b>.
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
