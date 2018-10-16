import React from "react";
import { View } from "native-base";
import MapView , {PROVIDER_GOOGLE} from "react-native-maps";
import styles from "./MapContainerStyles";
import SearchBox from "../SearchBox";
import SearchResults from "../SearchResults";

export const MapContainer = ({region, getInputData, toggleSearchResult}) => {
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
            <SearchBox getInputData={getInputData} toggleSearchResult={toggleSearchResult} />
            <SearchResults />
        </View>
    )
}

export default MapContainer;