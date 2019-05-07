import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { store } from './_helpers';
import { App } from './App';
import './index.css'
import 'typeface-roboto'

const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#54AAB3",
        contrastText: '#fff'
      }
    }
  });

render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);