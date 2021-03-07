import ImageUploader from "./uploader";
import React, {useState, useCallback} from "react";
import Picker from "./picker";
import '../styles/app.scss'

function App() {

    let [color, setColor] = useState('');

    const onChangeColor = useCallback((color) => {
        setColor(color)
    }, [])

    return (
        <div className="app">
            <div className="app-container" style={{background: color}}>
                <ImageUploader/>
            </div>

            <Picker onChangeColor={onChangeColor}/>
        </div>
    );
}

export default App;
