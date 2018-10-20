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
        selectedAddress}) => {
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