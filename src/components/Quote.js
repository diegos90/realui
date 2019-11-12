import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
    price: {
      color: '#d32f2f'
    }
  }));
  

  function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  
      const negativeSign = amount < 0 ? "-" : "";
  
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
  
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
  };


function Quote(props) {
  const classes = useStyles();
  const [quote, setQuote] = React.useState({});
  const [show, setShow] = React.useState(false);


  useEffect(() => {
    console.log(props.bookingInfo)
    getBookingQuote(props.bookingInfo);
  }, []);

  const getBookingQuote = async (bookingInfo) => {
    let recievedQuote = {}
    await axios.post(`https://us-central1-nite-life.cloudfunctions.net/api/gettripprice`, { 'bookingInfo' : bookingInfo })
        .then(res => {
          recievedQuote = res.data
          setQuote(recievedQuote)
          setShow(true)
        })

    
    
    console.log("QUOTE: "+quote)
  }


  return (
        <Grid container
          direction="column"
          alignItems="center"
          justify="center" spacing={2}>
            <Grid item xs />
            <Grid item xs={12} md={6}>
            {show ? (
                        <Paper className={classes.root}>
                        <Typography variant="h5" component="h3">
                          Your Party Cab quote is: 
                        </Typography>
                        <Typography component="p">
                          Billed to: {props.bookingInfo.name}
                        </Typography>
                        <Typography component="p">
                          Email: {props.bookingInfo.email}
                        </Typography>
                        <Typography component="p">
                          Departure: {quote.departureTrip.distance}
                        </Typography> 
                        <Typography component="p">
                          Return: {quote.returnTrip.distance}
                        </Typography>
                        <Typography variant="h4" component="h3" className={classes.price}>
                        R {formatMoney(quote.price)}
                        </Typography>
                    </Paper>
                          ) : (
                          <CircularProgress />
            )}
                
            </Grid>
            <Grid item xs />  
        </Grid>
  );
}

export default Quote;
