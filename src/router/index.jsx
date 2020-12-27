import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import routes from './routes'
import { NotFound } from 'lightflick/components'

const Router = () => (
  <BrowserRouter>
    <Switch>
      {routes.map((route, index) => (
        <Route exact key={index} path={route.path}>
          {route.redirect ? <Redirect to={route.redirect} /> : <Route component={route.component} />}
        </Route>
      ))}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default Router
