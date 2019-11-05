import React from 'react';
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

const backgroundShape = require('../../images/mainBackground.png');

const useStyles = makeStyles => (theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    opacity: 0.75,
    backgroundSize: 'cover',
    paddingBottom: 200,
  },
  booking: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const parkNRideInfo = {
  name: '',
  email: '',
  cellNumber: '',
  departureDate: Date(),
  departureTime: Date(),
  departurePickUpLocation: {},
  departureDropOffLocation: {},
  returnDate: Date(),
  returnTime: Date(),
  returnPickUpLocation: {},
  returnDropOffLocation: {},
  vehicleType: '',
  trailerRequired: true
}

function getSteps() {
  return ['kjhgkjgkjgkjgkjgkjg Booking Information', 'Quotation', 'Make Payment'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
        return <BookingInfo bookingInfo={parkNRideInfo}/>;
    case 1:   
        return <Quote bookingInfo={parkNRideInfo} />;
    case 2:
      return <Payment />;
    default:
      return 'Unknown step';
  }
}


export default function ParkNRide() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const nextButtonContent = ["Make Booking", "Make Payment", "Next..."]
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
      
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }


  function handleReset() {
    setActiveStep(0);
  }

  
  return (
    <React.Fragment>
    <CssBaseline />
    <Topbar currentPath="/booknow" />
    <div className={classes.root}>
      <div className={classes.booking}>
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
          <div>
           {getStepContent(activeStep)}
            <div>
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
          </div>
        )}
      </div>
        </div>
        </div>
    </React.Fragment>
    )
}
