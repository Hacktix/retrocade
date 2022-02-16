export enum RegisterPair {
    BC = "bc",
    DE = "de",
    HL = "hl",
    SP = "sp"
};

export enum Register {
    A = "a",
    B = "b",
    C = "c",
    D = "d",
    E = "e",
    H = "h",
    L = "l",
    M = "m"
}

export const PARITY_LOOKUP_TABLE = new Array(256).fill(0).map((_,i) => (i.toString(2).split("").filter(v => v === "1").length % 2) === 0);