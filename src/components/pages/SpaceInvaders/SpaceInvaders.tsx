import { useEffect, useRef, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import SpaceInvadersEmu, { SCREEN_HEIGHT, SCREEN_WIDTH, SpaceInvadersInput, SpaceInvadersOption, SpaceInvadersSound } from "../../../core/sys/spaceinvaders/SpaceInvadersEmu";
import { SpaceInvadersSoundMap } from "../../../core/sys/spaceinvaders/SpaceInvadersAudio";
import EmulatorCanvas from "../../common/EmulatorCanvas/EmulatorCanvas";
import useSound from 'use-sound';
import ToggleSwitch from "../../common/ToggleSwitch/ToggleSwitch";
import Dropdown from "../../common/Dropdown/Dropdown";
import EmulatorCleanupManager from "../../../core/base/EmulatorCleanupManager";
import "./SpaceInvaders.css";

import hitSound from "../../../assets/sfx/spaceinvaders/hit.mp3";
import invaderSound1 from "../../../assets/sfx/spaceinvaders/invader1.mp3";
import invaderSound2 from "../../../assets/sfx/spaceinvaders/invader2.mp3";
import invaderSound3 from "../../../assets/sfx/spaceinvaders/invader3.mp3";
import invaderSound4 from "../../../assets/sfx/spaceinvaders/invader4.mp3";
import playerHitSound from "../../../assets/sfx/spaceinvaders/playerhit.mp3";
import shotSound from "../../../assets/sfx/spaceinvaders/shot.mp3";
import ufoSound from "../../../assets/sfx/spaceinvaders/ufo.mp3";
import Slider from "../../common/Slider/Slider";

let emulator: SpaceInvadersEmu | null = null;

let buttonsMashed = 0;
let lastButtonInput = 0;

export default function SpaceInvaders() {
    const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> = useRef(null);
    const [volume, setVolumeValue] = useState(100);

    const soundMap: SpaceInvadersSoundMap = {
        [SpaceInvadersSound.Hit]: useSound(hitSound),
        [SpaceInvadersSound.Invader1]: useSound(invaderSound1),
        [SpaceInvadersSound.Invader2]: useSound(invaderSound2),
        [SpaceInvadersSound.Invader3]: useSound(invaderSound3),
        [SpaceInvadersSound.Invader4]: useSound(invaderSound4),
        [SpaceInvadersSound.PlayerHit]: useSound(playerHitSound),
        [SpaceInvadersSound.Shot]: useSound(shotSound),
        [SpaceInvadersSound.UFO]: useSound(ufoSound)
    };

    function setVolume(vol: number) {
        Object.keys(soundMap).forEach(sound => {
            soundMap[sound as unknown as SpaceInvadersSound][1].sound.volume(vol / 100);
        });
        setVolumeValue(vol);
    }

    useEffect(() => {
        if(canvasRef.current === null)
            return;
        const renderContext = canvasRef.current.getContext("2d");

        // Initialize Emulator
        fetch("/bin/invaders.bin").then(res => res.arrayBuffer().then(data => {
            const rom = new Uint8Array(data);

            // For some god damn reason the sounds only actually play if I keep re-initializing the emulator
            // But keeping around like 10 instances of the emulator is terrible for performance so I just kinda
            // stop them from doing stuff by setting their `halt` property to `true`.
            if(emulator !== null)
                emulator.discard();
            emulator = new SpaceInvadersEmu(rom, renderContext as CanvasRenderingContext2D, soundMap);
            
            window.addEventListener("keydown", pressKeyboardButton);
            window.addEventListener("keyup", unpressKeyboardButton);

            // Cleanup function called when the Space Invaders page is closed
            EmulatorCleanupManager.registerCleanupCallback(() => {
                emulator?.discard();
                emulator = null;
            });
        }))
    }, [soundMap]);

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

        // Easter Egg for TILT if buttons are mashed
        const timestamp = Date.now();
        if(timestamp - lastButtonInput > 500)
            buttonsMashed = 0;
        lastButtonInput = timestamp;
        if(++buttonsMashed === 1500) {
            pressButton(SpaceInvadersInput.Tilt);
            setTimeout(() => unpressButton(SpaceInvadersInput.Tilt), 150);
            buttonsMashed = 0;
        }
    }

    function unpressKeyboardButton(e: KeyboardEvent) {
        // @ts-expect-error: Typescript complains about "string" not being a key of keyboardInputMap because those keys are statically defined,
        //                   but we want to check whether or not it exists, so we *want* to access undefined keys here.
        if(keyboardInputMap[e.key] !== undefined) unpressButton(keyboardInputMap[e.key]);
    }

    function pressButton(input: SpaceInvadersInput) {
        emulator?.setInputState(input, true);
    }

    function unpressButton(input: SpaceInvadersInput) {
        emulator?.setInputState(input, false);
    }


    function setGameOption(option: SpaceInvadersOption, value: any) {
        emulator?.setGameOption(option, value);
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

                <br />

                <h3>Game Options</h3>
                <p><b>Warning:</b> Changing any of these will fully restart the emulator!</p>
                <Slider
                    showValue
                    label="🔈"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                />
                <div className="OptionsContainer">
                    <ToggleSwitch
                        title="Extra Life Score Threshold"
                        leftOption="1500 Points"
                        rightOption="1000 Points"
                        onChange={(e) => setGameOption(SpaceInvadersOption.ExtraShip, e.target.checked)}
                    />
                    <Dropdown title="Starting Lives" onChange={(e) => setGameOption(SpaceInvadersOption.ShipCount, e.target.value)}>
                        <option value={0}>3 Ships</option>
                        <option value={1}>4 Ships</option>
                        <option value={2}>5 Ships</option>
                        <option value={3}>6 Ships</option>
                    </Dropdown>
                    { /* This doesn't actually seem to do anything? idk
                    <ToggleSwitch
                        title="Coin Info on Demo Screen"
                        leftOption="Shown"
                        rightOption="Hidden"
                        onChange={(e) => setGameOption(SpaceInvadersOption.DemoCoinInfo, e.target.checked)}
                    />
                    */ }
                </div>
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