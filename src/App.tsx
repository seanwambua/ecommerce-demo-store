import { useFetchProducts } from "./hooks/useProducts";

function App() {
  const { loading, error } = useFetchProducts();
  return (
    <div className="justify-center items-center flex flex-col min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold">Welcome to Vite + React</h1>
      {loading && <div className="p-8 text-xl font-semibold">Loading...</div>}
      {error && <div>"Error: "+error </div>}
    </div>
  );
}

export default App;
