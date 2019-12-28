import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

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

  const click_e7773ab5244c47e4781146f01ca155b3 = aform_reference => {
    var aform = aform_reference;
    aform['amount'].value = Math.round( aform['amount'].value*Math.pow( 10,2 ) )/Math.pow( 10,2 );
  }

  return (
        <Grid container
        direction="column"
        alignItems="center"
        justify="center" spacing={2}>
            <Grid item xs />
            <Grid item xs={12} md={6}>
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

                <form action="https://www.payfast.co.za/eng/process" name="form_e7773ab5244c47e4781146f01ca155b3" onsubmit="return click_e7773ab5244c47e4781146f01ca155b3( this );" method="post">
                  <input type="hidden" name="cmd" value="_paynow" />
                  <input type="hidden" name="receiver" value="10200108" />
                  <input type="hidden" name="item_name" value="Trip2" />
                  <input type="hidden" name="amount" value={props.bookingInfo.price} />
                  <input type="hidden" name="item_description" value="" />
                  <input type="hidden" name="return_url" value="https://www.nitelifepartycabs.co.za/#/paymentsuccess" />
                  <input type="hidden" name="cancel_url" value="https://www.nitelifepartycabs.co.za/#/paymentcancelled" />
                  
                  <table>
                    <tr>
                      <td colspan={2} align="center"><input type="image" src="https://www.payfast.co.za/images/buttons/light-small-paynow.png" width="165" height="36" alt="Pay Now" title="Pay Now with PayFast"/></td>
                    </tr>
                  </table>
                </form>


                
                
                </Paper>
            </Grid>
            <Grid item xs />  
        </Grid>
  );
}

export default Payment;
