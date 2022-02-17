export default class SpaceInvadersShiftReg {

    private shiftValue: number = 0;
    private offset: number = 0;

    public write(port: number, value: number): void {
        switch(port) {
            case 2:
                this.offset = value;
                break;
            case 4:
                this.shiftValue = (this.shiftValue >> 8) | (value << 8);
                break;
            default:
                throw new Error(`EMULATOR ERROR: Shift Register received write on in valid port ${port}`);
        }
    }

    public read(): number {
        return (this.shiftValue >> (8 - this.offset)) & 0xff;
    }
}