import React, { useEffect } from 'react';
import { makeStyles  } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/Room';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors'
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';


const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '90%',
      display: 'block'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: '90%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    textFieldTravelInfo: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '90%',
    },
    selectTravelInfo: {
      marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: 200,
        display: 'inline'
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
    selectOption: {
      display: 'inline',
      alignItems: 'center',
      paddingRight: 20,
      color: red[700],
      fontWeight: 'bold'
    },
    selectOptionIcon: {
      display: 'inline',
      alignItems: 'center',
      verticalAlign: 'bottom',
      color: red[700],
      paddingLeft: 10
    },
    selectOptionButton: {
      fontWeight: 'bold'
    }
   
  }));

  


function ParkNRideInfo(props) {
  const classes = useStyles();
  //const inputLabel = React.useRef(null);
  const [values, setValues] = React.useState({
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
    selectedDeparture: "",
    selectedReturn: "",
    numberOfPeople: 1
  });

  let [event, setEvent] = React.useState({});
  const [show, setShow] = React.useState(false);

  const getEventInfo = async (event_id) => {
    let e = {}
    await axios.get('https://nite-life-d891a.firebaseio.com/events/'+event_id+'.json')
        .then(res => {
          e= res.data
          setEvent(e)
          event = e
          setShow(true)
        })
  }

  useEffect(() => {
    getEventInfo(props.bookingInfo.event_id)
  }, []);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    props.bookingInfo[name] = event.target.value;
  };

  const handleDepartureSelect = e => {
    props.bookingInfo["selectedDeparture"] = e.target.value;
    setValues({ ...values, ['selectedDeparture']: e.target.value });
    console.log(values.selectedDeparture);
  }

  const handleReturnSelect = e => {
    props.bookingInfo["selectedReturn"] = e.target.value;
    setValues({ ...values, ['selectedReturn']: e.target.value });
    console.log(props.bookingInfo.selectedReturn);
  }



  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {show ? (
        <Grid container  alignContent='center'>
        
            <Grid item xs={12} md={6}>
            <header>Billing Information</header>
                <TextField
                    id="outlined-name"
                    label="Name"
                    className={classes.textField}
                    value={props.bookingInfo.name}
                    onChange={handleChange('name')}
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                />
                <TextField
                    id="outlined-name"
                    label="Email"
                    className={classes.textField}
                    value={props.bookingInfo.email}
                    onChange={handleChange('email')}
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                />
                <TextField
                    id="outlined-name"
                    label="Cell Number"
                    className={classes.textField}
                    value={props.bookingInfo.cellNumber}
                    onChange={handleChange('cellNumber')}
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    inputProps={{ maxLength: 13 }}
                    
                    
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <header>ParkNRide Information</header>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel  htmlFor="outlined-name">
                    Departure
                  </InputLabel>
                  <Select
                    label="Time"
                    value={props.bookingInfo.selectedDeparture}
                    onChange={handleDepartureSelect}
                    input={<OutlinedInput name="vehicleType" id="outlined-name" />}
                    
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                        event.tripOptions.departures.map((key, index) => 
                    <MenuItem key={index} value={key}>
                        <Paper>
                          <Button variant="contained" color="primary" className={classes.selectOptionButton}>
                          <AccessTimeIcon className={classes.extendedIcon}/> &nbsp;{key.datetime}
                          </Button>
                          <Typography component="p" className={classes.selectOptionIcon}>
                            <LocationOnIcon />
                          </Typography>
                          <Typography component="p" className={classes.selectOption}>
                          {key.location}
                          </Typography>
                        </Paper>
                    </MenuItem>
                    )}
                  </Select>
                </FormControl>
                
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel  htmlFor="outlined-name">
                    Return
                  </InputLabel>
                  <Select
                    label="Time"
                    value={props.bookingInfo.selectedReturn}
                    onChange={handleReturnSelect}
                    input={<OutlinedInput name="vehicleType" id="outlined-name" />}
                    
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                        event.tripOptions.returns.map((key, index) => 
                    <MenuItem key={index} value={key}>
                        <Paper>
                          <Button variant="contained" color="primary" className={classes.selectOptionButton}>
                          <AccessTimeIcon className={classes.extendedIcon}/> &nbsp;{key.datetime}
                          </Button>
                          <Typography component="p" className={classes.selectOptionIcon}>
                            <LocationOnIcon />
                          </Typography>
                          <Typography component="p" className={classes.selectOption}>
                          {key.location}
                          </Typography>
                        </Paper>
                    </MenuItem>
                    )}
                    
                  </Select>
                </FormControl>
               
                
                  <TextField
                    id="numberOfPeople"
                    label="Number of People"
                    className={classes.textField}
                    value={values.numberOfPeople}
                    onChange={handleChange('numberOfPeople')}
                    margin="normal"
                    variant="outlined"
                    type="number"
                    inputProps={{min: 1}}
                    fullWidth={true}
                />
                
            </Grid>
            
        </Grid>
        ) : (
          <center><CircularProgress /></center>
        )}
        </MuiPickersUtilsProvider>
  );
}

export default ParkNRideInfo;
