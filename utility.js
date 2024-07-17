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