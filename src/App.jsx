import { useState, lazy, Suspense } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import SearchParams from "./SearchParams";
// import DetailsErrorBoundry from "./Details";
// Using store instead of Context now
// import AdoptedPetContext from "./AdoptedPetContext";

const DetailsErrorBoundry = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  // const adoptedPet = useState([]);
  return (
    <div className="p-0 m-0">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {/* <AdoptedPetContext.Provider value={adoptedPet}> */}
          <Provider store={store}>
            <Suspense fallback={<div>Loading...🌀</div>}>
              <header className="m-0 p-2 w-full bg-slate-400 text-center">
                <Link
                  className="text-white text-5xl hover:text-opacity-50"
                  to="/"
                >
                  Adopt me!
                </Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<DetailsErrorBoundry />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </Suspense>
          </Provider>
          {/* </AdoptedPetContext.Provider> */}
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
