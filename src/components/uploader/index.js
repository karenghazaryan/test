import React, {useCallback, useState} from "react";
import Url from "./url";
import Image from "./image";
import '../../styles/preview.scss'

function ImageUploader() {

    let [url, setUrl] = useState('https://uploads8.wikiart.org/temp/3fdf121e-20b2-48f5-a5b3-4f53dc55c498.jpg!Portrait.jpg');

    const onChange = useCallback((url) => {
        setUrl(url)
    }, [])

    return (
        <>
            <div className="image-uploader-container">
                <Url onChange={onChange}/>
                <Image url={url}/>
            </div>
        </>

    )
}

export default ImageUploader;