import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import EventCard from '../../components/EventCard'
import Topbar from '../../components/Topbar';
import axios from 'axios';

const numeral = require('numeral');
numeral.defaultFormat('0,000');

const backgroundShape = require('../../images/mainBackground.png');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    opacity: 0.75,
    backgroundSize: 'cover',
    paddingBottom: 200,
  }
});

class GigGuide extends Component {

  state = {
    events: []
  };

  componentDidMount() {
    
  }

  cutDescription = (desc) => {
      return desc.substring(0,189) + "..."
  }

  cutTitle = (title) => {
    if(title.length < 30)
        return title
    else
        return title.substring(0,30) + "..."
  }

  render() {
    const { classes } = this.props;
    const currentPath = this.props.location.pathname

    

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath="/gigguide" />
        <div className={classes.root}>
          <Grid container justify="center">
            
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(GigGuide));
