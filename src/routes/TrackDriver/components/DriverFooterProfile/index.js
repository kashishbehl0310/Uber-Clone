import React from "react";
import { Text } from "react-native";
import { View, Button } from "native-base";

import styles from "./DriverFooterStyles";

export const DriverFound = ({driverInfo, getDriverLocation}) => {
    const { profilePic } = driverInfo|| '';
    const { vehicle } = driverInfo || {};
    return (
        <View style={styles.findDriverContainer}>
            <View style={styles.content}>
                <Text>Driver Found!</Text>
                <Image resizemode="contain" style={styles.driverPic} source={{uri: profilePic}} />
                <View style={styles.driverInfo}>
                    <Text style={styles.quotationMarkLeft} >""</Text>
                    <View style={styles.driverBio}>
                        <Text style={styles.bioText}>
                            Hi my name is
                        </Text>
                        <Text style={styles.nameText}>
                            {driverInfo.firstname} {driverInfo.lastname}
                        </Text>
                        <Text style={styles.bioText}>
                            I am 0.2 km away.
                        </Text>
                    </View>
                    <Text style={styles.quotationMarkRight}>""</Text>
                </View>
                <View style={styles.vehicleDetails}>
                    <Text style={styles.vehicleText}>Vehicle Plate Number :</Text>
                    <Text style={styles.vehicleNumber}>{vehicle && vehicle.plateNumber}</Text>
                </View>
                <Button style={styles.nextBtn} onPress={() => getDriverLocation()}>
                    <Text style={styles.nextBtnText}>Next</Text>
                </Button>
            </View>
        </View>
    )
}

export default DriverFound;