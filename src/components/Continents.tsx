import React, { FunctionComponent } from "react";
import ContinentsQuery from "../api/queries/continents";
import { useQuery } from "@apollo/react-hooks";
import { CircularProgress } from "@material-ui/core";
import Selector from "./Selector";
import Alert from "./Alert";

interface PropsType {
  code: string;
  onCodeSelected: (newCode: string) => void;
}
const Continents: FunctionComponent<PropsType> = ({ code, onCodeSelected }) => {
  const { loading, error, data } = useQuery(ContinentsQuery);

  if (!data) {
    return null;
  }
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert variant="error" message={error.message}></Alert>;
  }

  return (
    <Selector
      data={data.continents}
      text="Continents"
      code={code}
      onCodeSelected={onCodeSelected}
    />
  );
};

export default Continents;
