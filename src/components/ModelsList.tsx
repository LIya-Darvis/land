import { useEffect, useState } from "react";
import ModelCard from "./ModelCard";
import { initialModel } from "../hooks/ModelContext";
import { initialSum } from "../hooks/SumContext";
// import "../assets"

export function ModelsList () { 
    const [context_model, updateModel] = useState(initialModel);
    const [context_sum, updateSum] = useState(initialSum);

    let display_total_sum = 0;

    useEffect(() => {
        console.log("?? -> ", context_sum.total_sum)
        display_total_sum = context_sum.total_sum;
      }, [context_sum.total_sum])

    function setModelContext(id: any, path: string, name: string, text: number) {
        switch (id) {
            case 1:
                context_model.path = path
                context_model.name = name
                context_model.x_lenght = 2
                context_model.y_lenght = 4
                context_model.z_lenght = 2
                context_sum.model_sum = text
                break;
            case 2:
                context_model.path = path
                context_model.name = name
                context_model.x_lenght = 2
                context_model.y_lenght = 4
                context_model.z_lenght = 2
                context_sum.model_sum = text
                break;
            case 3:
                context_model.path = path
                context_model.name = name
                context_model.x_lenght = 1
                context_model.y_lenght = 1
                context_model.z_lenght = 1
                context_sum.model_sum = text
                break;
            case 4:
                context_model.path = path
                context_model.name = name
                context_model.x_lenght = 1
                context_model.y_lenght = 1
                context_model.z_lenght = 1
                context_sum.model_sum = text
                break;
            case 5:
                context_model.path = path
                context_model.name = name
                context_model.x_lenght = 1
                context_model.y_lenght = 1
                context_model.z_lenght = 1
                context_sum.model_sum = text
                break;
            case 6:
                context_model.path = path
                context_model.name = name
                context_model.x_lenght = 2
                context_model.y_lenght = 0.05
                context_model.z_lenght = 2
                context_sum.model_sum = text
                break;
        
            default:
                break;
        }
        console.log("=--", context_model.x_lenght, context_model.y_lenght, context_model.z_lenght)
        // updateModel(initialModel);
    }

    return (
        // <div>
            <ul>
                <div onClick={() => setModelContext(1, "src/assets/models/", "tree_1.obj", 15000)}><ModelCard key={"model_1"} id={1} title={"Светлый кипарис"} text={15000}/></div>
                <div onClick={() => setModelContext(2, "src/assets/models/", "tree_2.obj", 11500)}><ModelCard key={"model_2"} id={2} title={"Темный кипарис"} text={11500}/></div>
                <div onClick={() => setModelContext(3, "src/assets/models/", "cactus_in_pot.obj", 250)}><ModelCard key={"model_3"} id={3} title={"Кактус в кашпо"} text={250}/></div>
                <div onClick={() => setModelContext(4, "src/assets/models/", "aloe_in_pot.obj", 280)}><ModelCard key={"model_4"} id={4} title={"Алое в кашпо"} text={280}/></div>
                <div onClick={() => setModelContext(5, "src/assets/models/", "aloe_in_vaza.obj", 350)}><ModelCard key={"model_5"} id={5} title={"Алое в вазе"} text={350}/></div>
                {/* <div onClick={() => setModelContext(5, "src/assets/models/", "tile.obj", 40)}><ModelCard key={"model_5"} id={5} title={"Гравий"} text={40}/></div>
                <div onClick={() => setModelContext(5, "src/assets/models/", "tree_1.obj", 4)}><ModelCard key={"model_5"} id={5} title={"Модель_5"} text={4}/></div>
                <div onClick={() => setModelContext(5, "src/assets/models/", "tree_1.obj", 4)}><ModelCard key={"model_5"} id={5} title={"Модель_5"} text={4}/></div> */}
                {/* <div onClick={() => setModelContext(5, "src/assets/models/", "tree_1.obj", 4)}><ModelCard key={"model_5"} id={5} title={"Модель_5"} text={4}/></div> */}
                {/* <div onClick={() => setModelContext(5, "src/assets/models/", "tree_1.obj", 4)}><ModelCard key={"model_5"} id={5} title={"Модель_5"} text={4}/></div> */}
                {/* <div onClick={() => setModelContext(5, "src/assets/models/", "tree_1.obj", 4)}><ModelCard key={"model_5"} id={5} title={"Модель_5"} text={4}/></div> */}
                {/* <div onClick={() => setModelContext(5, "src/assets/models/", "tree_1.obj", 4)}><ModelCard key={"model_5"} id={5} title={"Модель_5"} text={4}/></div> */}
                {/* <div onClick={() => setModelContext(5, "src/assets/models/", "tree_1.obj", 4)}><ModelCard key={"model_5"} id={5} title={"Модель_5"} text={4}/></div> */}
                {/* <div onClick={() => setModelContext(5, "src/assets/models/", "tree_1.obj", 4)}><ModelCard key={"model_5"} id={5} title={"Модель_5"} text={4}/></div> */}
                {/* <div onClick={() => setModelContext(5, "src/assets/models/", "tree_1.obj", 4)}><ModelCard key={"model_5"} id={5} title={"Модель_5"} text={4}/></div> */}
                {/* <div onClick={() => setModelContext(5, "src/assets/models/", "tree_1.obj", 4)}><ModelCard key={"model_5"} id={5} title={"Модель_5"} text={4}/></div> */}
              </ul>
        // </div>
    );
}

export default ModelsList;


