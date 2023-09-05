import "./App.css";

function App() {
  console.log(import.meta.env.VITE_APP_API_URL);

  return (
    <div className="min-h-full min-w-full bg-cover bg-center h-screen bg-[url('/yoda.jpeg')]">
      <img
        src="/yoda.jpeg"
        alt="yoda"
        className="object-fill w-full absolute top-0 left-0 h-screen opacity-80"
      />
      {/* <img src="./assets/yoda.jpeg" alt="yoda" /> */}
    </div>
  );
}

export default App;
