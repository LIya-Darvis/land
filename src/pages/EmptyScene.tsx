
import { useState } from "react";
import { SceneContext, initialScene, useSceneContext } from "../hooks/SceneContext";
import { DisplayGrid, Engine, Scene, StandardMaterial, Texture } from "react-babylonjs";
import { Vector3, Color3 } from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";
import { GridMaterial} from "@babylonjs/materials";
// import * as GUI from 'babylonjs-gui';
import HavokPhysics, { ShapeType } from "../../node_modules/@babylonjs/havok";
import "../styles.css";
import { initialModel } from "../hooks/ModelContext";
// import "@babylonjs/loaders/OBJ/objFileLoader";
import '@babylonjs/loaders/OBJ/objFileLoader'
import 'babylonjs-loaders'
import { initialSum } from "../hooks/SumContext";

// const [context_scene , updateScene] = useState(initialScene);

// const havokInstance = await HavokPhysics();
// const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);

const gravity = new BABYLON.Vector3(0, -9.8, 0);

export let box = undefined;

export const EmptyScene = () => {
    // const { context_scene, updateScene } = useSceneContext();
    const [context_scene , updateScene] = useState(initialScene);
    const [context_model, updateModel] = useState(initialModel);
    const [context_sum , updateSum] = useState(initialSum);

    // const GROUND_SUBDIVISION = 25;
    const GROUND_WIDTH = 60;
    const GROUND_HEIGHT = 60;

     //Переопределим его так, чтобы земля была разделена на сетку 8 * 8 
    const  GROUND_SUBDIVISION = 60
 

    return (

        // <Fragment>
        <div className="scene-canvas">
          <Engine antialias={true} adaptToDeviceRatio={true} canvasId="new_scene" >
            <Scene  onSceneMount={scene => {
                context_scene.this_scene = scene.scene;
                context_scene.this_engine = scene.scene.getEngine();

                // console.log(context_scene.this_scene);
                context_scene.this_scene.clearColor = Color3.FromHexString('#a5e6fa');

                var visible_mat = new BABYLON.StandardMaterial('vis-mat', scene.scene);
                visible_mat.diffuseColor = BABYLON.Color3.FromHexString("#3bb7ff");
                visible_mat.alpha = 0.5;

                var unvisible_mat = new BABYLON.StandardMaterial('unvis-mat', scene.scene);
                unvisible_mat.diffuseColor = BABYLON.Color3.FromHexString("#fff");
                unvisible_mat.alpha = 0.0;

                const ground = BABYLON.MeshBuilder.CreateGround(
                    "ground",
                    { width: GROUND_WIDTH, height: GROUND_HEIGHT, subdivisions: GROUND_SUBDIVISION },
                    context_scene.this_scene,
                )
                
                // groundMaterial.diffuseColor = groundColor
                const groundMaterial = new GridMaterial("ground", scene.scene);
                groundMaterial.majorUnitFrequency = 1;
                groundMaterial.minorUnitVisibility = 0.15;
                groundMaterial.gridRatio = 1;
                groundMaterial.backFaceCulling = false;
                groundMaterial.mainColor = Color3.FromHexString('#38a63e');
                groundMaterial.lineColor = Color3.FromHexString('#60e091');

                ground.material = groundMaterial;

                const size = 2;

                
                box = BABYLON.MeshBuilder.CreateBox(context_model.name, {height: context_model.y_lenght, width: context_model.x_lenght, depth: context_model.z_lenght}, scene.scene)
                box.position = new BABYLON.Vector3(context_model.x_lenght, context_model.y_lenght / 2, context_model.z_lenght)
                box.bakeCurrentTransformIntoVertices()
                box.isPickable = false

                const positions = ground.getVerticesData(BABYLON.VertexBuffer.PositionKind)
                // console.log(positions)

                const snappedPosition = new BABYLON.Vector3()
                box.position = snappedPosition;
                box.material = unvisible_mat;


                // const groundTexture = GUI.AdvancedDynamicTexture.CreateForMesh(ground, TEXTURE_WIDTH, TEXTURE_HEIGHT, false)
                // const panel = new GUI.StackPanel()
                // panel.height = TEXTURE_HEIGHT + 'px'
                // panel.width = TEXTURE_WIDTH + 'px'
                // groundTexture.addControl(panel)

                // for (let i = 0; i < GROUND_SUBDIVISION; i++) {
                //     const row = new GUI.StackPanel()
                //     row.height = TEXTURE_HEIGHT / GROUND_SUBDIVISION + 'px'
                //     // panel.addControl(row)
                //     // row.isVertical = false
                //     for (let j = 0; j < GROUND_SUBDIVISION; j++) {
                //         const block = new GUI.Rectangle()
                //         block.width = TEXTURE_WIDTH / GROUND_SUBDIVISION + 'px'
                //         row.addControl(block)     
                //     }
                // }

                scene.scene.actionManager = new BABYLON.ActionManager(scene.scene);
                scene.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
                  console.log("-> ", evt.sourceEvent.key)
                    if (evt.sourceEvent.key == "Enter") {
                        box.__Enter_Pressed = true;
                    }
                    if (evt.sourceEvent.key == "q") {
                        box.__Q_Pressed = true;
                    }
                    if (evt.sourceEvent.key == "e") {
                        box.__E_Pressed = true;
                    }
                }));

                scene.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (evt) => {
                  if (evt.sourceEvent.key == "Enter") {
                      box.__Enter_Pressed = false;
                  }
                  if (evt.sourceEvent.key == "q") {
                      box.__Q_Pressed = false;
                  }
                  if (evt.sourceEvent.key == "e") {
                      box.__E_Pressed = false;
                  }
              }));

                scene.scene.registerBeforeRender(function(){
                  if(!scene.scene.isReady()) return;

                  if (context_model.name != "") {
                    // console.log(context_sum.total_sum)
                    // box = BABYLON.SceneLoader.ImportMeshAsync("", context_model.path, context_model.name, scene.scene)
                    // box.position = snappedPosition
                  }
          
                  if(box){
                      if(box.__Enter_Pressed) {
                        context_model.name = "";

                      }
                      if(box.__Q_Pressed) {
                        box.rotation.y = -3.14 / 2;
                        // box.__Q_Pressed = false;
                      }
                      if(box.__E_Pressed) {
                        box.rotation.y = 3.14 / 2;
                        // box.__E_Pressed = false;
                      }
                  }
              });

                scene.scene.onPointerMove = function (evt) {

                  var pickingInfo = scene.scene.pick(scene.scene.pointerX, scene.scene.pointerY);
          
                  if (pickingInfo.hit && (pickingInfo.pickedMesh.name === 'ground')) {

                    if (context_model.name != "") {
                      box.material = visible_mat;
                      // c3.logd("pickedpoint", pickingInfo.pickedPoint)
          
                      snappedPosition.x = Math.round(pickingInfo.pickedPoint.x)
                      snappedPosition.y = Math.round(pickingInfo.pickedPoint.y)
                      snappedPosition.z = Math.round(pickingInfo.pickedPoint.z)
                  // box.position = snappedPosition

                    } else {
                      box.material = unvisible_mat;
                    }
                  }
          
                };

                scene.scene.onPointerDown = function (evt) {
                  var pickingInfo = scene.scene.pick(scene.scene.pointerX, scene.scene.pointerY);

                  
          
                  if (pickingInfo.hit && (pickingInfo.pickedMesh.name === 'ground')) {

                    if (context_model.name != "") {
                      // box.material = visible_mat;
                      // c3.logd("pickedpoint", pickingInfo.pickedPoint)
          
                      snappedPosition.x = Math.round(pickingInfo.pickedPoint.x)
                      snappedPosition.y = Math.round(pickingInfo.pickedPoint.y)
                      snappedPosition.z = Math.round(pickingInfo.pickedPoint.z)

                      BABYLON.SceneLoader.ImportMeshAsync("", context_model.path, context_model.name, scene.scene).then ((result: { meshes: string | any[]; }) => {
                        for (let i = 0; i <= result.meshes.length; i++) {
                          if (result != undefined) {
                            result.meshes[i].position = new BABYLON.Vector3(snappedPosition.x + 1, context_model.y_lenght , snappedPosition.z + 1);

                          }
                        }

                        // result.meshes[1].setAbsolutePosition(new BABYLON.Vector3(0, 3, 0));
                      });

                      context_sum.total_sum += context_sum.model_sum;
                      console.log("Sum: ", context_sum.total_sum);


                      } else {
                      // box.material = unvisible_mat;
                    }
                  }

                };

                }


              }>
              <arcRotateCamera
                name="arc"
                target={new Vector3(0, 1, 0)}
                alpha={-Math.PI / 2}
                beta={0.2 + Math.PI / 4}
                wheelPrecision={50}
                radius={14}
                minZ={0.001}
                lowerRadiusLimit={8}
                upperRadiusLimit={100}
                upperBetaLimit={Math.PI / 2}
                position={new Vector3(5, 10, 50)}
                rotation={new Vector3(25, 5, 0)}
              />
              <hemisphericLight
                name="hemi"
                direction={new Vector3(3, 0, -2)}
                
                intensity={0.85}
                // groundColor={Color3.Random()}
              />
              

              {/* <ground
                name="ground"
                width={30}
                height={30}
                subdivisions={100}
                showSubMeshesBoundingBox={true}
                receiveShadows={true}
                position={new Vector3(0, 0, 0)}
                partitioningSubdivisions={10}
                >
                    <standardMaterial
                        name={'ground-mat'}
                        diffuseColor={Color3.FromHexString('#7ef77e')}
                        specularColor={Color3.Black()}
                        
                    />
              </ground> */}


            </Scene>
          </Engine>
        </div>
    //   </Fragment>
        
    );
}

export default EmptyScene;
