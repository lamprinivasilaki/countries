import React, { FunctionComponent } from "react";
import { CircularProgress } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import CountriesPerContinentQuery from "../api/queries/countries_per_continent";
import Selector from "./Selector";

interface PropsType {
  continentCode: string;
  code: string;
  onCodeSelected: any;
}

const CountriesPerContinent: FunctionComponent<PropsType> = ({
  continentCode,
  code,
  onCodeSelected
}) => {
  const { loading, error, data } = useQuery(CountriesPerContinentQuery, {
    variables: { code: continentCode }
  });

  if (!data) {
    return null;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <Selector
      data={data.continent.countries}
      text="Countries"
      code={code}
      onCodeSelected={onCodeSelected}
    />
  );
};

export default CountriesPerContinent;
