import React, { useContext, useState } from "react";
import { Toast } from "../components/Toast";
import { useQuery } from "react-query";
import * as ApiClient from "../api-client";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "WARNING";
};

type AppContext = {
  isLoggedIn: boolean;
  showToast: (toast: ToastMessage) => void;
};

export const AppContext = React.createContext<AppContext | undefined>(
  undefined
);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const { isError } = useQuery("validateToken", ApiClient.validateToken, {
    retry: false,
  });
  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
        showToast: (toast) => {
          setToast(toast);
        },
      }}
    >
      {toast && <Toast {...toast} onClose={() => setToast(undefined)} />}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
