import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import QuestionsPage from './pages/questions/QuestionsPage';
import NotFound from './components/Notfound';
import QuestionThread from './pages/question-thread/QuestionThread';
import PreferencesPage from './pages/preferences/PreferencesPage';
import Login from './pages/login/Login';

import withAuthCheck from './components/withAuthorizationCheck';

function App() {
  return (
    <div className="h-100">
      {/* // HEADER WILL GO HERE */}
      <Switch>
        <Route exact path="/threads/:questionId" component={QuestionThread} />
        <Route exact path="/threads" component={QuestionsPage} />
        <Route exact path="/" component={QuestionsPage} />
        <Route exact path="/preferences" component={PreferencesPage} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;


/*
        <Route exact path="/threads/:questionId" component={withAuthCheck(QuestionThread)} />
        <Route exact path="/threads" component={withAuthCheck(QuestionsPage)} />
        <Route exact path="/" component={withAuthCheck(QuestionsPage)} />
        <Route exact path="/preferences" component={withAuthCheck(PreferencesPage)} />
*/