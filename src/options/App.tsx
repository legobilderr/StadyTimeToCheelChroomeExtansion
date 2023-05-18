import MainSettingPage from "./components/MainSettingPage";
import { OptionProvider } from "./context/OptionsContext";
function App() {
  return (
    <div className=" mt-8">
      <OptionProvider>
        <MainSettingPage />
      </OptionProvider>
    </div>
  );
}

export default App;
