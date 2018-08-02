require('normalize.css');
require('./styles/index.less');
import * as React from 'react';
import {render} from 'react-dom';
import Login from './containers/login/login';
import Main from './containers/main/main';
import { AppContainer } from 'react-hot-loader';
import {createStore,applyMiddleware} from 'redux';
import { Provider} from 'react-redux';
import  thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';
import {Route,Switch,BrowserRouter} from 'react-router-dom';
const store=createStore(reducers,applyMiddleware(thunk),applyMiddleware(logger));


class App extends React.Component{
    public render():JSX.Element{
        return(
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/index" component={Main} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}

render(
    <AppContainer>
        <App />
    </AppContainer>
,document.getElementById("app"));

if ((module as any).hot) {
    (module as any).hot.accept();
}