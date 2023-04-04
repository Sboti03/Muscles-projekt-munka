import { StyleSheet} from 'react-native';
import NavigatorContextProvider from './components/navigator/NavigatorContextProvider';
import Pages from "./components/navigator/pages";
import AuthContextProvider from "./components/auth/AuthContextProvider";
import ProfileContextProvider from "./components/profile/ProfileContextProvider";
import MealHistoryContextProvider from './components/mealHistory/mealHistoryContextProvider';
import { LinearGradient } from 'expo-linear-gradient';
import PageHistoryContextProvider from "./components/PageHistory/PageHistoryContextProvider";

export default function App() {
  return (
    <NavigatorContextProvider>
      <PageHistoryContextProvider>
        <AuthContextProvider>
          <ProfileContextProvider>
            <MealHistoryContextProvider>
                <Pages />
            </MealHistoryContextProvider>
          </ProfileContextProvider>
        </AuthContextProvider>
      </PageHistoryContextProvider>
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
