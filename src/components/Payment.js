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
    textField: {
      margin: 3
    },
    creditCard:{
      margin: 'auto',
      marginBottom: 7
    }
  }));
  

function Payment(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    email: '',
  });

  const [flipped, setFlippedState] = React.useState(false)
  const [cardNumber, setCardNumber] = React.useState("4111111111111111")
  const [cardExpiryDate, setCardExpiryDate] = React.useState("12/20")
  const [cardHolderName, setCardHolderName] = React.useState("Name Surname")
  const [cardCVV, setCardCVV] = React.useState("202")

  const flipToFront = () =>{
    setFlippedState(false)
  }

  const flipToBack = () => {
    setFlippedState(true)
  }

  const handleCardNumberInput = event => {
    setCardNumber(event.target.value)
  }
  const handleCardExpiryDateInput = event => {
    setCardExpiryDate(event.target.value)
  }
  const handleCardHolderNameInput = event => {
    setCardHolderName(event.target.value)
  }

  const handleCardCVVInput = event => {
    setCardCVV(event.target.value)
  }

  return (
        <Grid container container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center" spacing={2}>
            <Grid item xs />
            <Grid item xs={6}>
              <Paper className={classes.root}>
                {/*<PaymentCard
                className={classes.creditCard}
                  bank="default"
                  model="personnalite"
                  type="black"
                  brand="mastercard"
                  number={cardNumber}
                  cvv={cardCVV}
                  holderName={cardHolderName}
                  expiration={cardExpiryDate}
                  flipped={flipped}
                />*/}
                
               
                
                </Paper>
            </Grid>
            <Grid item xs />  
        </Grid>
  );
}

export default Payment;
