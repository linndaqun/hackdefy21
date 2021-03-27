import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import Classes from "./components/Classes";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://my-app-selp.herokuapp.com/v1/graphql",
  }),
});

const App = () => (
  <ApolloProvider client={client}>
    <Classes />
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
