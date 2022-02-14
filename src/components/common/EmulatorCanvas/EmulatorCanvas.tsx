import "./EmulatorCanvas.css";

type EmulatorCanvasProps = {
    width: number,
    height: number,
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
}

export default function EmulatorCanvas(props: EmulatorCanvasProps) {
    return (
        <div className="EmulatorCanvasContainer">
            <canvas
                className="EmulatorCanvas"
                ref={props.canvasRef}
                width={props.width}
                height={props.height}
            />
        </div>
    );
}