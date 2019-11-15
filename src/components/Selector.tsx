import React from 'react';
import { InputLabel, Select } from '@material-ui/core';

interface PropsType {}

const Selector: any = ({ code, onCodeSelected }) => {
    return (
        <div>
            {/* <InputLabel htmlFor="continents">Continents</InputLabel>
            <Select
                native
                value={code}
                onChange={e => onCodeSelected(e.target.value)}
                inputProps={{
                    name: 'continents',
                    id: 'continents',
                }}
            >
                <option key="0" value=""></option>
                {data.continents.map((continent: IContinent) => (
                    <option key={continent.name} value={continent.code}>
                        {continent.name}
                    </option>
                ))}
            </Select> */}
        </div>
    );
};

export default Selector;
