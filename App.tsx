import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { MainTabs } from './src/navigation/MainTabs';
import type { RootStackParamList } from './src/navigation/types';
import { GoLiveScreen } from './src/screens/GoLiveScreen';
import { colors } from './src/theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surface,
    border: colors.border,
    primary: colors.accent,
    text: colors.textPrimary,
  },
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs">
            {({ navigation }) => (
              <MainTabs onGoLivePress={() => navigation.navigate('GoLive')} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="GoLive"
            component={GoLiveScreenWrapper}
            options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

function GoLiveScreenWrapper({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'GoLive'>) {
  return <GoLiveScreen onClose={() => navigation.goBack()} />;
}
