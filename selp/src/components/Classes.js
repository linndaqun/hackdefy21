import React from "react";
import { useQuery, gql } from "@apollo/client";
import { List, ListItem } from "../styles/List";
import { Badge } from "../styles/Badge";

const CLASSES = gql`
{
    classes {
        id
        name
        discipline
    }
  }
`;

const Classes = ({ newClasses }) => {
    const { loading, error, data } = useQuery(CLASSES);
  
    const renderClasses = (classes) => { 
        return classes.map(({id, name, discipline}) =>(
                <ListItem key={id}>
                    {name} <Badge>{discipline}</Badge>
                </ListItem>
            ));
        };
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error :( ${error.message}</p>;

    return <List>{renderClasses(newClasses || data.classes)}</List>;
  };
  
  export default Classes;