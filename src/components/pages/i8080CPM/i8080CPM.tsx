import { useEffect, useRef } from "react";
import i8080CPMEmu from "../../../core/sys/i8080_cpm/i8080CPM";

export default function I8080CPM() {
    const emuRef: React.MutableRefObject<i8080CPMEmu | null> = useRef(null);

    useEffect(() => {
        // Initialize Emulator
        fetch("/bin/i8080cpm/cpudiag.bin").then(res => res.arrayBuffer().then(data => {
            const rom = new Uint8Array(data);
            emuRef.current = new i8080CPMEmu(rom);
        }));
    });

    return (
        <div className="EmulatorContainer">
            <p>Heavily WIP 8080-based CP/M Emulator. Check the Developer Console for output!</p>
        </div>
    )
}