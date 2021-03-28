import React from "react";
import { render } from "react-dom";
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, split } from "@apollo/client";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ClassSearch from "./components/ClassSearch";
import Class from "./components/Class"
import "./index.css"
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";

const GRAPHQL_ENDPOINT = "my-app-selp.herokuapp.com/v1/graphql";

const httpLink = new HttpLink({
  uri: `https://${GRAPHQL_ENDPOINT}`,
});

const wsLink = new WebSocketLink({
  uri: `wss://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
});

const App = () => (
  <div
    style={{
        backgroundColor: '#9B9ECE'}}>
    <BrowserRouter>
    <ApolloProvider client={client}>
      <Switch>
        <Route path="/class/:id" component={Class} />
        <Route path="/" component={ClassSearch} />
      </Switch>
    </ApolloProvider>
  </BrowserRouter>
  </div>
  
);

render(<App />, document.getElementById("root"));
