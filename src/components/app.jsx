import React, { useState, useEffect } from 'react';

import {
  f7,
  f7ready,
  App,
  View,
} from 'framework7-react';


import routes from '../js/routes';
import store from '../js/store';

const MyApp = () => {
  const baseUrl = import.meta.env.BASE_URL;


  // Framework7 Parameters
  const f7params = {
    name: 'SN AI Summit', // App name
      theme: 'auto', // Automatic theme detection




      // App store
      store: store,
      // App routes
      routes: routes,

      // Register service worker (only on production build)
      serviceWorker: import.meta.env.PROD ? {
        path: `${baseUrl}service-worker.js`,
      } : {},
  };

  f7ready(() => {


    // Call F7 APIs here
  });

  return (
    <App { ...f7params }>

        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/" />

    </App>
  );
}
export default MyApp;