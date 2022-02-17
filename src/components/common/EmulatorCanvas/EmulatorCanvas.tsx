import "./EmulatorCanvas.css";

type EmulatorCanvasProps = {
    width: number,
    height: number,
    maxWidthCover?: number,
    maxHeightCover?: number,
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
}

export default function EmulatorCanvas(props: EmulatorCanvasProps) {
    const mw = Math.round(window.innerWidth * (props.maxWidthCover || 0.9));
    const mh = Math.round(window.innerHeight * (props.maxHeightCover || 0.6));
    const ar = props.width / props.height;
    const scaledSize = (mw / props.width) < (mh / props.height)
        ? { width: mw, height: Math.round(mw / ar) }
        : { width: Math.round(mh * ar), height: mh};
        
    return (
        <div className="EmulatorCanvasContainer">
            <canvas
                className="EmulatorCanvas"
                ref={props.canvasRef}
                width={props.width}
                height={props.height}
                style={scaledSize}
            />
        </div>
    );
}