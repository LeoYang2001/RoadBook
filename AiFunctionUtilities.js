import { handleSuggestionsResponse, tripDaysList } from "./utility";

const BAIDU_MAPS_APIKEY = process.env.EXPO_PUBLIC_BAIDU_MAPS_APIKEY
const BAIDU_PLACES_URL = process.env.EXPO_PUBLIC_BAIDU_PLACES_URL

export const formatAiPrompt = (promptAttributes) => {
    const {city , travelStyle, tripDays} = promptAttributes

    let travelStylePrompt = ''
    switch(travelStyle){
      case 0: travelStylePrompt = '一到两个地点'; break;
      case 1: travelStylePrompt = '两到三个地点'; break;
      case 2: travelStylePrompt = '三到四个地点'; break;
      case 3: travelStylePrompt = '四到五个地点'; break;
    }

    const msg = `我想去${city}游玩，我喜欢每天去${travelStylePrompt}。根据我的描述帮我生成${tripDaysList[tripDays - 1].label}的旅行路书.`
    const returnExample = {
      'day1':['北京天安门','故宫','...'],
      'day2':['南锣鼓巷','...']
    }
    const promptMsg = `${msg}, 只需要推荐游玩地点， 不需要计划出发或者返回形成，请返回格式类似${JSON.stringify(returnExample)}`
    return promptMsg
  }
  
export const generateRoadbook = async (placesPlan_ai, promptAttributes) => {
        const {city , tripDays } = promptAttributes
        let placesPlan_ai_parsed = JSON.parse(JSON.parse(placesPlan_ai).message.content)
        console.log({city, tripDays, placesPlan_ai_parsed})
        // fetchPlacesDetailByName(city, placesPlan_ai_parsed['day1'][0])

        let placesPlan = {};
        for(let day in placesPlan_ai_parsed){
            placesPlan[day] = []
            for(let place of placesPlan_ai_parsed[day]){
                try {
                    console.log(`${day} - ${place}`)

                    let placeDetails = await fetchPlacesDetailByName(city, place);
                    console.log("placeDetails")
                    console.log(placeDetails)
                    placesPlan[day].push(placeDetails)
                } catch (error) {
                    console.error(`Failed to fetch details for ${place} on ${day}:`, error);
                }
            }
        }

        const aiGeneratedRoadbook = {
            city,
            tripDays,
            roadbookName : 'AI Generated',
            placesPlan,
        }

        aiGeneratedRoadbook.location = await fetchCityLocation(aiGeneratedRoadbook.city)
        return aiGeneratedRoadbook;
}

const fetchPlacesDetailByName = async (city, name) => {
    console.log({city, name})

    const url = BAIDU_PLACES_URL;
    const ak = BAIDU_MAPS_APIKEY;
    const params = {
        query: name,  // Travel attractions
        tag: "旅游景点",        // Sights
        region: city,     // Beijing
        output: "json",
        ak: ak
    };
    const queryString = new URLSearchParams(params).toString();
    const requestUrl = `${url}?${queryString}`;
    try {
        const response = await fetch(requestUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const raw_arr = handleSuggestionsResponse(data.results);
        const detailedPlace = {
            ...raw_arr[0],
            timeId: raw_arr[0].place_id + Date.now()
        }
        return detailedPlace
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('error occurred', error)
    }
}

export const fetchCityLocation = async (city) => {
    console.log('fetching location..', city);
    const url = process.env.EXPO_PUBLIC_BAIDU_PLACES_URL;
    const ak = process.env.EXPO_PUBLIC_BAIDU_MAPS_APIKEY;
    const params = {
        query: city,
        region: "中国",
        output: "json",
        ak: ak
    };

    const queryString = new URLSearchParams(params).toString();
    const requestUrl = `${url}?${queryString}`;

    try {
        const response = await fetch(requestUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const location = data?.results[0]?.location;
        return location;
    } catch (error) {
        alert(error);
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};