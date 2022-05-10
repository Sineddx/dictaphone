import AudioRecorder from "./components/AudioRecorder/AudioRecorder";
import { Provider as PaperProvider } from "react-native-paper";
import Header from "./components/Header/Header";
export default function App() {
  return (
    <>
      <Header />
      <AudioRecorder />
    </>
  );
}
