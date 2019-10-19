import React from 'react'

const BookingContext = React.createContext({})

export const BookingProvider = BookingContext.Provider
export const BookingConsumer = BookingContext.Consumer
export default BookingContext