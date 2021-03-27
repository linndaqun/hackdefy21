import React from "react";
import { useSubscription, gql } from "@apollo/client";
import { List, ListItem } from "../styles/List";
import { Badge } from "../styles/Badge";

const CLASS = gql`
    subscription Class($id: uuid!) {
        classes_by_pk(id: $id) {
        id
        name
        discipline
        reviews {
            id
            body
        }
        }
    }
`;

const Class = ({
  match: {
    params: { id },
  },
}) => {
  const { loading, error, data } = useSubscription(CLASS, {
    variables: { id },
  });

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  const { name, discipline, reviews } = data.classes_by_pk;

  return (
    <div>
      <h3>
        {name} <Badge>{discipline}</Badge>
      </h3>
      <List>
        {reviews.map((review) => (
          <ListItem key={review.id}>{review.body}</ListItem>
        ))}
      </List>
    </div>
  );
};

export default Class;