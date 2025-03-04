"use client";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDone, setDone] = useState(false);

  return (
    <ModalContext.Provider
      value={{ isModalOpen, setIsModalOpen, isDone, setDone }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
