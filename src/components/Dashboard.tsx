import React, { memo, FunctionComponent, useState } from "react";
import ContinentsSelector from "./ContinentsSelector";
import CountriesSelector from "./CountriesSelector";
import Country from "./Country";
import { FormGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  formGroup: {
    margin: 12,
    width: 400
  }
}));

const Dashboard: FunctionComponent = () => {
  const classes = useStyles();
  const [continentCode, setContinentCode] = useState();
  const [countryCode, setCountryCode] = useState();

  const onContinentSelected = (option: string) => {
    setContinentCode(option);
  };

  const onCountrySelected = (option: string) => {
    setCountryCode(option);
  };

  return (
    <>
      <FormGroup className={classes.formGroup}>
        <ContinentsSelector
          code={continentCode}
          onCodeSelected={onContinentSelected}
        />
        {continentCode && (
          <CountriesSelector
            continentCode={continentCode}
            code={countryCode}
            onCodeSelected={onCountrySelected}
          />
        )}
      </FormGroup>
      {countryCode && <Country code={countryCode} />}
    </>
  );
};

export default memo(Dashboard);
