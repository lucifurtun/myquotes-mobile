import React from 'react'

import {TextInput} from 'react-native'

const Input = (props) => {
    const {input, label, ...otherProps} = props
    const {onChange} = input

    return (
        <TextInput
            placeholder={label}
            onChangeText={onChange}
            {...otherProps}
            {...input}
        />
    )
}

export default Input
