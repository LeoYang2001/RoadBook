import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapWindow from './MapWindow'
import CustomMarker from './CustomMarker'


const MapComponent = ({placesPlan, curDay, location}) => {

    

    const [placesWithGeometry, setPlacesWithGeometry] = useState([])


     
    
      const fetchAllPlacesDetails = async (places) => {
       await Promise.all(
          places.map(async (place) => {
            // const geometry = await fetchPlaceDetails(place.place_id);
            return {
              ...place
            };
          })
        );
        setPlacesWithGeometry(places)
      };

      useEffect(() => {
         fetchAllPlacesDetails(placesPlan[`day${curDay}`])
      }, [placesPlan, curDay])
      

  return (
    <>
        <MapWindow CustomMarker={CustomMarker} location={location} placesWithGeometry={placesWithGeometry} ifDirections={true} />
    </>
  )
}

export default MapComponent