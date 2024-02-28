import { createContext, useContext } from "react";

export type ContextModelValue = {
    path: any,
    name: any,
    x_lenght: number,
    y_lenght: number,
    z_lenght: number,
};

export interface Returns {
    context_model: ContextModelValue
    updateModel: (newModel: ContextModelValue) => void
}

export const initialModel: ContextModelValue = {
    path: "",
    name: "",
    x_lenght: 1,
    y_lenght: 0.1,
    z_lenght: 1,
};

export const ModelContext = createContext<Returns>({
    context_model: initialModel,
    updateModel: (newModel: any) => {
        // return console.warn('DefaultContextCallback', newModel);
        return newModel;
    }
});

export const useModelContext = () => useContext(ModelContext);

