import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Todo from './screens/Todo';
import CreateTodo from './components/CreateTodo';
import EditTodo from './components/EditTodo';

const Stack = createNativeStackNavigator();
export default function App() {

 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="Ajouter" component={CreateTodo} />
        <Stack.Screen name="Modifier" component={EditTodo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
