import React, { useState } from "react";
import { useSubscription, gql, useMutation } from "@apollo/client";
import { List, ListItem } from "../styles/List";
import { Badge } from "../styles/Badge";
import InputForm from "../styles/InputForm";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import labels from "../styles/InputForm";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import "../App.css";

const CLASS_TIME = gql`
    subscription Class($id: uuid!) {
        classes_by_pk(id: $id) {
        id
        name
        discipline
        reviews(order_by: {created_at: desc}) {
          id
          body
          created_at
          rating
        }
        rating
        location
        duration
        }
    }
`;

const CLASS_RATING = gql`
  subscription Class($id: uuid!) {
    classes_by_pk(id: $id) {
    id
    name
    discipline
    reviews(order_by: {rating: desc}) {
      id
      body
      created_at
      rating
    }
    rating
    }
  }
`;

const ADD_REVIEW = gql`
  mutation ($body: String!, $id: uuid!, $rating: Int!) {
    AddReviewRating(body: $body, id: $id, rating: $rating) {
      affected_rows
    }
  }
`;

export function getAvg(newRating, reviews) {
  var total = 0;
  for(var i = 0; i < reviews.length; i++) {
      total += reviews[i].rating;
  }
  var avg = (total + newRating) / (reviews.length + 1);
  return Math.round(avg);
}

const UPDATE_RATING = gql `
  mutation ($id: uuid!, $rating: Int!) {
    UpdateClassRating(id: $id, rating: $rating) {
      rating
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1,1,1,125),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  introduction: {
    margin: theme.spacing(1,1,1,60),
  },
}));

const Class = ({
  match: {
    params: { id },
  },
}) => {
  const classes = useStyles();
  const [ inputVal, setInputVal ] = useState("");
  const [ ratingNew, setRating ] = useState(0);
  const [CLASS, setCLASS] = useState(CLASS_TIME);
  const { loading, error, data } = useSubscription(CLASS, {
    variables: { id },
  });

  const [addReview] = useMutation(ADD_REVIEW);
  const [updateRating] = useMutation(UPDATE_RATING);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  const { name, discipline, reviews, rating, location, duration } = data.classes_by_pk;
  var ratingAvg;

  const handleChange = (event) => {
    if (event.target.value == CLASS_TIME){
      setCLASS(CLASS_TIME)
    }
    else if (event.target.value == CLASS_RATING) {
      setCLASS(CLASS_RATING);
    }
  }

  return (
    <div>
      <h1 align='middle'>
      {'Schelp'}
      </h1>
      <h3 align='center'>
        {name} <Badge>{discipline}</Badge>
        <Rating name="simple-controlled" value={rating} readOnly>{labels[rating !== null ? rating : 2.5]}</Rating>
      </h3>
      <Box className={classes.introduction} >
        <h4>Teacher/School's Bio: </h4>
        <p>{name} teaches {discipline} at {location} </p>
        <p>{name} has been teaching for {duration} years</p>
      </Box>
      <InputForm
        inputVal={inputVal}
        rating={ratingNew}
        onChange={(e) => setInputVal(e.target.value)}
        onRatingChange={(event, newValue) => {
          setRating(newValue);
        }}
        onSubmit={() => {
          ratingAvg = getAvg(ratingNew, reviews);
          addReview({ variables : {body : inputVal, id, rating: ratingNew}})
          .then(() => setInputVal(""))
          .then(() => setRating(0))
          .catch((e) => {});
          updateRating({ variables : { id, rating: ratingAvg}})
          .catch((e) => {});
        } }
        buttonText="Submit"
      />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
      <Grid item>
        <FormControl className={classes.formControl} >
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Sort By:
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={CLASS}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value={CLASS_TIME}>Most Recent</MenuItem>
          <MenuItem value={CLASS_RATING}>Rating</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid item>
        <List>
          {reviews.map((review) => (
            <ListItem key={review.id}>{review.body}
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating name="read-only" value={review.rating} readOnly>{labels[review.rating !== null ? review.rating : 0]}</Rating>
            </Box>
            </ListItem>
          ))}
        </List>
      </Grid>
      </Grid>
    </div>
  );
};

export default Class;