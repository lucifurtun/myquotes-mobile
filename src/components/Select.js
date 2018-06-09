import React, {Component} from 'react'

import MultiSelect from "react-native-multiple-select"
import {head, map, isArray} from 'lodash'


export default class Select extends Component {
    render() {
        const {input, label, single, items} = this.props
        const {onChange, value} = input

        console.log(value)

        return (
            <MultiSelect
                items={items}
                canAddItems
                fixedHeight
                autoFocusInput={false}
                uniqueKey="key"
                onSelectedItemsChange={(value) => single ? onChange(head(value)) : onChange(value)}
                selectedItems={isArray(value) ? value : [value]}
                selectText={label}
                searchInputPlaceholderText="Search Items..."
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                single={single}
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#D12345"
                searchInputStyle={{color: '#CCC'}}
                submitButtonColor="#CCC"
                submitButtonText="Select"
            />
        )
    }
}
