//test
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom'
import LoginPage from './Pages/Login/Login'
import RegisterPage from './Pages/Register/Register'
import DashboardPage from './Pages/Dashboard/Dashboard'
import ForgotPassPage from './Pages/ForgotPass/ForgotPass'
import SettingsPage from './Pages/Settings/Settings'
import VideosPage from './Pages/Videos/Videos'
import ProtectedRoute from './ProtectedRoute';
import FourOFour from './Pages/FourOFour/FourOFour'
import Video from './Pages/Video/Video'
import { useSelector } from 'react-redux';
import auth from './Auth';
function App() {
    let user = useSelector(state => state.persistedStore.success)
    if (user) {
        auth.logIn();
    }
    return (
        <HashRouter basename='/'>
            <div className="App">
                <Switch>
                    <Route exact path='/' component={LoginPage} />
                    <Route exact path='/register' component={RegisterPage} />
                    <ProtectedRoute exact path='/dashboard' Compoent={DashboardPage} />
                    <Route exact path='/passrecovery' component={ForgotPassPage} />
                    <ProtectedRoute exact path='/settings' Compoent={SettingsPage} />
                    <ProtectedRoute exact path='/videos' Compoent={VideosPage} />
                    <Route exact path='/video' component={Video} />
                    <Route path='*' component={FourOFour} />

                </Switch>
            </div>
        </HashRouter>
    );
}

export default App;
