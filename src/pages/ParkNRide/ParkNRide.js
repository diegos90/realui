import React, {useEffect} from 'react';
import { makeStyles  } from '@material-ui/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BookingInfo from '../../components/BookingInfo';
import ParkNRideQuote from '../../components/ParkNRideQuote';
import Payment from '../../components/Payment';
import Topbar from '../../components/Topbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import ParkNRideInfo from '../../components/ParkNRideInfo';
import axios from 'axios';
import queryString from 'query-string';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
  navigationButtons: {
    backgroundColor: 'green'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
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
  trailerRequired: true,
  event: {},
  event_id: "",
  selectedDeparture: "",
  selectedReturn: "",
  numberOfPeople: 1,
  type: 'parknride',
  termsAndConditionsChecked: null
}

function getSteps() {
  return ['ParkNRide Information', 'Quotation', 'Make Payment'];
}


export default function ParkNRide(props) {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [skipped, setSkipped] = React.useState(new Set());

 

  useEffect(() => async () => {
    let params = queryString.parse(props.location.search)
    parkNRideInfo.event_id = queryString.parse(props.location.search).event_id
    await getEventInfo(params.event_id)
  });

  const getEventInfo = async (event_id) => {
    let event = {}
    await axios.get('https://nite-life-d891a.firebaseio.com/events/'+event_id+'.json')
        .then(res => {
          event = res.data
          //setQuote(recievedQuote)
          //setShow(true)
        })
    parkNRideInfo.event = event
  }

  async function recordPayment(){
    console.log(parkNRideInfo)
    await axios.post(`https://nite-life-d891a.firebaseio.com/sales/parknride.json`, { ...parkNRideInfo })
        .then(res => {
          console.log("done")
        })
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
          let params = queryString.parse(props.location.search)
          getEventInfo(params.event_id)
          parkNRideInfo.event_id = params.event_id
          return <ParkNRideInfo bookingInfo={parkNRideInfo}/>;
      case 1:   
          return <ParkNRideQuote bookingInfo={parkNRideInfo} />;
      case 2:
        return <Payment bookingInfo={parkNRideInfo} />;
      default:
        return 'Unknown step';
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const nextButtonContent = ["Make Booking", "Make Payment", "Next..."]
  const steps = getSteps();

  function isStepSkipped(step) {
    return skipped.has(step);
  }

  function handleNext() {
    if(parkNRideInfo.termsAndConditionsChecked !=true)
      handleOpen()
    else{
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
    <Topbar currentPath="/parknride" />
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

        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title"></h2>
            <p id="transition-modal-description">Please indicate that you have read and agree to the terms and conditions</p>
          </div>
        </Fade>
      </Modal>
        </div>
    </React.Fragment>
    )
}
