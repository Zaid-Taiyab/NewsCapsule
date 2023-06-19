import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ArticleDetails from './pages/ArticleDetails';
import CreateArticle from './pages/CreateArticle';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/article/:id" component={ArticleDetails} />
        <Route path="/create" component={CreateArticle} />
      </Switch>
    </Router>
  );
};

export default App;