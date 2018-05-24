import React from 'react'
import {Button, View} from 'react-native'
import FilterModal from "../components/FilterModal"
import {store} from "../store"
import {modal} from "../reducers"

const ModalExample = () => (
    <View style={{marginTop: 22}}>
        <FilterModal title='test'/>

        <Button
            title='Show Modal'
            onPress={() => {
                store.dispatch({type: modal.MODAL_OPEN})
            }}
        />

    </View>
)

export default ModalExample