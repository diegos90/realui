import React, {useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

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
    },
    paymentButton:{
      width: '100%'
    }
  }));

function Payment(props) {
  const classes = useStyles();
  const [saleId, setSaleId] = useState(null);

  const click_e7773ab5244c47e4781146f01ca155b3 = aform_reference => {
    var aform = aform_reference;
    aform['amount'].value = Math.round( aform['amount'].value*Math.pow( 10,2 ) )/Math.pow( 10,2 );
  }

  const recordPayment = async () => {
    console.log(props.bookingInfo)
    await axios.post('https://nite-life-d891a.firebaseio.com/sales/'+props.bookingInfo.type+'.json', { ...props.bookingInfo })
        .then(res => {
          console.log(res.data.name)
          if(!saleId)
            setSaleId(res.data.name)
    })
  }

  return (
        <Grid container
        direction="column"
        alignItems="center"
        justify="center" spacing={2}>
            <Grid item xs />
            <Grid item xs={12} md={6}>
              <Paper className={classes.root}>
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
                

                <form action="https://sandbox.payfast.co.za/eng/process" name="form_e7773ab5244c47e4781146f01ca155b3" method="post">
                  <input type="hidden" name="cmd" value="_paynow" />
                  <input type="hidden" name="receiver" value="10009597" />
                  <input type="hidden" name="item_name" value="NiteLifePartyTrip" />
                  <input type="hidden" name="amount" value={props.bookingInfo.price} />
                  <input type="hidden" name="item_description" value="" />
                  <input type="hidden" name="return_url" value={"https://www.nitelifepartycabs.co.za/#/paymentsuccess?type="+props.bookingInfo.type+"&id="+saleId} />
                  <input type="hidden" name="cancel_url" value="https://www.nitelifepartycabs.co.za/#/paymentcancelled" />
                  <input type="hidden" name="notify_url" value={"https://us-central1-nite-life.cloudfunctions.net/api/recordpayment?type="+props.bookingInfo.type+"&id="+saleId} />
                  
                  <table className={classes.paymentButton}>
                    <tbody>
                      <tr>
                        <td colSpan={2} align="center"><input type="image" src="https://www.payfast.co.za/images/buttons/light-small-paynow.png"  onClick={recordPayment()} width="165" height="36" alt="Pay Now" title="Pay Now with PayFast"/></td>
                      </tr>
                    </tbody>
                  </table>
                </form>


                </div>
                
                </Paper>
            </Grid>
            <Grid item xs />  
        </Grid>
  );
}

export default Payment;
