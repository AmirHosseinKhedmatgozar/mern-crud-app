import { createContext, useContext, useState } from "react";

const AddFormContext = createContext();
function AddFormProvider({ children }) {
  const [openAddForm, setOpenAddForm] = useState(false);
  return (
    <AddFormContext.Provider value={{ openAddForm, setOpenAddForm }}>
      {children}
    </AddFormContext.Provider>
  );
}
function useAddForm() {
  const context = useContext(AddFormContext);
  if (context === undefined)
    throw new Error("AddFormContext was used outside of AddFormProvider");
  return context;
}
export { AddFormProvider, useAddForm };
