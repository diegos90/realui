import React from 'react';
import { makeStyles  } from '@material-ui/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BookingInfo from '../../components/BookingInfo';
import Quote from '../../components/Quote';
import Payment from '../../components/Payment';
import Topbar from '../../components/Topbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';

const backgroundShape = require('../../images/mainBackground.png');

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    
    },
  booking: {
    width: '50%',
    margin:'0 auto', 
    borderRadius: 10,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    marginTop: 20
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  informationForm:{
    backgroundColor: 'white',
  }
}));

const bookingInfo = {
  name: '',
  email: '',
  cellNumber: '',
  departureDate: null,
  departureTime: null,
  departurePickUpLocation: {},
  departureDropOffLocation: {},
  returnDate: null,
  returnTime: null,
  returnPickUpLocation: {},
  returnDropOffLocation: {},
  vehicleType: '',
  trailerRequired: null,
  type: 'booknow',
  termsAndConditionsChecked: null
}

function getSteps() {
  return ['Booking Information', 'Quotation', 'Make Payment'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
        return <BookingInfo bookingInfo={bookingInfo}/>;
    case 1:   
        return <Quote bookingInfo={bookingInfo} />;
    case 2:
      return <Payment bookingInfo={bookingInfo}/>;
    default:
      return 'Unknown step';
  }
}


export default function Booking() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const nextButtonContent = ["Generate Quote", "Make Payment"]
  const steps = getSteps();

  function isStepSkipped(step) {
    return skipped.has(step);
  }

  function handleNext() {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if(activeStep === steps.length - 1)
      recordPayment()
      
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }


  function handleReset() {
    setActiveStep(0);
  }

  async function recordPayment(){
    console.log(bookingInfo)
    await axios.post(`https://nite-life-d891a.firebaseio.com/sales/booknow.json`, { ...bookingInfo })
        .then(res => {
          console.log("done")
        })
  }
  
  return (
    <React.Fragment>
    <CssBaseline />
    <Topbar currentPath="/booknow" />
    <div className={classes.root}>
      <div className={classes.booking} >
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              <center>Payment Completed <span role="img" aria-label="Smiley Face">&#128519;</span></center>
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div style={{backgroundColor:'white', padding: 20}}>
           {getStepContent(activeStep)}
           <center>
            <div style={{ marginTop: 30}}>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                >
                {activeStep === steps.length - 1 ? 'Finish' : nextButtonContent[activeStep]}
              </Button>
            </div>
            </center>
          </div>
        )}
      </div>
        </div>
        </div>
    </React.Fragment>
    )
}
