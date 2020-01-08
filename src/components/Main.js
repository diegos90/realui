import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Topbar from './Topbar';
import axios from 'axios';
import FeedItemCard from './FeedItemCard'

const backgroundShape = require('../images/mainBackground.png');

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    paddingBottom: 200,
  },
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 2
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152
  },
  blockCenter: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2,
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    display: 'flex'
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  loadingState: {
    opacity: 0.05
  },
  loadingMessage: {
    position: 'absolute',
    top: '40%',
    left: '40%'
  }
});

class Main extends Component {

  state = {
    feeds: [],
    events: []
  };

  componentDidMount() {
    axios.get('https://nite-life-d891a.firebaseio.com/feed.json')
      .then((response) => {
        // handle success
        let arr = []
        Object.keys(response.data).forEach(function (item) {
            response.data[item].id = item
            arr.push(response.data[item])
        });
        this.setState({feeds: arr})
        console.log(this.state.feeds)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

      axios.get('https://nite-life-d891a.firebaseio.com/events.json')
      .then((response) => {
        // handle success
        let arr = []
        Object.keys(response.data).forEach(function (item) {
            response.data[item].id = item
            arr.push(response.data[item])
        });
        this.setState({events: arr})
        console.log(this.state.events)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  render() {
    const { classes } = this.props;
    const feedList = this.state.feeds.map((feed) => 
    <Grid container justify="center" key={feed.id}>
      <Grid item xs />
      <Grid item xs={12} md={6} justify="center" container>
        <FeedItemCard mediaUrl={feed.mediaUrl} mediaType={feed.mediaType} description={feed.description} title={feed.title}/>
      </Grid>
      <Grid item xs />
    </Grid>
    );
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
            {feedList}
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Main));
