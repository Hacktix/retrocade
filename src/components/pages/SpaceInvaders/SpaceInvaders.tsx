import { useEffect, useRef } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import SpaceInvadersEmu, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../core/sys/spaceinvaders/SpaceInvadersEmu";
import EmulatorCanvas from "../../common/EmulatorCanvas/EmulatorCanvas";
import "./SpaceInvaders.css";

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
            <BrowserView className="GameControlsDesktop">
                <button className="GameButton">&lt;</button>
                <button className="GameButton">&gt;</button>
            </BrowserView>
            <div>
                <h2>Space Invaders</h2>
                <br /><br />
                <EmulatorCanvas
                    canvasRef={canvasRef}
                    width={SCREEN_WIDTH}
                    height={SCREEN_HEIGHT}
                />
                <MobileView className="GameControlsMobile">
                    <button className="GameButton">&lt;</button>
                    <button className="GameButton">&gt;</button>
                    <button className="GameButton">⌾</button>
                    <button className="GameButton">⍟</button>
                </MobileView>
            </div>
            <BrowserView className="GameControlsDesktop">
                <button className="GameButton">⌾</button>
                <button className="GameButton">⍟</button>
            </BrowserView>
        </div>
    )
}