import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import userSlice from "./Slices/userSlice"
import canvasSlice from "./Slices/canvasSlice"

const persistConfig = {
  key: "user",
  storage,
};

export type RootState = ReturnType<typeof store.getState>;

const persistedUserReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
  reducer : {
    user : persistedUserReducer,
    canvas : canvasSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
})

export const persistor = persistStore(store);
export default store