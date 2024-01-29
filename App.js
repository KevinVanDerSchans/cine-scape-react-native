import 'process';
import AppNavigation from './src/navigation/AppNavigation';
import Toast from 'react-native-toast-message';
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  return (
    <>
      <AppNavigation />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}
