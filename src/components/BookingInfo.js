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
import Link from '@material-ui/core/Link';
import axios from 'axios';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MUIPlacesAutocomplete, { geocodeByPlaceID } from 'mui-places-autocomplete';


const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '90%',
      display: 'block'
    },
    formControl: {
      margin: 'dense',
      minWidth: '90%',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '90%',
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
        display: 'inline'
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
     
    },
  }));

  


function BookingInfo(props) {
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
    termsAndConditionsChecked: null
  });

  const [termsAndConditionsURL, setTermsAndConditionsURL] = React.useState();
  axios.get('https://nite-life-d891a.firebaseio.com/legal/termsandconditions.json')
      .then((response) => {
        console.log(response.data)
        setTermsAndConditionsURL(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })


  console.log(props.bookingInfo.errors)
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

  const handleTermsAndConditionsChecked = name => event => {
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
                    id="name"
                    label="Name"
                    className={classes.textField}
                    value={props.bookingInfo.name}
                    onChange={handleChange('name')}
                    margin="dense"
                    variant="outlined"
                    fullWidth={true}
                    size="normal"
                />
                <TextField
                    id="email"
                    label="Email"
                    className={classes.textField}
                    value={props.bookingInfo.email}
                    onChange={handleChange('email')}
                    margin="dense"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                />
                <TextField
                    id="cellNumber"
                    label="Cell Number"
                    className={classes.textField}
                    value={props.bookingInfo.cellNumber}
                    onChange={handleChange('cellNumber')}
                    margin="dense"
                    variant="outlined"
                    fullWidth={true}
                    inputProps={{ maxLength: 13 }}
                    size="small"
                    
                    
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <header>Departure Choice</header>
                <KeyboardDatePicker
                    id="departureDate"
                    label="Date"
                    className={classes.textFieldTravelInfo}
                    value={props.bookingInfo.departureDate}
                    onChange={handleDateInput('departureDate')}
                    margin="dense"
                    variant="outlined"
                    inputVariant="outlined"
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    size="small"
                />
                <KeyboardTimePicker
                    id="departureTime"
                    label="Time"
                    className={classes.textFieldTravelInfo}
                    value={props.bookingInfo.departureTime}
                    onChange={handleTimeInput('departureTime')}
                    margin="dense"
                    variant="outlined"
                    inputVariant="outlined"
                    size="small"
                />
               
                <div style={{ position: 'relative'}}>
                    <MUIPlacesAutocomplete
                        id="departurePickUpLocation"
                        label="Pickup Location"
                        value={props.bookingInfo.departurePickUpLocation}
                        onChange={handleChange('departurePickUpLocation')}
                        margin="dense"
                        variant="outlined"
                        onSuggestionSelected={onSuggestionSelectedDeparturePickUp}
                        createAutocompleteRequest={createAutocompleteRequest}
                        textFieldProps={{ id: 'departurePickUpLocation', variant: 'outlined', label: 'Pickup Location', className: classes.textField, margin: 'dense', fullWidth: true}} 
                        renderTarget={() => (<div style={{zIndex:2, color: 'blue'}}/>)}
                        size="small"
                    />
                </div>

                <div style={{ position: 'relative'}}>
                    <MUIPlacesAutocomplete
                        id="departureDropOffLocation"
                        label="Destination"
                        value={props.bookingInfo.departureDropOffLocation}
                        onChange={handleChange('departureDropOffLocation')}
                        margin="dense"
                        variant="outlined"
                        onSuggestionSelected={onSuggestionSelectedDepartureDropOff}
                        createAutocompleteRequest={createAutocompleteRequest}
                        textFieldProps={{ id: 'departureDropOffLocation', variant: 'outlined', label: 'Destination', className: classes.textField, margin: 'dense', fullWidth: true}} 
                        renderTarget={() => (<div style={{zIndex:2, color: 'blue'}}/>)}
                    />
                </div>
                <header>Return Choice</header>
                <KeyboardDatePicker
                    id="returnDate"
                    label="Date"
                    className={classes.textFieldTravelInfo}
                    value={props.bookingInfo.returnDate}
                    onChange={handleDateInput('returnDate')}
                    margin="dense"
                    variant="outlined"
                    inputVariant="outlined"
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                />
                
                <KeyboardTimePicker
                    id="returnTime"
                    label="Time"
                    className={classes.textFieldTravelInfo}
                    value={props.bookingInfo.returnTime}
                    onChange={handleTimeInput('returnTime')}
                    margin="dense"
                    variant="outlined"
                    inputVariant="outlined"
                />
                
                <div style={{ position: 'relative'}}>
                   
                </div>
                <div style={{ position: 'relative'}}>
                    <MUIPlacesAutocomplete
                        id="returnDropOffLocation"
                        label="Dropoff Location"
                        value={props.bookingInfo.returnDropOffLocation}
                        onChange={handleChange('returnDropOffLocation')}
                        margin="dense"
                        variant="outlined"
                        onSuggestionSelected={onSuggestionSelectedReturnDropOff}
                        createAutocompleteRequest={createAutocompleteRequest}
                        textFieldProps={{ id: 'returnDropOffLocation',variant: 'outlined', label: 'Dropoff Location', className: classes.textField, margin: 'dense', fullWidth: true}} 
                        renderTarget={() => (<div />)}
                    />
                </div>
                <header>Vehicle Type</header>
      
                <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                  <InputLabel  htmlFor="outlined-name">
                    Vehicle Type
                  </InputLabel>
                  <Select
                    label="Time"
                    value={props.bookingInfo.vehicleType}
                    onChange={handleVehicleTypeSelect}
                    margin="dense"
                    input={<OutlinedInput name="vehicleType" id="vehicleType" fullWidth={true}/>}
                    
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="NLSTUDIO">NL STUDIO - 14 Seater</MenuItem>
                    <MenuItem value="NLSTUDIOXL">NL STUDIO XL - 22 Seater </MenuItem>
                    <MenuItem value="NLSUPERSTAR">NL SUPERSTAR - Luxury 6 Seater</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                <FormControlLabel
                  control={
                    <Checkbox checked={props.bookingInfo.trailerRequired} onChange={handleTrailerRequiredChecked('trailerRequired')} value="trailerRequired" color="primary"/>
                  }
                  label="Trailer required?"
                  id="trailerRequired"
                />
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                <FormControlLabel
                  control={
                    <Checkbox checked={props.bookingInfo.termsAndConditionsChecked} onChange={handleTermsAndConditionsChecked('termsAndConditionsChecked')} value="termsAndConditionsChecked" color="primary"/>
                  }
                  label={<Link href={termsAndConditionsURL} target="_blank" rel="noopener" >
                          I have read and agree to the <u>Terms and Conditions</u>
                         </Link>}
                  id="termsAndConditionsChecked"
                />
                </FormControl>
                
            </Grid>
            
        </Grid>
        </MuiPickersUtilsProvider>
  );
}

export default BookingInfo;
