import { useEffect, useRef } from "react";
import EmulatorCanvas from "../../common/EmulatorCanvas/EmulatorCanvas";

const SCREEN_WIDTH = 224;
const SCREEN_HEIGHT = 256;

export default function SpaceInvaders() {
    const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> = useRef(null);
    useEffect(() => {
        if(canvasRef.current === null)
            return;

        // Initialize canvas
        const ctx = (canvasRef.current.getContext("2d") as CanvasRenderingContext2D);
        const bitmap = ctx.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
        for(let i = 3; i < bitmap.data.length; i+= 4) {
            bitmap.data[i] = 255;
        }
        ctx.putImageData(bitmap, 0, 0);

        // TODO: Initialize Emulator
    }, [canvasRef])

    return (
        <div className="EmulatorContainer">
            <h2>Space Invaders</h2>
            <EmulatorCanvas canvasRef={canvasRef} width={SCREEN_WIDTH} height={SCREEN_HEIGHT} />
        </div>
    )
}