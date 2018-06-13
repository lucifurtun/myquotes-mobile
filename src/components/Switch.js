import React from 'react'

import {Switch, View, Text} from 'react-native'

const SwitchInput = (props) => {
    const {input, label, ...otherProps} = props
    const {onChange, value} = input

    return (
        <View style={{flexDirection: 'row', height: 50}}>
            <Text style={{justifyContent: 'center', lineHeight: 45}}>{label}</Text>
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
