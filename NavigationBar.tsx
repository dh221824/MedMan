import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import MedicationList from './MedicationList';
import Icon from 'react-native-vector-icons/Ionicons';

// Define the Tab Navigator
const Tab = createBottomTabNavigator();

// Define types for route and navigation options
type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const NavigationBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }: TabBarIconProps) => {
            let iconName: string;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Medication') {
              iconName = focused ? 'medkit' : 'medkit-outline';
            } else {
              iconName = 'alert-circle-outline'; // Fallback icon
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarLabel: () => undefined, // Hide the label
          tabBarStyle: { backgroundColor: '#f0f0f0', height: 60 },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Medication" component={MedicationList} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default NavigationBar;
