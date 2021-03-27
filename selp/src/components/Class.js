import React, { useState } from "react";
import { useSubscription, gql, useMutation } from "@apollo/client";
import { List, ListItem } from "../styles/List";
import { Badge } from "../styles/Badge";
import InputForm from "../styles/InputForm";

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
        }
        }
    }
`;

const ADD_REVIEW = gql`
  mutation($body: String!, $id: uuid!) {
    AddReview(body: $body, id: $id) {
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
  const { loading, error, data } = useSubscription(CLASS, {
    variables: { id },
  });

  const [addReview] = useMutation(ADD_REVIEW);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  const { name, discipline, reviews } = data.classes_by_pk;

  return (
    <div>
      <h3>
        {name} <Badge>{discipline}</Badge>
      </h3>
      <InputForm
        inputVal={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onSubmit={() => {
          addReview({ variables : {id, body : inputVal}})
          .then(() => setInputVal(""))
          .catch((e) => {setInputVal(e.message);
          });
        } }
        buttonText="Submit"
      />
      <List>
        {reviews.map((review) => (
          <ListItem key={review.id}>{review.body}</ListItem>
        ))}
      </List>
    </div>
  );
};

export default Class;