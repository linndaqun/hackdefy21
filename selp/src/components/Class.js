import React, { useState } from "react";
import { useSubscription, gql, useMutation } from "@apollo/client";
import { List, ListItem } from "../styles/List";
import { Badge } from "../styles/Badge";
import InputForm from "../styles/InputForm";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import labels from "../styles/InputForm";
import "../App.css";

const CLASS = gql`
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

const Class = ({
  match: {
    params: { id },
  },
}) => {
  const [ inputVal, setInputVal ] = useState("");
  const [ ratingNew, setRating ] = useState(0);
  const { loading, error, data } = useSubscription(CLASS, {
    variables: { id },
  });

  const [addReview] = useMutation(ADD_REVIEW);
  const [updateRating] = useMutation(UPDATE_RATING);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  const { name, discipline, reviews, rating } = data.classes_by_pk;
  var ratingAvg;

  return (
    <div>
      <h1 align='left' padding='10px'>
      
      {'Schelp'}
      </h1>
      <h3 align='center'>
      
        {name} <Badge>{discipline}</Badge>
        <Rating name="simple-controlled" value={rating} readOnly>{labels[rating !== null ? rating : 2.5]}</Rating>
      </h3>
      
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
      <List>
        {reviews.map((review) => (
          <ListItem key={review.id}>{review.body}
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating name="read-only" value={review.rating} readOnly>{labels[review.rating !== null ? review.rating : 0]}</Rating>
          </Box>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Class;