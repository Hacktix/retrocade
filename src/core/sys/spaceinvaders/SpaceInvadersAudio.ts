import { PlayFunction } from "use-sound/dist/types";
import { SpaceInvadersSound } from "./SpaceInvadersEmu";

export type SpaceInvadersSoundMap = {
    [key in SpaceInvadersSound]: PlayFunction
};

export default class SpaceInvadersAudio {

    private soundMap: SpaceInvadersSoundMap;

    private port3: number = 0;
    private port5: number = 0;

    constructor(soundMap: SpaceInvadersSoundMap) {
        this.soundMap = soundMap;
    }

    public write(port: number, value: number) {
        const newSounds = ((port === 3 ? this.port3 : this.port5) ^ value) & value;
        if(port === 3) {
            if((newSounds & (1 << 0)) !== 0) this.soundMap[SpaceInvadersSound.UFO]();
            if((newSounds & (1 << 1)) !== 0) this.soundMap[SpaceInvadersSound.Shot]();
            if((newSounds & (1 << 2)) !== 0) this.soundMap[SpaceInvadersSound.PlayerHit]();
            if((newSounds & (1 << 3)) !== 0) this.soundMap[SpaceInvadersSound.Hit]();
            this.port3 = value;
        }
        else {
            if((newSounds & (1 << 0)) !== 0) this.soundMap[SpaceInvadersSound.Invader1]();
            if((newSounds & (1 << 1)) !== 0) this.soundMap[SpaceInvadersSound.Invader2]();
            if((newSounds & (1 << 2)) !== 0) this.soundMap[SpaceInvadersSound.Invader3]();
            if((newSounds & (1 << 3)) !== 0) this.soundMap[SpaceInvadersSound.Invader4]();
            if((newSounds & (1 << 4)) !== 0) this.soundMap[SpaceInvadersSound.Hit]();
            this.port5 = value;
        }
    }

}