import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PaymentCard from 'react-payment-card-component';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
  }));
  

function Payment(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    email: ''
  });


  return (
        <Grid container container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center" spacing={2}>
            <Grid item xs />
            <Grid item xs={6}>
                <Paper className={classes.root}>
                <div>
                {/*<PaymentCard
                  bank="itau"
                  model="personnalite"
                  type="black"
                  brand="mastercard"
                  number="4111111111111111"
                  cvv="202"
                  holderName="Owen Lars"
                  expiration="12/20"
                  flipped={false}
                />*/}
                <TextField
                    id="outlined-name"
                    label="Card Number"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth={false}
                />
                <TextField
                    id="outlined-name"
                    label="Expiry Date"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth={false}
                />
                </div>
                <div>
                <TextField
                    id="outlined-name"
                    label="Card Holder"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth={false}
                />
                <TextField
                    id="outlined-name"
                    label="CVV"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth={false}
                />
                </div>
                </Paper>
            </Grid>
            <Grid item xs />  
        </Grid>
  );
}

export default Payment;
