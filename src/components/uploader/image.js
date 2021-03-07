import React, {useRef, useEffect} from "react";

function Image(props) {

    let {url} = props;
    const imageEl = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const image = imageEl.current;
        if (image) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            image.onload = function () {
                image.style.display = 'block';
                ctx.canvas.width = image.clientWidth;
                ctx.canvas.height = image.clientHeight;
                ctx.drawImage(image, 0, 0);
                image.style.display = 'none';
            };
        }

    }, [imageEl, canvasRef, url]);

    return (
        <div className="preview">
            {url ?
                <>
                    <img src={url} alt="Native Image" ref={imageEl} crossOrigin="anonymous"/>
                    <canvas id="canvas" ref={canvasRef}/>
                </>
                :
                ""}

        </div>
    )
}

export default Image;