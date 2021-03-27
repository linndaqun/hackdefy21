import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import InputForm from "../styles/InputForm";
import Classes from "./Classes";

const SEARCH = gql`
  query Search($match: String) {
    classes(order_by: { name: asc }, where: { name: { _ilike: $match } }) {
      id
      name
      discipline
    }
  }
`;

const ClassSearch = () => {
  const [inputVal, setInputVal] = useState("");
  const [search, { loading, error, data }] = useLazyQuery(SEARCH);

  return (
    <div>
      <InputForm
        inputVal={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onSubmit={() => search({ variables: { match: `%${inputVal}%` } })}
      />
      <Classes newClasses={data ? data.classes : null} />
    </div>
  );
};

export default ClassSearch;
