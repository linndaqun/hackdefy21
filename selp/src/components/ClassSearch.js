import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import Search from "./Search";
import Classes from "./Classes";
import "../App.css";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const SEARCH = gql`
  query Search($match: String) {
    classes(order_by: { rating: asc }, where: { discipline: { _ilike: $match } }) {
      id
      name
      discipline
      rating
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 140,
    width: 300,
    marginLeft: 100,
  },
  class: {
    margin: 'auto',
    display: 'block',
    width: 500,
    maxHeight: '100%',
  },
}));

const ClassSearch = () => {
  const [inputVal, setInputVal] = useState("");
  const [search, { loading, error, data }] = useLazyQuery(SEARCH);
  const classes = useStyles();

  return (
    <div>
      <h1>
      {'Schelp'}

      </h1>
      <Search
        inputVal={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onSearch={() => search({ variables: { match: `%${inputVal}%` } })}
      />
      <Classes className={classes.class} newClasses={data ? data.classes : null} />
    </div>
  );
};

export default ClassSearch;
