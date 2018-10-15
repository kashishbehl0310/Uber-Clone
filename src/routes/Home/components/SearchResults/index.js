import React from "react";
import { Text } from "react-native";
import { View, List, ListItem } from "native-base";

import styles from "./SearchResultsStyles";

export const SearchResults = () => {
    return(
        <View style={styles.searchResultsWrapper}>
            <List>
                <ListItem>
                    <Text>List 1</Text>                    
                </ListItem>
                <ListItem>
                    <Text>List 2</Text>                    
                </ListItem>
            </List>
        </View>
    )
};

export default SearchResults;