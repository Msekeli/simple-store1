import { create } from "zustand";

export const useToastStore = create((set) => ({
  message: "",
  type: "success",

  showToast: (msg, type = "success") => {
    set({ message: msg, type });

    setTimeout(() => set({ message: "" }), 2000);
  },
}));
