import React from "react";
import { View } from "native-base";
import MapView , {PROVIDER_GOOGLE} from "react-native-maps";
import styles from "./MapTrackStyles";
import SearchBox from "../SearchBox";
import SearchResults from "../SearchResults";

export const MapContainer = ({
        region,
        driverLocation
    }) => {

    const { selectedPickUp, selectedDropOff } = selectedAddress || {};
    const { showCarMarker } = showCarMarker;
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
                { showCarMarker &&
                    <MapView.Marker
                        coordinate={{
                            latitude: driverLocation.coordinate.coordinatess[1],
                            longitude: driverLocation.coordinate.coordinatess[0]
                        }}
                        pinColor="red"
                    />
                }
            </MapView>
        </View>
    )
}

export default MapContainer;