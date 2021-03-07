import React, {useRef} from "react";

function Url(props) {
    let {onChange} = props;

    const inputEl = useRef(null);

    const handelUpload = () => {
        onChange(inputEl.current.value)
    }

    return (
        <div className="uploader-url">
            <input className="url" ref={inputEl} placeholder='https://unsplash.com/s/photos/image'/>
            <button className="btn" onClick={handelUpload}>Upload</button>
        </div>
    )
}

export default Url;