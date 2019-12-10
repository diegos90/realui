import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
        <Grid container
        direction="column"
        alignItems="center"
        justify="center" spacing={2}>
            <Grid item xs />
            <Grid item xs={12} md={6}>
              <Paper className={classes.root}>
                <PaymentCard
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
                />
                <div>
                <TextField
                    id="outlined-name"
                    label="Amount"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    contentEditable={false}
                    value={props.bookingInfo.price}
                />
                </div>
                <div>
                <TextField
                    id="outlined-name"
                    label="Card Number"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    onFocus={flipToFront}
                    onChange={handleCardNumberInput}
                    inputProps={{ maxLength: 16 }}
                />
                <TextField
                    id="outlined-name"
                    label="Expiry Date"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    onFocus={flipToFront}
                    onChange={handleCardExpiryDateInput}
                    inputProps={{ maxLength: 5, pattern: "[0-9]" }}
                />
                </div>
                <div>
                <TextField
                    id="outlined-name"
                    label="Card Holder"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    onFocus={flipToFront}
                    onChange={handleCardHolderNameInput}
                />
                <TextField
                    id="outlined-name"
                    label="CVV"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    onFocus={flipToBack}
                    onChange={handleCardCVVInput}
                    inputProps={{ maxLength: 3 }}
                />
                </div>
                </Paper>
            </Grid>
            <Grid item xs />  
        </Grid>
  );
}

export default Payment;
