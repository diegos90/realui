import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Months from '../../components/common/Months';
import axios from 'axios';
import Link from '@material-ui/core/Link';
import Topbar from '../../components/Topbar';

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
  },
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  loadingState: {
    opacity: 0.05
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    margin: 30,
    backgroundColor: '#f5f6f7'
  },
  paperHeader: {
    padding: theme.spacing.unit * 3,
    backgroundColor: '#fff'
  },
  clientLogo: {
    display: 'block',
    width: 60,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 20
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 2
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152,
    height: 36
  },
  blockCenter: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2,
  },
  loanAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  interestAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    display: 'flex'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  mainBadge: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4
  }
});



class PaymentCancelled extends Component {

  state = {
    clients: [],
    contactDetails: {}
  };

 

  componentDidMount() {
    axios.get('https://nite-life-d891a.firebaseio.com/clientlogos.json')
      .then((response) => {
        // handle success
        let arr = []
        Object.keys(response.data).forEach(function (item) {
            response.data[item].id = item
            arr.push(response.data[item])
        });
        this.setState({clients: arr})
        console.log(this.state.clients)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })


      axios.get('https://nite-life-d891a.firebaseio.com/contactDetails.json')
      .then((response) => {
        // handle success

        this.setState({contactDetails: response.data})
        console.log(this.state.contactDetails)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      
  }

  render() {
    const { classes } = this.props;
    const currentPath = this.props.location.pathname
    const clientList = this.state.clients.map((client) => 
      <img src={client.url} className={classes.clientLogo} key={client.id} alt=""/>
    )

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid item md={6}>
            <Paper className={classes.paper}>
                <Paper className={classes.paperHeader}>
                  <Typography variant="h5" component="h3" align="center">
                    Unfortunately, your payment was cancelled.
                  </Typography>
                </Paper>
                <Grid container justify="center">
                  <Grid item md={8}>
                  <Typography variant="h7" component="p" align="center">
                    Contact us if you need any assistance with your booking.
                  </Typography>
                  <Typography component="p" align="center">
                    {this.state.contactDetails.phone}
                  </Typography>
                  <Typography component="p" align="center">
                    {this.state.contactDetails.email}
                  </Typography>
                  <Typography variant="h7" component="p" align="center">
                    Visit our <Link href="#/gigguide">GigGuide</Link> for a listing of our ParkNRide services. Visit <Link href="#/booknow">Book Now</Link> to book one of our party cabs.
                  </Typography>
                  </Grid>
                </Grid>
              </Paper>
             </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(PaymentCancelled));
