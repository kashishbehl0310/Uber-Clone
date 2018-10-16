import React from "react";
import {  Text } from "react-native";
import { View, InputGroup, Input } from "native-base";
import styles from "./SearchBoxStyles";
import Icon from "react-native-vector-icons/FontAwesome";

export const SearchBox = ({getInputData}) => {
    function handleInput(key, val){
        getInputData({
            key,
            value: val
        });
    }
    return(
        <View style={styles.searchBox}>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Pick Up</Text>
                <InputGroup>
                    <Icon name="search" size={15} color="#FF5E3A" />
                    <Input style={styles.inputSearch} placeholder="Choose Pick Up location" onChangeText={handleInput.bind(this, "pickU")}  />
                </InputGroup>
            </View>
            <View style={styles.secondInputWrapper}>
                <Text style={styles.label}>Drop</Text>
                <InputGroup>
                    <Icon name="search" size={15} color="#FF5E3A" />
                    <Input style={styles.inputSearch} placeholder="Choose Drop Location" onChangeText={handleInput.bind(this, "dropOff")} />
                </InputGroup>
            </View>
        </View>
    );
}

export default SearchBox;