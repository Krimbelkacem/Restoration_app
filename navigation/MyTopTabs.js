import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
import Home from "../screens/Home";
function MyTopTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
   
    </Tab.Navigator>
  );
}
export default MyTopTabs;