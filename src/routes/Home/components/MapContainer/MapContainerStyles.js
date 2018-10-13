import { StyleSheet } from "react-native";

const styles = {
    containe: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    map:{
        flex: 1, 
        ...StyleSheet.absoluteFillObject
    }
}

export default styles;