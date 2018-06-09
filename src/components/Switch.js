import React from 'react'

import {Switch, View, Text} from 'react-native'

const SwitchInput = (props) => {
    const {input, label, ...otherProps} = props
    const {onChange, value} = input

    return (
        <View style={{flexDirection: 'row', height: 50}}>
            <Text>{label}</Text>
            <Switch
                onValueChange={onChange}
                value={value}
                {...otherProps}
                {...input}
            />
        </View>
    )
}

export default SwitchInput
