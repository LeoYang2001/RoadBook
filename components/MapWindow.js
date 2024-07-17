import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';

// Removed the import statement for CustomMarker
import { themeColors } from '../constant';

const BAIDU_MAPS_APIKEY = process.env.EXPO_PUBLIC_BAIDU_MAPS_APIKEY;

const MapWindow = ({ placesWithGeometry, location, ifDirections, CustomMarker }) => {
    const mapRef = useRef(null);
    const [selectedMarkerId, setSelectedMarkerId] = useState(placesWithGeometry[0]?.place_id ? placesWithGeometry[0]?.place_id : null);
    const [directions, setDirections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const markerPoints = placesWithGeometry.map(place => ({
        latitude: place?.location?.lat,
        longitude: place?.location?.lng,
    }));

    const origin = placesWithGeometry[0]?.location;
    const destination = placesWithGeometry[placesWithGeometry.length - 1]?.location;
    const waypoints = markerPoints.length > 2 ? markerPoints.slice(1, -1) : [];


    useEffect(() => {
        if (!origin || !destination) return;

        if (mapRef) {
            mapRef.current.fitToSuppliedMarkers(placesWithGeometry.map(place => place.place_id));
        }
        if (ifDirections) {
            fetchBaiduDirections();
        }
    }, [origin, destination]);

    const fetchBaiduDirections = async () => {
        const ak = BAIDU_MAPS_APIKEY;
        const originStr = `${origin?.lat},${origin?.lng}`;
        const destinationStr = `${destination?.lat},${destination?.lng}`;

        try {
            setIsLoading(true);
            const response = await fetch(buildDirectionsUrl(originStr, destinationStr, waypoints, ak));
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.status === 0) {
                const points = parseRouteCoordinates(data.result.routes[0].steps);
                setDirections(points);
                setIsLoading(false);
            } else {
                throw new Error('Baidu Maps API request failed');
            }
        } catch (error) {
            console.error('Error fetching directions:', error);
        }
    };

    const buildDirectionsUrl = (origin, destination, waypoints, ak) => {
        let url = `https://api.map.baidu.com/directionlite/v1/driving?origin=${origin}&destination=${destination}&ak=${ak}`;
        if (waypoints.length > 0) {
            const waypointStr = waypoints.map(wp => `${wp.latitude},${wp.longitude}`).join('|');
            url += `&waypoints=${waypointStr}`;
        }
        return url;
    };

    const parseRouteCoordinates = (steps) => {
        // Extract coordinates from each step in the route
        const coordinates = steps.flatMap(step => {
            const path = step.path.split(';');
            return path.map(coord => {
                const [lng, lat] = coord.split(',');
                return { latitude: parseFloat(lat), longitude: parseFloat(lng) };
            });
        });
        return coordinates;
    };

    const handleMarkerPress = (placeId) => {
        setSelectedMarkerId(placeId);
    };

    const handleMapPress = () => {
        console.log('map pressed');
    };

    return (
        <View className="flex-1 w-full bg-red-50">
            {isLoading && (
                <View style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} className="absolute w-full h-full z-10 flex justify-center items-center">
                    <ActivityIndicator color={themeColors.primaryColor} size={'large'} />
                </View>
            )}
            <MapView
            showsCompass={false}
                ref={mapRef}
                mapType='mutedStandard'
                className="flex-1"
                initialRegion={{
                    latitude: location?.lat ? location?.lat : 39.910924,
                    longitude: location?.lng ? location?.lng : 116.413387,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                onPress={handleMapPress}
            >
                {placesWithGeometry.length > 1 && (
                    <Polyline
                        coordinates={directions}
                        strokeWidth={4}
                        strokeColor={'#4C545F'}
                    />
                )}
                {placesWithGeometry.map((placeItem, index) => (
                    <Marker
                        key={`${placeItem.place_id}-${index}`}
                        coordinate={{
                            latitude: placeItem.location.lat,
                            longitude: placeItem.location.lng,
                        }}
                        title={placeItem.main_text}
                        description={placeItem.detailed_name}
                        identifier={placeItem.place_id}
                        onPress={() => {
                            setSelectedMarkerId(placeItem?.place_id);
                        }}
                    >
                        <CustomMarker index={index} selectedMarkerId={selectedMarkerId} setSelectedMarkerId={setSelectedMarkerId} placeItem={placeItem} />
                        <Callout>
                            <View style={{ width: 200 }}>
                                <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold' }}>{placeItem.main_text}</Text>
                                <Text numberOfLines={2} style={{ fontSize: 14 }}>{placeItem.detailed_name}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
};

export default MapWindow;
