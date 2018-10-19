import React from "react";
import { Text } from "react-native";
import { Footer, FooterTab, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./FooterComponentStyles";

export const FooterComponent = () => {

    const tabs = [{
        title: "TaxiCar",
        subTitle: "",
        icon:"car"
    },{
        title: "TaxiShare",
        subTitle: "",
        icon:"car"
    },{
        title: "Premium",
        subTitle: "",
        icon:"car"
    },{
        title: "TaxiBike",
        subTitle: "",
        icon:"car"
    }];

    return(
        <Footer>
            <FooterTab style={{backgroundColor: "#fff"}} androidStatusBarColor="light-content">
                {
                    tabs.map((obj, index) => {
                        return (
                            <Button key={index}>
                                <Icon size={20} name={obj.icon} color={ (index === 0) ? "#FF5E3A" : "#eee"} />
                                <Text style={{fontSize:12, color: (index === 0) ? "#FF5E3A" : "#eee"}}> {obj.title} </Text>
                                <Text style={styles.subText}> {obj.subTitle} </Text>
                            </Button>
                        )
                    })
                }
            </FooterTab>
        </Footer>
    )
}

export default FooterComponent;