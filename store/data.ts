import { create } from 'zustand'

export type User = {
    name: string;
    gender: string;
    weight: string;
    height: string;
    age: string;
    objective: string;
    level: string;
    foodPreference: string;
    foodRestrictions: string;
    numberMeals: string;
    useSuplementation: string;
}

type DataState = {
    user: User
    setPageOne: (data: Omit<User, "gender" | "objective" | "level" | "foodPreference" | 
        "foodRestrictions" | "numberMeals" | "useSuplementation">) => void;
    setPageTwo: (data: Pick<User, "gender" | "objective" | "level" | "foodPreference">) => void;
    setPageThree: (data: Pick<User, "foodRestrictions" | "numberMeals" | "useSuplementation">) => void;
}

export const useDataStore = create<DataState>((set) => ({
    user: {
        name: "",
        gender: "",
        weight: "",
        height: "",
        age: "",
        objective: "",
        level: "",
        foodPreference: "",
        foodRestrictions: "",
        numberMeals: "",
        useSuplementation: ""
    },
    setPageOne: (data) => set((state) => ({ user: {...state.user, ...data} })),
    setPageTwo: (data) => set((state) => ({ user: {...state.user, ...data} })),
    setPageThree: (data) => set((state) => ({ user: {...state.user, ...data} }))

}))