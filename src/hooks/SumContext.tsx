import { createContext, useContext } from "react";
// import { ReactNode } from "react";
// import * as BABYLON from "@babylonjs/core";

export type ContextSumValue = {
    model_sum: number,
    total_sum: number,
};

export interface Returns {
    context_sum: ContextSumValue
    updateSum: (newSum: ContextSumValue) => void
}

export const initialSum: ContextSumValue = {
    model_sum: 0,
    total_sum: 0,
};

export const SumContext = createContext<Returns>({
    context_sum: initialSum,
    updateSum: (newSum: any) => {
        return console.warn('DefaultContextCallback', newSum);
        // return newSum;
    }
});

export const useSumContext = () => useContext(SumContext);

