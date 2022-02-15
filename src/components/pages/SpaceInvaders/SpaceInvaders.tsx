import { useEffect, useRef } from "react";
import SpaceInvadersEmu, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../core/sys/spaceinvaders/SpaceInvadersEmu";
import EmulatorCanvas from "../../common/EmulatorCanvas/EmulatorCanvas";

export default function SpaceInvaders() {
    const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> = useRef(null);
    const emuRef: React.MutableRefObject<SpaceInvadersEmu | null> = useRef(null);

    useEffect(() => {
        if(canvasRef.current === null)
            return;
        const renderContext = canvasRef.current.getContext("2d");

        // Initialize Emulator
        fetch("/bin/invaders.bin").then(res => res.arrayBuffer().then(data => {
            const rom = new Uint8Array(data);
            emuRef.current = new SpaceInvadersEmu(rom, renderContext as CanvasRenderingContext2D);
        }))
    }, [canvasRef])

    return (
        <div className="EmulatorContainer">
            <h2>Space Invaders</h2>
            <EmulatorCanvas canvasRef={canvasRef} width={SCREEN_WIDTH} height={SCREEN_HEIGHT} />
        </div>
    )
}