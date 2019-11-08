import React from 'react';
import { makeStyles  } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/Room';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors'

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MUIPlacesAutocomplete, { geocodeByPlaceID } from 'mui-places-autocomplete';


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
    trailerRequired: null
  });


  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    props.bookingInfo[name] = event.target.value;
  };

  const handleDateInput = name => event => {
    setValues({ ...values, [name]: event });
    props.bookingInfo[name] = event;
  }

  const handleTimeInput = name => event => {
    setValues({ ...values, [name]: event });
    props.bookingInfo[name] = event;
  }

  const handleVehicleTypeSelect = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    props.bookingInfo['vehicleType'] = event.target.value;
  }

  const handleTrailerRequiredChecked = name => event => {
    setValues({ ...values, [name]: event.target.checked });
    props.bookingInfo[name] = event.target.checked;
  };

  const onSuggestionSelectedDeparturePickUp = suggestion => {
      geocodeByPlaceID(suggestion.place_id).then((results) => {
        const { geometry } = results[0]
        values.departurePickUpLocation.description = suggestion.description;
        values.departurePickUpLocation.lat = geometry.location.lat();
        values.departurePickUpLocation.lng = geometry.location.lng();

        props.bookingInfo.departurePickUpLocation.description = suggestion.description;
        props.bookingInfo.departurePickUpLocation.lat = geometry.location.lat();
        props.bookingInfo.departurePickUpLocation.lng = geometry.location.lng();

    }).catch((err) => {
        console.log(err)
      })
  }

  const onSuggestionSelectedDepartureDropOff = suggestion => {
    geocodeByPlaceID(suggestion.place_id).then((results) => {
      const { geometry } = results[0]      
      values.departureDropOffLocation.description = suggestion.description;
      values.departureDropOffLocation.lat = geometry.location.lat();
      values.departureDropOffLocation.lng = geometry.location.lng();

      props.bookingInfo.departureDropOffLocation.description = suggestion.description;
      props.bookingInfo.departureDropOffLocation.lat = geometry.location.lat();
      props.bookingInfo.departureDropOffLocation.lng = geometry.location.lng();

      //RETURN PICKUP:
      onSuggestionSelectedReturnPickUp(suggestion)

    }).catch((err) => {
      console.log(err)
    })
  }


  const onSuggestionSelectedReturnPickUp = suggestion => {
    console.log(suggestion)
    geocodeByPlaceID(suggestion.place_id).then((results) => {

      const { geometry } = results[0]
      
      values.returnPickUpLocation.description = suggestion.description;
      values.returnPickUpLocation.lat = geometry.location.lat();
      values.returnPickUpLocation.lng = geometry.location.lng();

      props.bookingInfo.returnPickUpLocation.description = suggestion.description;
      props.bookingInfo.returnPickUpLocation.lat = geometry.location.lat();
      props.bookingInfo.returnPickUpLocation.lng = geometry.location.lng();

    }).catch((err) => {
      console.log(err)
    })
  }


  const onSuggestionSelectedReturnDropOff = suggestion => {
    console.log(suggestion)
    geocodeByPlaceID(suggestion.place_id).then((results) => {
      const { geometry } = results[0]
      values.returnDropOffLocation.description = suggestion.description;
      values.returnDropOffLocation.lat = geometry.location.lat();
      values.returnDropOffLocation.lng = geometry.location.lng();

      props.bookingInfo.returnDropOffLocation.description = suggestion.description;
      props.bookingInfo.returnDropOffLocation.lat = geometry.location.lat();
      props.bookingInfo.returnDropOffLocation.lng = geometry.location.lng();

    }).catch((err) => {
      console.log(err)
    })
  }


  function createAutocompleteRequest(inputValue) {
    // Restrict the returned suggestions to those that:
    // 1) Are in Bellingham (latitude 48.7519, longitude 122.4787)
    // 2) Are within ~3 miles (5000 meters)
    // 3) Have an address associated with them
    return {
      input: inputValue,
      types: ['geocode', 'establishment'],
      location: { lat: () => -34.2969541, lng: () => 18.2479026 },
      radius: 1000,
    }
  }


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                    value={props.bookingInfo.vehicleType}
                    onChange={handleVehicleTypeSelect}
                    input={<OutlinedInput name="vehicleType" id="outlined-name" />}
                    
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="NLPREMIUM">
                        <Paper>
                          <Button variant="contained" color="primary" className={classes.selectOptionButton}>
                          <AccessTimeIcon className={classes.extendedIcon}/> &nbsp;Hello
                          </Button>
                          <Typography component="p" className={classes.selectOptionIcon}>
                            <LocationOnIcon />
                          </Typography>
                          <Typography component="p" className={classes.selectOption}>
                            Tada da a
                          </Typography>
                        </Paper>
                    </MenuItem>
                    
                  </Select>
                </FormControl>
                
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel  htmlFor="outlined-name">
                    Return
                  </InputLabel>
                  <Select
                    label="Time"
                    value={props.bookingInfo.vehicleType}
                    onChange={handleVehicleTypeSelect}
                    input={<OutlinedInput name="vehicleType" id="outlined-name" />}
                    
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="NLPREMIUM">
                        <Paper>
                          <Button variant="contained" color="primary" className={classes.selectOptionButton}>
                          <AccessTimeIcon className={classes.extendedIcon}/> &nbsp;Hello
                          </Button>
                          <Typography component="p" className={classes.selectOptionIcon}>
                            <LocationOnIcon />
                          </Typography>
                          <Typography component="p" className={classes.selectOption}>
                            Tada da a
                          </Typography>
                        </Paper>
                    </MenuItem>
                    
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
                    fullWidth={true}
                />
                
            </Grid>
        </Grid>
        </MuiPickersUtilsProvider>
  );
}

export default ParkNRideInfo;
