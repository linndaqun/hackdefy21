import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import Search from "./Search";
import Classes from "./Classes";
import "../App.css";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const SEARCH = gql`
  query Search($match: String) {
    classes(order_by: { rating: desc }, where: { name: { _ilike: $match } }) {
      id
      name
      discipline
      rating
    }
  }
`;

const SEARCH_DISCIPLINE = gql`
  query Search($match: String) {
    classes(order_by: { rating: desc }, where: { discipline: { _ilike: $match } }) {
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ClassSearch = () => {
  const [inputVal, setInputVal] = useState("");
  const [searchType, setSearchType] = useState(SEARCH);
  const [search, { loading, error, data }] = useLazyQuery(searchType);
  const classes = useStyles();

  const handleChange = (event) => {
    if (event.target.value == SEARCH) {
      setSearchType(SEARCH);
      search({ variables: { match: `%${""}%` } });
    }
    else {
      setSearchType(SEARCH_DISCIPLINE);
      search({ variables: { match: `%${event.target.value}%` } });
    }
  }

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
      <Grid container
        justify="center"
        alignItems="flex-start">
        <Grid item>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Select Filter:
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={searchType}
            onChange={handleChange}
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value={SEARCH}>
              <em>All</em>
            </MenuItem>
            <MenuItem value={"art"}>Art</MenuItem>
            <MenuItem value={"math"}>Math</MenuItem>
            <MenuItem value={"english"}>English</MenuItem>
            <MenuItem value={"history"}>History</MenuItem>
            <MenuItem value={"language"}>Language</MenuItem>
            <MenuItem value={"biology"}>Biology</MenuItem>
            <MenuItem value={"physics"}>Physics</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        <Grid item>
          <Classes className={classes.class} newClasses={data ? data.classes : null} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ClassSearch;
