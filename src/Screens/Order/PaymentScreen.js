import React from 'react';

import {Text, View, StyleSheet} from 'react-native';

const PaymentScreen = () => {
    return (
        <View style={styles.container}>
            <Text>PaymentScreen</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    }
})
export default PaymentScreen;
