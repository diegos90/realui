import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Months from '../../components/common/Months';
import "./Gallery.css";
import ImageGallery from 'react-image-gallery';
import axios from 'axios';
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
    color: theme.palette.text.secondary
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

const monthRange = Months;

class Gallery extends Component {

  state = {
    images: []
  };

  updateValues() {
    const { amount, period, start } = this.state;
    const monthlyInterest = (amount)*(Math.pow(0.01*(1.01), period))/(Math.pow(0.01, period - 1))
    const totalInterest = monthlyInterest * (period + start);
    const totalPayment = amount + totalInterest;
    const monthlyPayment = period > start ? totalPayment/(period - start) : totalPayment/(period)

    const data = Array.from({length: period + start}, (value, i) => {
      const delayed = i < start;
      return {
        name: monthRange[i],
        'Type': delayed ? 0 : Math.ceil(monthlyPayment).toFixed(0),
        'OtherType': Math.ceil(monthlyInterest).toFixed(0)
      }
    })

    this.setState({monthlyInterest, totalInterest, totalPayment, monthlyPayment, data})
  }

  componentDidMount() {
    this.updateValues();
    axios.get('https://nite-life-d891a.firebaseio.com/gallery-images.json')
      .then((response) => {
        // handle success
        let arr = []
        Object.keys(response.data).forEach(function (item) {
            response.data[item].id = item
            response.data[item].original = response.data[item].url
            response.data[item].thumbnail = response.data[item].url
            arr.push(response.data[item])
        });
        this.setState({images: arr})
        console.log(this.state.images)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    
  }

  render() {
    const { classes } = this.props;
    const currentPath = this.props.location.pathname;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center">
            
            <Grid item xs />
            <Grid item xs={3} md={3} lg={3} justify="center" container>
              <ImageGallery className={classes.paper} width={100} sizes={"(min-width: 400px) 400px, 100vw"} items={this.state.images} />
            </Grid>
            <Grid item xs />
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Gallery));
