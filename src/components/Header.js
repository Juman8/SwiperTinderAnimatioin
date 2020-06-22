import React from 'react'
import {View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import utils from '../utils'
const Header = (props) => {

    const {title} = props

    return(
        <View style={{height: 70, backgroundColor: '#fff', justifyContent: 'flex-end', alignItems: 'center'}}>
            <Text style={{color: '#333', paddingBottom: 10, fontSize: 24}}>{title}</Text>
            <Icon name="md-arrow-back" style={{position: 'absolute', left: 15, paddingBottom: 10 }} size={28} onPress={()=> {
                utils.getNavigation().goBack()
            }}/>
        </View>
    )
}

export default Header