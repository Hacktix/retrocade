import { useEffect, useRef } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import SpaceInvadersEmu, { SCREEN_HEIGHT, SCREEN_WIDTH, SpaceInvadersInput } from "../../../core/sys/spaceinvaders/SpaceInvadersEmu";
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
            
            window.addEventListener("keydown", pressKeyboardButton);
            window.addEventListener("keyup", unpressKeyboardButton);
        }))
    }, [canvasRef]);

    const keyboardInputMap = {
        "ArrowLeft": SpaceInvadersInput.Left,
        "ArrowRight": SpaceInvadersInput.Right,
        " ": SpaceInvadersInput.Fire,
        "Shift": SpaceInvadersInput.Credit
    };

    function pressKeyboardButton(e: KeyboardEvent) {
        // @ts-expect-error: Typescript complains about "string" not being a key of keyboardInputMap because those keys are statically defined,
        //                   but we want to check whether or not it exists, so we *want* to access undefined keys here.
        if(keyboardInputMap[e.key] !== undefined) pressButton(keyboardInputMap[e.key]);
    }

    function unpressKeyboardButton(e: KeyboardEvent) {
        // @ts-expect-error: Typescript complains about "string" not being a key of keyboardInputMap because those keys are statically defined,
        //                   but we want to check whether or not it exists, so we *want* to access undefined keys here.
        if(keyboardInputMap[e.key] !== undefined) unpressButton(keyboardInputMap[e.key]);
    }

    function pressButton(input: SpaceInvadersInput) {
        if(emuRef.current)
            emuRef.current.setInputState(input, true);
    }

    function unpressButton(input: SpaceInvadersInput) {
        if(emuRef.current)
            emuRef.current.setInputState(input, false);
    }

    return (
        <div className="EmulatorContainer">
            <BrowserView className="GameControlsDesktop">
                <button
                    onMouseDown={() => pressButton(SpaceInvadersInput.Left)}
                    onMouseUp={() => unpressButton(SpaceInvadersInput.Left)}
                    className="GameButton"
                >&lt;</button>
                <button
                    onMouseDown={() => pressButton(SpaceInvadersInput.Right)}
                    onMouseUp={() => unpressButton(SpaceInvadersInput.Right)}
                    className="GameButton"
                >&gt;</button>
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
                    <button
                        onTouchStart={() => pressButton(SpaceInvadersInput.Left)}
                        onTouchEnd={() => unpressButton(SpaceInvadersInput.Left)}
                        className="GameButton"
                    >&lt;</button>
                    <button
                        onTouchStart={() => pressButton(SpaceInvadersInput.Right)}
                        onTouchEnd={() => unpressButton(SpaceInvadersInput.Right)}
                        className="GameButton"
                    >&gt;</button>
                    <button
                        onTouchStart={() => pressButton(SpaceInvadersInput.Fire)}
                        onTouchEnd={() => unpressButton(SpaceInvadersInput.Fire)}
                        className="GameButton"
                    >⌾</button>
                    <button
                        onTouchStart={() => pressButton(SpaceInvadersInput.Credit)}
                        onTouchEnd={() => unpressButton(SpaceInvadersInput.Credit)}
                        className="GameButton"
                    >⍟</button>
                </MobileView>
            </div>
            <BrowserView className="GameControlsDesktop">
                <button
                    onMouseDown={() => pressButton(SpaceInvadersInput.Fire)}
                    onMouseUp={() => unpressButton(SpaceInvadersInput.Fire)}
                    className="GameButton"
                >⌾</button>
                <button
                    onMouseDown={() => pressButton(SpaceInvadersInput.Credit)}
                    onMouseUp={() => unpressButton(SpaceInvadersInput.Credit)}
                    className="GameButton"
                >⍟</button>
            </BrowserView>
        </div>
    )
}