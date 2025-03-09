import { useRef } from "react";
import Routes from "./routes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore, AppStore } from "@/lib/store";
import { persistStore } from "redux-persist";
import { LoaderPage } from "./components/ui/loader-page";

function App() {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        loading={<LoaderPage />}
        persistor={persistStore(storeRef.current)}
      >
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
