import { useState } from "react"

import LevelContext from "./levelContext"

export default function LevelState({ children }) {
    const [levelState, setLevelState] = useState({
        level: null
    });


    return (
        <LevelContext.Provider value={{ levelState, setLevelState }}>
            {children}
        </LevelContext.Provider>
    )
};