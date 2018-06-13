import React from 'react'

import Container from './Container'
import SideMenuItem from './SideMenuItem'
import {store} from '../store'


const SideMenu = ({navigation}) => {
    return (
        <Container>
            <SideMenuItem
                title="Add a quote"
                icon="md/add"
                onPress={() => navigation.navigate('addQuote')}
            />
            <SideMenuItem
                title="Quotes"
                icon="md/format-quote"
                onPress={() => navigation.navigate('quotes')}
            />
            <SideMenuItem
                title="Account Settings"
                icon="md/settings"
                onPress={() => navigation.navigate('test')}
            />
            <SideMenuItem
                title="Log out"
                icon="md/power-settings-new"
                onPress={() => {
                    store.dispatch({type: 'UNSET_TOKEN'})
                    navigation.navigate('login')
                }}
            />
        </Container>
    )
}

export default SideMenu
