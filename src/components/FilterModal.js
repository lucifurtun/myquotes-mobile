import {Button, Modal, View, Text} from "react-native"
import React from "react"
import {connect} from "react-redux"
import {modal} from "../reducers"
import FilterQuotes from "../screens/filterQuotes"

const FilterModal = ({title, visible, dispatch}) => (
    <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={() => {
        }}>
        <View>
            {
                title && (
                    <View>
                        <Text>{title}</Text>
                    </View>
                )
            }

            <View>
                <Button
                    title="OK"
                    onPress={() => {
                        console.log('ok')
                        dispatch({type: modal.MODAL_CLOSE})
                    }}
                />
                <Button
                    title="Cancel"
                    onPress={() => {
                        console.log('cancel')
                        dispatch({type: modal.MODAL_CLOSE})
                    }}
                />
                <FilterQuotes />
            </View>
        </View>
    </Modal>
)


function mapStateToProps(state) {
    return {visible: state.modal.opened}
}

export default connect(mapStateToProps)(FilterModal)
