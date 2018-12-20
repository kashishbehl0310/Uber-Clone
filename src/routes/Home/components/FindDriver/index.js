import React from 'react';
import { Text } from 'react-native';
import { View, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './FindDriverStyles';

export const FindDriver = ({selectedAddress}) => {

    const {selectedPickUp, selectedDropOff } = selectedAddress || {};
    return(
        <View style={styles.findDriverContainer}>
            <Text style={styles.text}>Processing Request</Text>
            <Icon style={styles.locationIcon} name="map-marker"/>
            <View style={styles.pickup}>
                <Text>{ selectedPickUp.name }</Text>
            </View>
            <View style={styles.dropoff}>
                <Text>{ selectedDropOff.name }</Text>
            </View>
            <View>
                <Text style={styles.termsText}>By booking you confirm that you accept our T&C</Text>
                <Button style={styles.cancelBtn}>
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                </Button>
            </View>
        </View>
    )
}

export const FindDriver;