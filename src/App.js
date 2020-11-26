import { ConnectedRouter } from 'connected-react-router';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Switch } from 'react-router-dom';
import { history } from './redux/create';
import ErrorPage from './pages/ErrorPage';
import UserLogin from './pages/UserLogin';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import { Layout } from 'antd';
import Header from './pages/header/Header';
import 'antd/dist/antd.css';
import './styles/common.scss';

function App() {
  return (
    <Layout>
      <ErrorBoundary Error={ErrorPage}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/">
              <Route render={() => <Header current="0" />} />
              <Route component={Home} />
            </Route>
            <Route path="/issue">
              <Route render={() => <Header current="1" />} />
            </Route>
            <Route path="/plan">
              <Route render={() => <Header current="2" />} />
            </Route>
            <Route path="/notice">
              <Route render={() => <Header current="3" />} />
            </Route>
            <Route path="/auth/login" component={UserLogin} />
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </ErrorBoundary>
    </Layout>
  );
}

export default App;
