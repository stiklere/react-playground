import "./App.css";
import { FruitList } from "./features/fruits/FruitList";

function App() {
  return (
    <div className="w-full max-w-sm rounded-xl bg-white p-4 shadow-md sm:p-6 md:max-w-lg md:p-8 lg:max-w-xl xl:max-w-2xl">
      <FruitList></FruitList>
    </div>
  );
}

export default App;
