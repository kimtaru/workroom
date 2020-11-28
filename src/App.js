import { ConnectedRouter } from 'connected-react-router';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Switch } from 'react-router-dom';
import { history } from './redux/create';
import ErrorPage from './pages/ErrorPage';
import UserLogin from './pages/UserLogin';
import NotFound from './pages/NotFound';
import { Layout } from 'antd';
import Header from './pages/header/Header';

import './styles/common.scss';
import HomeContent from './pages/content/HomeContent';
import IssueSider from './pages/sider/IssueSider';
import Hi from './pages/content/IssueContent/Hi';
import Hello from './pages/content/IssueContent/Hello';
import UserJoin from './pages/UserJoin';

function App() {
  return (
    <Layout>
      <ErrorBoundary Error={ErrorPage}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/">
              <Route render={() => <Header current="0" />} />
              <Route component={HomeContent} />
            </Route>
            <Route path="/issue">
              <Route render={() => <Header current="1" />} />
              <Layout id="Issue">
                <Route component={IssueSider} />
                <Route exact path="/issue" component={Hi} />
                <Route path="/issue/hello" component={Hello} />
              </Layout>
            </Route>
            <Route path="/plan">
              <Route render={() => <Header current="2" />} />
            </Route>
            <Route path="/notice">
              <Route render={() => <Header current="3" />} />
            </Route>
            <Route path="/auth/login">
              <Route component={Header} />
              <Route component={UserLogin} />
            </Route>
            <Route path="/join">
              <Route component={Header} />
              <Route component={UserJoin} />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </ErrorBoundary>
    </Layout>
  );
}

export default App;
