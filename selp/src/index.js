import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ClassSearch from "./components/ClassSearch";
import Class from "./components/Class"
import "./index.css"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://my-app-selp.herokuapp.com/v1/graphql",
  }),
});

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Switch>
        <Route path="/class/:id" component={Class} />
        <Route path="/" component={ClassSearch} />
      </Switch>
    </ApolloProvider>
  </BrowserRouter>
);

render(<App />, document.getElementById("root"));
