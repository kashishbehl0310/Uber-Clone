import { Dimensions } from "react-native";
var width = Dimensions.get("window").width;

const styles = {
    searchBox:{
        top: 60,
        position: "absolute",
        width: width
    },
    inputWrapper:{
        marginLeft:15,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 0,
        backgroundColor: "#fff",
        opacity:0.9,
        borderRadius:7
    },
    secondInputWrapper:{
        marginLeft:15,
        marginRight:10,
        marginTop:5,
        backgroundColor:"#fff",
        opacity:0.9,
        borderRadius:7
    },
    inputSearch:{
        fontSize:14
    },
    label:{
        marginLeft:10,
        marginRight:10,
        marginTop:0,
        fontSize:10,
        fontStyle:"italic"
    }
};

export default styles;