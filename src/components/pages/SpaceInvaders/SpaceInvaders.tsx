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
        "Shift": SpaceInvadersInput.Credit,
        "Enter": SpaceInvadersInput.Start1P
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
            <BrowserView className="GameControlsDesktop" style={{alignItems: "flex-end"}}>
                <button
                    onMouseDown={() => pressButton(SpaceInvadersInput.Left)}
                    onMouseUp={() => unpressButton(SpaceInvadersInput.Left)}
                    className="GameButtonDesktop"
                >&lt;</button>
                <button
                    onMouseDown={() => pressButton(SpaceInvadersInput.Right)}
                    onMouseUp={() => unpressButton(SpaceInvadersInput.Right)}
                    className="GameButtonDesktop"
                >&gt;</button>
                <button
                    onMouseDown={() => pressButton(SpaceInvadersInput.Start1P)}
                    onMouseUp={() => unpressButton(SpaceInvadersInput.Start1P)}
                    className="GameButtonDesktop"
                >1P</button>
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
                        className="GameButtonMobile"
                    >&lt;</button>
                    <button
                        onTouchStart={() => pressButton(SpaceInvadersInput.Right)}
                        onTouchEnd={() => unpressButton(SpaceInvadersInput.Right)}
                        className="GameButtonMobile"
                    >&gt;</button>
                    <button
                        onTouchStart={() => pressButton(SpaceInvadersInput.Start1P)}
                        onTouchEnd={() => unpressButton(SpaceInvadersInput.Start1P)}
                        className="GameButtonMobile"
                    >1P</button>
                    <button
                        onTouchStart={() => pressButton(SpaceInvadersInput.Start2P)}
                        onTouchEnd={() => unpressButton(SpaceInvadersInput.Start2P)}
                        className="GameButtonMobile"
                    >2P</button>
                    <button
                        onTouchStart={() => pressButton(SpaceInvadersInput.Credit)}
                        onTouchEnd={() => unpressButton(SpaceInvadersInput.Credit)}
                        className="GameButtonMobile"
                    >⍟</button>
                    <button
                        onTouchStart={() => pressButton(SpaceInvadersInput.Fire)}
                        onTouchEnd={() => unpressButton(SpaceInvadersInput.Fire)}
                        className="GameButtonMobile"
                    >⌾</button>
                </MobileView>
                <BrowserView>
                    <p>
                        <b>Keyboard Controls:</b><br />
                        Arrow Keys - Move Left / Right<br />
                        Space - Shoot / Start Game<br />
                        Shift - Insert Coin<br />
                        Enter - Start Game (1P)<br />
                    </p>
                </BrowserView>
            </div>
            <BrowserView className="GameControlsDesktop" style={{alignItems: "flex-start"}}>
                <button
                    onMouseDown={() => pressButton(SpaceInvadersInput.Fire)}
                    onMouseUp={() => unpressButton(SpaceInvadersInput.Fire)}
                    className="GameButtonDesktop"
                >⌾</button>
                <button
                    onMouseDown={() => pressButton(SpaceInvadersInput.Credit)}
                    onMouseUp={() => unpressButton(SpaceInvadersInput.Credit)}
                    className="GameButtonDesktop"
                >⍟</button>
                <button
                    onMouseDown={() => pressButton(SpaceInvadersInput.Start2P)}
                    onMouseUp={() => unpressButton(SpaceInvadersInput.Start2P)}
                    className="GameButtonDesktop"
                >2P</button>
            </BrowserView>
        </div>
    )
}