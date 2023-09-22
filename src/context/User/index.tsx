"use client";
import { createContext, FC, useEffect, useReducer } from 'react';

interface UserProps {
  children: React.ReactNode;
}

type InitialState = {
  id?: string;
  name?: string;
  type: "student" | "employee" | "";
  submittedAt?: string;
} & (Student | Employee | { type: "" });

type Student = {
  type: "student";
  rollNumber: string;
  branch: string;
  semester: string;
  createdAt?: string;
};

type Employee = {
  type: "employee";
  age: number;
  workExperience: number;
  orgName: string;
  gender: "Male" | "Female";
  createdAt?: string;
};

type Context = {
  user: InitialState;
  dispatch: React.Dispatch<any>;
};

const initialState: InitialState = {
  id: "",
  name: "",
  type: "",
};

export const UserContext = createContext<Context>({
  user: initialState,
  dispatch: () => null,
});

function reducer(state: InitialState, action: any) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}

const User: FC<UserProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "SET_USER", payload: JSON.parse(user) });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user: state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export type { InitialState as UserState };
export default User;
