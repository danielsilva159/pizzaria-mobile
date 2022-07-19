import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { useRoute, RouteProp} from '@react-navigation/native'
import {Feather} from '@expo/vector-icons'

type RouteDetailParams = {
    Order:{
        number: string | number;
        order_id: string
    }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>
export default function Order(){
    const route = useRoute<OrderRouteProps>()
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Mesa {route.params.number}</Text>
                <TouchableOpacity>
                    <Feather name='trash-2' size={28} color="#FF3F4b" />
                </TouchableOpacity>
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingStart: '4%'
    },
    header:{

    }
})