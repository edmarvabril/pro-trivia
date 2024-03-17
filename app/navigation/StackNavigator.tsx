import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QuizScreen} from '../screens/QuizScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {WelcomeScreen} from '../screens/WelcomeScreen';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';
import {ScoreScreen} from '../screens/ScoreScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{
          headerTitle: 'Pro-Trivia',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: typography.lg,
          },
          headerStyle: {
            backgroundColor: colors.orange,
          },
          headerTintColor: colors.white,
        }}
      />
      <Stack.Screen
        name="ScoreScreen"
        component={ScoreScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
