import React from 'react';

const bookingContext = React.createContext({
    user_id: '',
    event_id: '',
    event_location: null,
    departureDate: null,
    departureTime: null,
    departureLocation: null,
    returnDate: null,
    returnTime: null,
    returnLocation: null

});

export default bookingContext;