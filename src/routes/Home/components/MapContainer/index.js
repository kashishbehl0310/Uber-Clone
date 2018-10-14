import React from "react";
import { View } from "native-base";
import MapView , {PROVIDER_GOOGLE} from "react-native-maps";
import styles from "./MapContainerStyles";

export const MapContainer = ({region}) => {
    return(
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
            >
                <MapView.Marker
                    coordinate={region}
                    pinColor="green"
                />
            </MapView>
        </View>
    )
}

export default MapContainer;