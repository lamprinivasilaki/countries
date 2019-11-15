import React, { memo, FunctionComponent } from "react";
import CountryQuery from "../api/queries/country";
import { useQuery } from "@apollo/react-hooks";
import Details from "./Details";
import { CircularProgress } from "@material-ui/core";

interface PropsType {
  code: string;
}

const Country: FunctionComponent<PropsType> = ({ code }) => {
  const { loading, error, data } = useQuery(CountryQuery, {
    variables: { code }
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

  return <Details country={data.country}></Details>;
};

export default memo(Country);
