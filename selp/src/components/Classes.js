import React, { useState } from "react";
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
  
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error :( ${error.message}</p>;
  
    return  (
        <List>
            {data.classes.map(({id, name, discipline}) =>(
                <ListItem key={id}>
                    {name} <Badge>{discipline}</Badge>
                </ListItem>
            ))}
        </List>
    );
  };
  
  export default Classes;