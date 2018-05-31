import {Button, Modal, View, Text, StyleSheet} from "react-native"
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

            <View style={styles.container}>
                <FilterQuotes/>
                <Button
                    title="Apply"
                    onPress={() => {
                        dispatch({type: modal.MODAL_CLOSE})
                    }}
                />
            </View>
        </View>
    </Modal>
)

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    }
})


function mapStateToProps(state) {
    return {visible: state.modal.opened}
}

export default connect(mapStateToProps)(FilterModal)
