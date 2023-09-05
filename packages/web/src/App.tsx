import "./App.css";
import { MainComponent } from "./components/MainComponent";

function App() {
  console.log(import.meta.env.VITE_APP_API_URL);

  return (
    <div className="min-h-full min-w-full flex">
      <img
        src="/yoda.jpeg"
        alt="yoda"
        className="object-fill w-full absolute top-0 left-0 h-screen opacity-80 z-0"
      />
      <MainComponent />
    </div>
  );
}

export default App;
