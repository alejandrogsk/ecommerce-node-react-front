import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import "./main.css"
import { ThemeProvider } from '@material-ui/core/styles';
import {customeTheme} from './components/ui/theme';
import AppRoutes from './routes/AppRoutes';

import { PersistGate } from 'redux-persist/integration/react'
import  {store, persistor}  from './redux/store/store';

ReactDOM.render(

  <ThemeProvider theme={customeTheme}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
    </ThemeProvider>,
  
  document.getElementById('root')
);


