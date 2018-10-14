import React from "react";
import {  Text } from "react-native";
import { View, InputGroup, Input } from "native-base";
import styles from "./SearchBoxStyles";
import Icon from "react-native-vector-icons/FontAwesome";

export const SearchBox = () => {
    return(
        <View style={styles.searchBox}>
            <Text style={styles.label}>Pick Up</Text>
            <InputGroup>
                <Icon name="search" size={15} color="#FF5E3A" />
                <Input style={styles.inputSearch} placeholder="Choose Pick Up location" />
            </InputGroup>
        </View>
    );
}

export default SearchBox;