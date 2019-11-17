import React from 'react';
import CountriesQuery from '../api/queries/countries';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress } from '@material-ui/core';
import Alert from './Alert';
import { CountryEntity } from '../interfaces/country.interface';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Details from './Details';
import { getRandomCountries } from '../services/getRandomCountries';

const Quiz = () => {
    const { loading, error, data } = useQuery(CountriesQuery);

    if (!data) {
        return null;
    }

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert variant="error" message={error.message}></Alert>;
    }

    const randomCountries: CountryEntity[] = getRandomCountries(
        data.countries,
        10
    );

    return (
        <div>
            <DragDropContext>
                <Droppable droppableId="droppable">
                    {provided => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {randomCountries.map(
                                (country: CountryEntity, index: number) => (
                                    <Draggable
                                        key={country.code}
                                        draggableId={country.code}
                                        index={index}
                                    >
                                        {provided => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Details
                                                    country={country}
                                                    showDetails={false}
                                                ></Details>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Quiz;
