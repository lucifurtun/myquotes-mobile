import React, {Component} from 'react'

import MultiSelect from "react-native-multiple-select"


export default class Select extends Component {
    render() {
        const {input, label, single, items} = this.props
        const {onChange, value} = input

        return (
            <MultiSelect
                items={items}
                canAddItems
                uniqueKey="key"
                onSelectedItemsChange={onChange}
                selectedItems={value}
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
