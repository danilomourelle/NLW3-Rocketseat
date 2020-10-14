import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/app" component={OrphanagesMap} />
        <Route exact path="/orphanage/:id" component={Orphanage} />
        <Route exact path="/orphanage/create" component={CreateOrphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes
