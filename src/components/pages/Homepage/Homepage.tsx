import ProgressBar from "../../common/ProgressBar/ProgressBar";
import { System, SystemSelection } from "../../common/SystemSelection/SystemSelection";
import TodoCards from "../../common/TodoCards/TodoCards";
import TodoCard from "../../common/TodoCards/TodoCard";

import "./Homepage.css";

import SpaceInvadersLogo from "../../../assets/img/spaceinvaders.jpg";

export default function Homepage() {
    const systems: Array<System> = [
        { name: "Space Invaders", img: SpaceInvadersLogo, url: "/spaceinvaders" }
    ]

    return (
        <>
            <h2>Select your System:</h2>
            {systems.length === 0
                ? <p>Once any systems are available, they will be listed here!</p>
                : <SystemSelection systems={systems} />
            }
            <hr />
            
            <h3>What's this?</h3>
            <p>
                RETROCADE is a website which aims to bring you a collection of emulators for retro consoles and arcade machines directly in your browser, no downloads required.
                Additionally, RETROCADE is made to be fully optimized and compatible with all kinds of portable devices, so you can fulfill your retro gaming needs on the go too!
            </p>
            <br />

            <h3>What can it do?</h3>
            <p>
                Currently, the only supported game is the Arcade version of Space Invaders, however, it's playable with accurate game options, fully implemented controls for both
                Desktop and Mobile play as well as color display and sound.
                <br/>
                For a list of games/consoles which are planned to be featured on RETROCADE in the future, check the Roadmap further down.
            </p>
            <br />

            <h3>Contact</h3>
            <p>
                If you like RETROCADE and/or want to get notifications on updates, feel free to join our Discord Server!
                It's the home of RETROCADE as well as a few other projects I'm working on, so maybe you'll find something else that's interesting to you too!
            </p>
            <a href="https://discord.gg/FZbJyn7tBm">
                <img src="https://discordapp.com/api/guilds/943239712137691186/widget.png?style=banner3" alt="Discord Widget" />
            </a>

            <hr />

            <h2>Roadmap</h2>
            <p>
                There are many plans for systems which should be supported on RETROCADE in the near future.
                The following is a list of what's currently feasible and to be expected, but keep in mind that this is subject to change at any time.
            </p>
            <br />
            
            <div className="GameBannerContainer">
                <img className="GameBanner" src="https://i.imgur.com/JTjCJa4.png" alt="Space Invaders" />
            </div>
            <p>
                One of the most classic arcade games known to man - Space Invaders.
                With it's fairly simple gameplay concept comes a fairly simple system which is relatively easy to emulate.
                Due to this fact (and previous experience with emulating Space Invaders), this game is going to be RETROCADE's premiere.
            </p>
            <div>
                Development Progress:
                <ProgressBar value={85} />
            </div>
            <TodoCards>
                <TodoCard text="Memory Bus Emulation" done/>
                <TodoCard text="Intel 8080 CPU Core" done/>
                <TodoCard text="Bitmap Display" done/>
                <TodoCard text="Shift Register Emulation" done/>
                <TodoCard text="Button Inputs" done/>
                <TodoCard text="Dip Switch Options" done/>
                <TodoCard text="Audio Output"/>
                <TodoCard text="CRT Shader"/>
            </TodoCards>
            <br />

            <div className="GameBannerContainer">
                <img className="GameBanner" src="https://i.imgur.com/CQaasDP.png" alt="Pac-Man" />
            </div>
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