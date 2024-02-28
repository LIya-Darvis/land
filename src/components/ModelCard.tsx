
// import { useState } from "react";
import { CardType } from "../types/Types";
import "../styles.css"

export const ModelCard = ({ title, text }: CardType) => { 

    return (
        <div className="card-plate">
            <div className="card-title">
                {title}
            </div>
            <div className="card-text">
                {text} рублей
            </div>
        </div>
    );
}

export default ModelCard;
