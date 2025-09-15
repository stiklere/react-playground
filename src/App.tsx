import "./App.css";
import { FruitList } from "./features/fruits/FruitList";

function App() {
  return (
    <div className="w-full max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-xl bg-white shadow-md p-4 sm:p-6 md:p-8">
      <FruitList></FruitList>
    </div>
  );
}

export default App;
