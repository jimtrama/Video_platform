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
function App() {
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
                    <Route path='*' component={FourOFour} />

                </Switch>
            </div>
        </HashRouter>
    );
}

export default App;
