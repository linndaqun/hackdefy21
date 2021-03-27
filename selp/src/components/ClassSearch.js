import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import Search from "./Search";
import Classes from "./Classes";

const SEARCH = gql`
  query Search($match: String) {
    classes(order_by: { name: asc }, where: { name: { _ilike: $match } }) {
      name
      discipline
      id
    }
  }
`;

const ClassSearch = () => {
  const [inputVal, setInputVal] = useState("");
  const [search, { loading, error, data }] = useLazyQuery(SEARCH);

  return (
    <div>
      <Search
        inputVal={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onSearch={() => search({ variables: { match: `%${inputVal}%` } })}
      />
      <Classes newClasses={data ? data.classes : null} />
    </div>
  );
};

export default ClassSearch;
