import { Header } from "@/components";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "@/redux/reducers";

const store = createStore(rootReducer, composeWithDevTools());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
    </Provider>
  );
}
