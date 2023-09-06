import "./App.css";
import Router from "./router/Router";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
function App() {
  const paypalClientId =
    "AV8c5J5AoT8jw3NylpoH5K1um9_IYn7IbroEn7cB1v-wXuccdCSqKnQXmSy7KI1dYjwBVvgfjn2KVPwO";
  return (
    <PayPalScriptProvider options={{ clientId: paypalClientId }}>
      <Router />
    </PayPalScriptProvider>
  );
}

export default App;
