import React, {useState, useEffect, useRef} from 'react';
import '../../styles/picker.scss'

function Picker(props) {
    let {onChangeColor} = props;
    const [canvas, setCanvas] = useState(null);
    const [isHover, setIsHover] = useState(false);
    const [colorHex, setColorHex] = useState(null);
    const zoomEl = useRef(null);
    const pickerEl = useRef(null);

    useEffect(() => {
        window.addEventListener('mousemove', handelMove, false);
        window.addEventListener('mousedown', handelClick, false);
        return function () {
            window.removeEventListener('mousemove', handelMove);
            window.removeEventListener('mousedown', handelClick);
        }
    }, [colorHex, canvas, isHover]);

    const handelClick = () => {
        if(isHover) {
            onChangeColor(colorHex);
        }
    }

    const zoom = (canvas, x, y) => {
        let ctx = zoomEl.current.getContext('2d');
        ctx.drawImage(canvas,
            Math.abs(x - 5),
            Math.abs(y - 5),
            10, 10,
            0, 0,
            200, 200)
    }

    const pick = (ctx, x, y) => {
        const pixel = zoomEl.current.getContext('2d').getImageData(150, 75, 1, 1);
        const data = pixel.data;
        const hex = rgbToHex(data[0], data[1], data[2])
        setColorHex(hex);
    }

    const componentToHex = (c) => {
        let hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    const rgbToHex = (r, g, b) => {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    const handelMove = (e) => {
        let canvasEl = e.target.closest('#canvas') || null;
        if (canvasEl) {
            setCanvas(canvasEl);
        }
        if (canvas && (canvas || e.target.closest('.picker'))) {
            const left = canvas.offsetLeft
            const top = canvas.offsetTop
            const x = e.pageX - left;
            const y = e.pageY - top;
            if (x >= 0 && y >= 0 && x <= canvas.width && y <= canvas.height) {
                setIsHover(true);
                pickerEl.current.style.transform = `translate(${e.pageX - 50}px, ${e.pageY - 50}px)`;
                zoom(canvas, x, y);
                pick(canvas.getContext('2d'), x, y);
            } else {
                setIsHover(false)
            }

        }
    }

    return (
        <div className="picker" ref={pickerEl}>
            {isHover ?
                <>
                    <canvas id="zoom" ref={zoomEl}/>
                    {colorHex ?
                        <div className="color-hex">
                            {colorHex}
                        </div>
                        :
                        ''
                    }
                </>

                :
                ""
            }
        </div>


    )
}

export default Picker;