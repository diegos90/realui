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
  }));
  
  const price = df => {
     setTimeout(()=>{ "ddd"},5000)
  }


function Quote(props) {
  const classes = useStyles();
  const [quote, setQuote] = React.useState({});
  const [show, setShow] = React.useState(false);


  useEffect(() => {
    getBookingQuote(props.bookingInfo);
  }, []);

  const getBookingQuote = async (bookingInfo) => {
    let recievedQuote = {}
    await axios.post(`http://localhost:5000/nite-life/us-central1/api/gettripprice`, { 'bookingInfo' : bookingInfo })
        .then(res => {
          console.log("BLUE");
          console.log(res.data);
          recievedQuote = res.data
          setQuote(recievedQuote)
          setShow(true)
        })

    
    
    console.log("QUOTE: "+quote)
  }


  return (
        <Grid container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center" spacing={2}>
            <Grid item xs />
            <Grid item xs={6}>
            {show ? (
                        <Paper className={classes.root}>
                        <Typography component="p">
                        Your quote for park and Ride Service on DATE is: {props.bookingInfo.name}
                        </Typography>
                        <Typography variant="h5" component="h3">
                        R {quote.price}
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
