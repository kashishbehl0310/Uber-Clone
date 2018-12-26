import React from "react";
import { Text } from "react-native";
import { View, Button, Icon } from "native-base";
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from "./DriverOnTheWayStyles";

export const DriverOnTheWayFooter = ({driverInfo, getDriverLocation}) => {
    const { vehicle } = driverInfo || {};
    return (
        <View style={styles.footerContainer}>
            <View style={styles.iconContainer}>
                <Icon name="window-minimize" style={styles.icon} />
                <Text style={styles.vehicleText}>i min</Text>
                <Text style={styles.onWayText}>Your driver is on the way.</Text>
                <Text style={styles.vehicleText}>{ vehicle && vehicle.plateNumber } { vehicle && vehicle.model }</Text>
            </View>           
        </View>
    )
}

export default DriverOnTheWayFooter;