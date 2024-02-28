import { useRef, useState } from "react";
import { SceneContext, initialScene } from "../hooks/SceneContext";
import EmptyScene from "./EmptyScene";
// import * as BABYLON from "@babylonjs/core";
import "../styles.css";
import { ModelContext, initialModel } from "../hooks/ModelContext";
import ModelsList from "../components/ModelsList";
import { SumContext, initialSum } from "../hooks/SumContext";

function SumPanel() {
  const [context_sum, updateSum] = useState(initialSum);
  // const [ref, setRef] = useState();

  // useDebugValue(context_sum.total_sum);
  // updateSum(context_sum);

  return <div className="sum-panel" >
    {context_sum.total_sum} руб.
  </div> 
}

export const ScenePage = () => {

    const [context_scene, updateScene] = useState(initialScene);
    const [context_model, updateModel] = useState(initialModel);
    const [context_sum, updateSum] = useState(initialSum);
    // const this_scene = context_scene.this_scene;
    // const this_engine = context_scene.this_engine;
    const [open, setOpen] = useState(false);
    // console.log("--", this_scene)  

    // const total_sum_ref = useRef<number>(0);

    // let display_total_sum = 0;

    // useEffect(() => {
    //   // console.log("?? -> ", context_sum.total_sum)
    //   ref.current = context_sum.total_sum;
    // }, [context_sum])

    // let display_total_sum = 0;

    window.onclick = function() {
      // updateSum(context_sum);
      // setOpen(false)
      console.log("?? -> ", context_sum.total_sum);
      // context_sum.total_sum += context_sum.model_sum;
      // updateSum(context_sum);
      // setOpen(true);
      // display_total_sum += 1;
      // total_sum_ref.current = display_total_sum;
    }

    function check_sum() {
      // setOpen(false);
      updateSum(context_sum);
      setOpen(true);
      
    }

    

     

    return (
        <div>
          <SumContext.Provider value={{context_sum, updateSum}}>
            <ModelContext.Provider value={{context_model, updateModel}}>
              <div className="side-panel">
                <ModelsList>

                </ModelsList>
              </div>
              {!open && (
                <button className="sum-button" onClick={check_sum}>Подсчитать</button>
              )}
              {open && (
                <SumPanel></SumPanel>   

              ) }

              <SceneContext.Provider value={{context_scene, updateScene}}>
                  
                    <EmptyScene />
                  
              </SceneContext.Provider>

            </ModelContext.Provider>
          </SumContext.Provider>
            
        </div>
    );
}

export default ScenePage;
