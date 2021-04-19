//test
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom'
import LoginPage from './Login/index'
import RegisterPage from './Register/index'
import DashboardPage from './Dashboard/index'
import ForgotPassPage from './ForgotPass/index'
import SettingsPage from './Settings/index'
import VideosPage from './Videos'
function App() {
    return (
        <HashRouter basename='/'>
            <div className="App">
                <Switch>
                    <Route exact path='/' component={LoginPage} />
                    <Route exact path='/register' component={RegisterPage} />
                    <Route exact path='/dashboard' component={DashboardPage} />
                    <Route exact path='/passrecovery' component={ForgotPassPage} />
                    <Route exact path='/settings' component={SettingsPage} />
                    <Route exact path='/videos' component={VideosPage} />

                </Switch>
            </div>
        </HashRouter>
    );
}

export default App;
