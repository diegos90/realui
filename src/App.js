import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Routes from './routes'
import { blue, red } from '@material-ui/core/colors'
//import {BookingProvider} from './context/BookingContext'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: red[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});

const booking = {}


class App extends Component {

  render() {
    return (
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>
    );
  }
}

export default App;
