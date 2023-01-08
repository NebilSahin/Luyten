import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import Auth from '../screens/auth';
import {langFileSelector} from '../shared/lang';
import PostDetails from '../screens/home/components/PostDetails';
import NavBottomBar from './components/NavBottomBar';
import NavPostHeader from './components/NavPostHeader';

const AppStack = createStackNavigator();

function AppNav() {
    //redux state data
    const sessionIsActive = useSelector(state => state.sessionUser.isActive);
    const LANG = langFileSelector();

    //render
    return (
        <AppStack.Navigator
            initialRouteName={sessionIsActive ? 'BarNav' : 'AuthNav'}
            screenOptions={{
                headerShown: false,
            }}>
            {sessionIsActive ? (
                <>
                    <AppStack.Screen
                        name="BarNav"
                        component={NavBottomBar}
                        options={{
                            animationTypeForReplace: sessionIsActive
                                ? 'pop'
                                : 'push',
                        }}
                    />
                    <AppStack.Group
                        screenOptions={{
                            animation: 'slide_from_right',
                            headerShown: true,
                        }}>
                        <AppStack.Screen
                            name={LANG.core.postDetails}
                            component={PostDetails}
                            options={props => ({
                                header: () => <NavPostHeader {...props} />,
                            })}
                        />
                    </AppStack.Group>
                </>
            ) : (
                <AppStack.Screen name="AuthNav" component={Auth} />
            )}
        </AppStack.Navigator>
    );
}

export default AppNav;
