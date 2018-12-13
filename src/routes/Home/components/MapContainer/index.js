import React from "react";
import { View } from "native-base";
import MapView , {PROVIDER_GOOGLE} from "react-native-maps";
import styles from "./MapContainerStyles";
import SearchBox from "../SearchBox";
import SearchResults from "../SearchResults";

export const MapContainer = ({
        region, 
        getInputData, 
        toggleSearchResult, 
        getAddressPredictions, 
        resultTypes, 
        predictions, 
        getSelectedAddress,
        selectedAddress,
        carMarker,
		nearByDrivers
    }) => {

    const { selectedPickUp, selectedDropOff } = selectedAddress || {};
    return(
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
            >
                { selectedPickUp &&
                    <MapView.Marker
                        coordinate={{
                            latitude: selectedPickUp.latitude,
                            longitude: selectedPickUp.longitude
                            }}
                        pinColor="green"
                    />
                }
                 { selectedDropOff &&
                    <MapView.Marker
                        coordinate={{
                            latitude: selectedDropOff.latitude,
                            longitude: selectedDropOff.longitude
                        }}
                        pinColor="red"
                    />
                }
               {
					nearByDrivers && nearByDrivers.map((marker, index)=>
						<MapView.Marker
							key={index}
							coordinate={{latitude:marker.coordinate.coordinates[1], longitude:marker.coordinate.coordinates[0] }}
							image={carMarker}
						/>	
					)
				}
            </MapView>
            <SearchBox 
                getInputData={getInputData} 
                toggleSearchResult={toggleSearchResult} 
                getAddressPredictions={getAddressPredictions} 
                selectedAddress={selectedAddress}
                />
            { (resultTypes.pickUp || resultTypes.dropOff) &&
                <SearchResults predictions={predictions} getSelectedAddress={getSelectedAddress} />
            }
        </View>
    )
}

export default MapContainer;