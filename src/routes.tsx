import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Index'
import Profile from './pages/Profile'
import Collection from './pages/Profile/collection'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route path="/profile/:user" render={(props) => <Profile {...props} />} exact />
            <Route path="/profile/:user/:collection" render={(props) => <Collection {...props} />} exact />
        </BrowserRouter>
    )
}

export default Routes