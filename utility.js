import { travelStyleList } from "./constant"

export const countPlanDays = (placesPlan)=>{
    let tripDays = Object.keys(placesPlan).length
    let placesCount = 0
    for(let daythPlan in placesPlan)
    {
        let daythCount = placesPlan[daythPlan].length
        placesCount = placesCount + daythCount
    }
    return{
        tripDays,
        placesCount
    }
}

export const hasNonEmptyArray = (obj) => {
    // Iterate over the values of the object
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Check if the value is an array and if it is not empty
        if (Array.isArray(obj[key]) && obj[key].length > 0) {
          return true;
        }
      }
    }
    // If no non-empty array is found, return false
    return false;
  }
  
 export const transformToDailyPlacesArray = (data) => {
    return Object.keys(data).map((day) => ({
      dailyPlacesList: data[day],
      id:day + '-' + new Date()
    }));
  };

  export const transformToDailyPlacesObject = (dataArray) => {
    return dataArray.reduce((acc, current, index) => {
      acc[`day${index + 1}`] = current.dailyPlacesList;
      return acc;
    }, {});
  };


  export const generateTripdaysList = (number) => {
    const tripDaysList = [];
  
    for (let i = 1; i <= number; i++) {
      const label = `${i}天${i - 1}夜`;
      tripDaysList.push({
        tripDays: i,
        label: label
      });
    }
  
    return tripDaysList;
  }

  export  const handleSuggestionsResponse = (predictions) => {
    if (!predictions || !predictions.length) {
        return [];
    }

    const filteredArr = predictions.map(prediction => ({
        main_text: prediction.name,
        detailed_name: prediction.address,
        place_id: prediction.uid,
        location: prediction.location
    }));


    return filteredArr
}

export  const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
};


// const places_plan_ai = {
      //     'day1':["place1","place2",...],
      //     "day2":...,
      // }

  export const tripDaysList = generateTripdaysList(14)