import { StyleSheet} from 'react-native';
import NavigatorContextProvider from './components/navigator/NavigatorContextProvider';
import Pages from "./components/navigator/pages";
import AuthContextProvider from "./components/auth/AuthContextProvider";
import ProfileContextProvider from "./components/profile/ProfileContextProvider";

export default function App() {
  return (
    <NavigatorContextProvider>
      <AuthContextProvider>
        <ProfileContextProvider>
          <Pages />
        </ProfileContextProvider>
      </AuthContextProvider>
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
