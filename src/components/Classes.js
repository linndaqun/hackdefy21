import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { List, ListItemWithLink } from "../styles/List";
import { Badge } from "../styles/Badge";
import labels from "../styles/InputForm";
import Rating from '@material-ui/lab/Rating';

const CLASSES = gql`
{
    classes(order_by: { rating: desc }) {
        id
        name
        discipline
        rating
    }
  }
`;

const Classes = ({ newClasses }) => {
    const { loading, error, data } = useQuery(CLASSES);
  
    const renderClasses = (classes) => { 
        return classes.map(({id, name, discipline, rating}) =>(
                <ListItemWithLink key={id}>
                    <Link to={`/class/${id}`} >
                        {name} <Badge>{discipline}</Badge>
                        <p></p>
                        <Rating name="read-only" value={rating} readOnly>{labels[rating !== null ? rating : 3]}</Rating>
                    </Link>
                </ListItemWithLink>
            ));
        };
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error :( ${error.message}</p>;

    return <List>{renderClasses(newClasses || data.classes)}</List>;
  };
  
  export default Classes;