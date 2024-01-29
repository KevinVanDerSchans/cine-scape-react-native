import AppNavigation from './src/navigation/AppNavigation';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <AppNavigation />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}
