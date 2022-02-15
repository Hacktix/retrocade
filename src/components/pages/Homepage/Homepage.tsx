import ProgressBar from "../../common/ProgressBar/ProgressBar";
import { System, SystemSelection } from "../../common/SystemSelection/SystemSelection";

import SpaceInvadersLogo from "../../../assets/img/spaceinvaders.jpg";

export default function Homepage() {
    const systems: Array<System> = [
        /* { name: "Space Invaders", img: SpaceInvadersLogo, url: "/spaceinvaders" } */
    ]

    return (
        <>
            <p>Welcome to RETROCADE, your favorite browser-based emulator collection.</p>
            <p>This site is currently heavily Work-In-Progress, as it's still in the early stages of being set up. While you're waiting, have a nice cup of tea: 🍵</p>

            <hr />

            <h2>Select your System:</h2>
            {systems.length === 0
                ? <p>Once any systems are available, they will be listed here!</p>
                : <SystemSelection systems={systems} />
            }

            <hr />

            <h2>Roadmap</h2>
            <p>
                There are many plans for systems which should be supported on RETROCADE in the near future.
                The following is a list of what's currently feasible and to be expected, but keep in mind that this is subject to change at any time.
            </p>
            <br />

            <h3>Space Invaders</h3>
            <p>
                One of the most classic arcade games known to man - Space Invaders.
                With it's fairly simple gameplay concept comes a fairly simple system which is relatively easy to emulate.
                Due to this fact (and previous experience with emulating Space Invaders), this game is going to be RETROCADE's premiere.
            </p>
            <div>
                Development Progress:
                <ProgressBar value={0} status="Getting started..." />
            </div>
            <br />

            <h3>Pac-Man</h3>
            <p>
                Just as influential and arguably even more recognizable than Space Invaders, Pac-Man is a close second in the RETROCADE emulation queue.
                While the hardware for the Pac-Man arcade machine is slightly more complex than that of Space Invaders, it is equally well documented.
                This should make Pac-Man a worthy second addition to the RETROCADE library.
            </p>
            <div>
                Development Progress:
                <ProgressBar value={0} />
            </div>
        </>
    )
}