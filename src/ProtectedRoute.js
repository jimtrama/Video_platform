import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import auth from './Auth';
function ProtectedRoute({ Compoent, ...rest }) {
    if (auth.isAuthed()) {
        return (
            <Route  {...rest} render={(props) => (
                <Compoent  {...props} />
            )} />
        )
    } else {
        return (
            <Redirect to={{ pathname: "/" }} />
        )
    }

}

export default ProtectedRoute;