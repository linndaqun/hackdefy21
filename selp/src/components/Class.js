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


const Class = ({
  match: {
    params: { id },
  },
}) => {
  const [ inputVal, setInputVal ] = useState("");
  const [ rating, setRating ] = useState(0);
  const { loading, error, data } = useSubscription(CLASS, {
    variables: { id },
  });

  const [addReview] = useMutation(ADD_REVIEW);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  const { name, discipline, reviews } = data.classes_by_pk;

  return (
    <div>
      <h1 align='left' padding='10px'>
      
      {'Schelp'}
      </h1>
      <h3 align='center'>
      
        {name} <Badge>{discipline}</Badge>
      </h3>
      
      <InputForm
        inputVal={inputVal}
        rating={rating}
        onChange={(e) => setInputVal(e.target.value)}
        onRatingChange={(event, newValue) => {
          setRating(newValue);
        }}
        onSubmit={() => {
          addReview({ variables : {body : inputVal, id, rating: rating}})
          .then(() => setInputVal(""))
          .then(() => setRating(0))
          .catch((e) => {setInputVal(e.message);
          });
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