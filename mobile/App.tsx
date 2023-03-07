import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { BASE_URL } from "@env"
import NavigatorContextProvider from './components/navigator/NavigatorContextProvider';
import Pages from "./components/navigator/pages";

export default function App() {
  return (
    <NavigatorContextProvider>
      <Pages />
    </NavigatorContextProvider>
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
