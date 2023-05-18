import "./App.css";
import SettingForm from "./components/SettingForm";
import { TimerProvider } from "./context/TimerContext";
function App() {
  return (
    <>
      <TimerProvider>
        <SettingForm />
      </TimerProvider>
    </>
  );
}

export default App;
