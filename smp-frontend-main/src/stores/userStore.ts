import { create } from "zustand";
import { User } from "../types/User";

interface UserState {
  user: User;
  allUsers: User[];
  setUser: (u: User) => void;
  setAllUsers: (users: User[]) => void;
}

export const initialState: User = {
  id: undefined,
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  imageURL: "",
  active: false,
  joinedDate: "",
};

export const useUserStore = create<UserState>()((set) => ({
  user: initialState,
  allUsers: [],
  setUser: (u) => set(() => ({ user: u })),
  setAllUsers: (users) => set(() => ({ allUsers: users })),
}));
