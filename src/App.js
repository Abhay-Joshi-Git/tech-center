import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import QuestionsPage from './pages/questions/QuestionsPage';
import NotFound from './components/Notfound';
import QuestionThread from './pages/QuestionThread';
import PreferencesPage from './pages/preferences/PreferencesPage';

function App() {
  return (
    <div className="h-100">
      {/* // HEADER WILL GO HERE */}
      <Switch>
        <Route exact path="/question-thread/:questionId" component={QuestionThread} />
        <Route exact path="/threads" component={QuestionsPage} />
        <Route exact path="/" component={QuestionsPage} />
        <Route exact path="/preferences" component={PreferencesPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
