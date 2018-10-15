import { Dimensions } from "react-native";
var width = Dimensions.get("window").width;

const styles = {
    searchResultsWrapper:{
        top:210, 
        position:"absolute",
        width:width,
        height: 1000,
        backgroundColor:"#fff",
        opacity:0.9
    },
    primaryText:{
        fontWeight:"bold",
        color:"#373737"
    },
    secondaryText:{
        fontStyle:"italic",
        color:"#707070"
    },
    leftContainer:{
        flexWrap:"wrap",
        alignItems:"flex-start",
        borderLeftColor:"#707070"
    },
    leftIcon:{
        fontSize:20,
        color:"#707070"
    },
    distance:{
        fontSize:12
    }
};

export default styles;