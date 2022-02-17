import i8080 from "./i8080";
import { BranchCondition, Register, RegisterPair } from "./i8080_InstructionEnums";
import { i8080_ADC, i8080_ADD, i8080_ADI, i8080_DAA, i8080_DAD, i8080_DCR, i8080_DCX, i8080_INR, i8080_INX, i8080_SBI, i8080_SUB, i8080_SUI } from "./Instructions/i8080_Arithmetic";
import { i8080_CALL, i8080_Ccond, i8080_Jcond, i8080_JMP, i8080_PCHL, i8080_Rcond, i8080_RET } from "./Instructions/i8080_Branch";
import { i8080_LDA, i8080_LDAX, i8080_LHLD, i8080_LXI, i8080_MOV, i8080_MVI, i8080_SHLD, i8080_STA, i8080_STAX, i8080_XCHG } from "./Instructions/i8080_DataTransfer";
import { i8080_ANA, i8080_ANI, i8080_CMA, i8080_CMP, i8080_CPI, i8080_ORA, i8080_ORI, i8080_RAR, i8080_RLC, i8080_RRC, i8080_STC, i8080_XRA } from "./Instructions/i8080_Logical";
import { i8080_EI, i8080_IN, i8080_OUT, i8080_POP, i8080_PUSH, i8080_XTHL } from "./Instructions/i8080_StackIO";

export class i8080InstructionLUT {
    public table: {[key: number]: (this: i8080) => number};

    constructor(cpu: i8080) {
        this.table = {
            0x00: () => 1,
            0x01: i8080_LXI.bind(cpu, RegisterPair.BC),
            0x02: i8080_STAX.bind(cpu, RegisterPair.BC),
            0x03: i8080_INX.bind(cpu, RegisterPair.BC),
            0x04: i8080_INR.bind(cpu, Register.B),
            0x05: i8080_DCR.bind(cpu, Register.B),
            0x06: i8080_MVI.bind(cpu, Register.B),
            0x07: i8080_RLC,
            0x09: i8080_DAD.bind(cpu, RegisterPair.BC),
            0x0a: i8080_LDAX.bind(cpu, RegisterPair.BC),
            0x0b: i8080_DCX.bind(cpu, RegisterPair.BC),
            0x0c: i8080_INR.bind(cpu, Register.C),
            0x0d: i8080_DCR.bind(cpu, Register.C),
            0x0e: i8080_MVI.bind(cpu, Register.C),
            0x0f: i8080_RRC,
            0x11: i8080_LXI.bind(cpu, RegisterPair.DE),
            0x12: i8080_STAX.bind(cpu, RegisterPair.DE),
            0x13: i8080_INX.bind(cpu, RegisterPair.DE),
            0x14: i8080_INR.bind(cpu, Register.D),
            0x15: i8080_DCR.bind(cpu, Register.D),
            0x16: i8080_MVI.bind(cpu, Register.D),
            0x19: i8080_DAD.bind(cpu, RegisterPair.DE),
            0x1a: i8080_LDAX.bind(cpu, RegisterPair.DE),
            0x1b: i8080_DCX.bind(cpu, RegisterPair.DE),
            0x1c: i8080_INR.bind(cpu, Register.E),
            0x1d: i8080_DCR.bind(cpu, Register.E),
            0x1e: i8080_MVI.bind(cpu, Register.E),
            0x1f: i8080_RAR,
            0x21: i8080_LXI.bind(cpu, RegisterPair.HL),
            0x22: i8080_SHLD,
            0x23: i8080_INX.bind(cpu, RegisterPair.HL),
            0x24: i8080_INR.bind(cpu, Register.H),
            0x25: i8080_DCR.bind(cpu, Register.H),
            0x26: i8080_MVI.bind(cpu, Register.H),
            0x27: i8080_DAA,
            0x29: i8080_DAD.bind(cpu, RegisterPair.HL),
            0x2a: i8080_LHLD,
            0x2b: i8080_DCX.bind(cpu, RegisterPair.HL),
            0x2c: i8080_INR.bind(cpu, Register.L),
            0x2d: i8080_DCR.bind(cpu, Register.L),
            0x2e: i8080_MVI.bind(cpu, Register.L),
            0x2f: i8080_CMA,
            0x31: i8080_LXI.bind(cpu, RegisterPair.SP),
            0x32: i8080_STA,
            0x33: i8080_INX.bind(cpu, RegisterPair.SP),
            0x34: i8080_INR.bind(cpu, Register.M),
            0x35: i8080_DCR.bind(cpu, Register.M),
            0x36: i8080_MVI.bind(cpu, Register.M),
            0x37: i8080_STC,
            0x39: i8080_DAD.bind(cpu, RegisterPair.SP),
            0x3a: i8080_LDA,
            0x3b: i8080_DCX.bind(cpu, RegisterPair.SP),
            0x3c: i8080_INR.bind(cpu, Register.A),
            0x3d: i8080_DCR.bind(cpu, Register.A),
            0x3e: i8080_MVI.bind(cpu, Register.A),
            0x40: i8080_MOV.bind(cpu, Register.B, Register.B),
            0x41: i8080_MOV.bind(cpu, Register.B, Register.C),
            0x42: i8080_MOV.bind(cpu, Register.B, Register.D),
            0x43: i8080_MOV.bind(cpu, Register.B, Register.E),
            0x44: i8080_MOV.bind(cpu, Register.B, Register.H),
            0x45: i8080_MOV.bind(cpu, Register.B, Register.L),
            0x46: i8080_MOV.bind(cpu, Register.B, Register.M),
            0x47: i8080_MOV.bind(cpu, Register.B, Register.A),
            0x48: i8080_MOV.bind(cpu, Register.C, Register.B),
            0x49: i8080_MOV.bind(cpu, Register.C, Register.C),
            0x4a: i8080_MOV.bind(cpu, Register.C, Register.D),
            0x4b: i8080_MOV.bind(cpu, Register.C, Register.E),
            0x4c: i8080_MOV.bind(cpu, Register.C, Register.H),
            0x4d: i8080_MOV.bind(cpu, Register.C, Register.L),
            0x4e: i8080_MOV.bind(cpu, Register.C, Register.M),
            0x4f: i8080_MOV.bind(cpu, Register.C, Register.A),
            0x50: i8080_MOV.bind(cpu, Register.D, Register.B),
            0x51: i8080_MOV.bind(cpu, Register.D, Register.C),
            0x52: i8080_MOV.bind(cpu, Register.D, Register.D),
            0x53: i8080_MOV.bind(cpu, Register.D, Register.E),
            0x54: i8080_MOV.bind(cpu, Register.D, Register.H),
            0x55: i8080_MOV.bind(cpu, Register.D, Register.L),
            0x56: i8080_MOV.bind(cpu, Register.D, Register.M),
            0x57: i8080_MOV.bind(cpu, Register.D, Register.A),
            0x58: i8080_MOV.bind(cpu, Register.E, Register.B),
            0x59: i8080_MOV.bind(cpu, Register.E, Register.C),
            0x5a: i8080_MOV.bind(cpu, Register.E, Register.D),
            0x5b: i8080_MOV.bind(cpu, Register.E, Register.E),
            0x5c: i8080_MOV.bind(cpu, Register.E, Register.H),
            0x5d: i8080_MOV.bind(cpu, Register.E, Register.L),
            0x5e: i8080_MOV.bind(cpu, Register.E, Register.M),
            0x5f: i8080_MOV.bind(cpu, Register.E, Register.A),
            0x60: i8080_MOV.bind(cpu, Register.H, Register.B),
            0x61: i8080_MOV.bind(cpu, Register.H, Register.C),
            0x62: i8080_MOV.bind(cpu, Register.H, Register.D),
            0x63: i8080_MOV.bind(cpu, Register.H, Register.E),
            0x64: i8080_MOV.bind(cpu, Register.H, Register.H),
            0x65: i8080_MOV.bind(cpu, Register.H, Register.L),
            0x66: i8080_MOV.bind(cpu, Register.H, Register.M),
            0x67: i8080_MOV.bind(cpu, Register.H, Register.A),
            0x68: i8080_MOV.bind(cpu, Register.L, Register.B),
            0x69: i8080_MOV.bind(cpu, Register.L, Register.C),
            0x6a: i8080_MOV.bind(cpu, Register.L, Register.D),
            0x6b: i8080_MOV.bind(cpu, Register.L, Register.E),
            0x6c: i8080_MOV.bind(cpu, Register.L, Register.H),
            0x6d: i8080_MOV.bind(cpu, Register.L, Register.L),
            0x6e: i8080_MOV.bind(cpu, Register.L, Register.M),
            0x6f: i8080_MOV.bind(cpu, Register.L, Register.A),
            0x70: i8080_MOV.bind(cpu, Register.M, Register.B),
            0x71: i8080_MOV.bind(cpu, Register.M, Register.C),
            0x72: i8080_MOV.bind(cpu, Register.M, Register.D),
            0x73: i8080_MOV.bind(cpu, Register.M, Register.E),
            0x74: i8080_MOV.bind(cpu, Register.M, Register.H),
            0x75: i8080_MOV.bind(cpu, Register.M, Register.L),
            // 0x76: HALT
            0x77: i8080_MOV.bind(cpu, Register.M, Register.A),
            0x78: i8080_MOV.bind(cpu, Register.A, Register.B),
            0x79: i8080_MOV.bind(cpu, Register.A, Register.C),
            0x7a: i8080_MOV.bind(cpu, Register.A, Register.D),
            0x7b: i8080_MOV.bind(cpu, Register.A, Register.E),
            0x7c: i8080_MOV.bind(cpu, Register.A, Register.H),
            0x7d: i8080_MOV.bind(cpu, Register.A, Register.L),
            0x7e: i8080_MOV.bind(cpu, Register.A, Register.M),
            0x7f: i8080_MOV.bind(cpu, Register.A, Register.A),
            0x80: i8080_ADD.bind(cpu, Register.B),
            0x81: i8080_ADD.bind(cpu, Register.C),
            0x82: i8080_ADD.bind(cpu, Register.D),
            0x83: i8080_ADD.bind(cpu, Register.E),
            0x84: i8080_ADD.bind(cpu, Register.H),
            0x85: i8080_ADD.bind(cpu, Register.L),
            0x86: i8080_ADD.bind(cpu, Register.M),
            0x87: i8080_ADD.bind(cpu, Register.A),
            0x88: i8080_ADC.bind(cpu, Register.B),
            0x89: i8080_ADC.bind(cpu, Register.C),
            0x8a: i8080_ADC.bind(cpu, Register.D),
            0x8b: i8080_ADC.bind(cpu, Register.E),
            0x8c: i8080_ADC.bind(cpu, Register.H),
            0x8d: i8080_ADC.bind(cpu, Register.L),
            0x8e: i8080_ADC.bind(cpu, Register.M),
            0x8f: i8080_ADC.bind(cpu, Register.A),
            0x90: i8080_SUB.bind(cpu, Register.B),
            0x91: i8080_SUB.bind(cpu, Register.C),
            0x92: i8080_SUB.bind(cpu, Register.D),
            0x93: i8080_SUB.bind(cpu, Register.E),
            0x94: i8080_SUB.bind(cpu, Register.H),
            0x95: i8080_SUB.bind(cpu, Register.L),
            0x96: i8080_SUB.bind(cpu, Register.M),
            0x97: i8080_SUB.bind(cpu, Register.A),
            0xa0: i8080_ANA.bind(cpu, Register.B),
            0xa1: i8080_ANA.bind(cpu, Register.C),
            0xa2: i8080_ANA.bind(cpu, Register.D),
            0xa3: i8080_ANA.bind(cpu, Register.E),
            0xa4: i8080_ANA.bind(cpu, Register.H),
            0xa5: i8080_ANA.bind(cpu, Register.L),
            0xa6: i8080_ANA.bind(cpu, Register.M),
            0xa7: i8080_ANA.bind(cpu, Register.A),
            0xa8: i8080_XRA.bind(cpu, Register.B),
            0xa9: i8080_XRA.bind(cpu, Register.C),
            0xaa: i8080_XRA.bind(cpu, Register.D),
            0xab: i8080_XRA.bind(cpu, Register.E),
            0xac: i8080_XRA.bind(cpu, Register.H),
            0xad: i8080_XRA.bind(cpu, Register.L),
            0xae: i8080_XRA.bind(cpu, Register.M),
            0xaf: i8080_XRA.bind(cpu, Register.A),
            0xb0: i8080_ORA.bind(cpu, Register.B),
            0xb1: i8080_ORA.bind(cpu, Register.C),
            0xb2: i8080_ORA.bind(cpu, Register.D),
            0xb3: i8080_ORA.bind(cpu, Register.E),
            0xb4: i8080_ORA.bind(cpu, Register.H),
            0xb5: i8080_ORA.bind(cpu, Register.L),
            0xb6: i8080_ORA.bind(cpu, Register.M),
            0xb7: i8080_ORA.bind(cpu, Register.A),
            0xb8: i8080_CMP.bind(cpu, Register.B),
            0xb9: i8080_CMP.bind(cpu, Register.C),
            0xba: i8080_CMP.bind(cpu, Register.D),
            0xbb: i8080_CMP.bind(cpu, Register.E),
            0xbc: i8080_CMP.bind(cpu, Register.H),
            0xbd: i8080_CMP.bind(cpu, Register.L),
            0xbe: i8080_CMP.bind(cpu, Register.M),
            0xbf: i8080_CMP.bind(cpu, Register.A),
            0xc0: i8080_Rcond.bind(cpu, BranchCondition.NZ),
            0xc1: i8080_POP.bind(cpu, RegisterPair.BC),
            0xc2: i8080_Jcond.bind(cpu, BranchCondition.NZ),
            0xc3: i8080_JMP,
            0xc4: i8080_Ccond.bind(cpu, BranchCondition.NZ),
            0xc5: i8080_PUSH.bind(cpu, RegisterPair.BC),
            0xc6: i8080_ADI,
            0xc8: i8080_Rcond.bind(cpu, BranchCondition.Z),
            0xc9: i8080_RET,
            0xca: i8080_Jcond.bind(cpu, BranchCondition.Z),
            0xcc: i8080_Ccond.bind(cpu, BranchCondition.Z),
            0xcd: i8080_CALL,
            0xd0: i8080_Rcond.bind(cpu, BranchCondition.NC),
            0xd1: i8080_POP.bind(cpu, RegisterPair.DE),
            0xd2: i8080_Jcond.bind(cpu, BranchCondition.NC),
            0xd3: i8080_OUT,
            0xd4: i8080_Ccond.bind(cpu, BranchCondition.NC),
            0xd5: i8080_PUSH.bind(cpu, RegisterPair.DE),
            0xd6: i8080_SUI,
            0xd8: i8080_Rcond.bind(cpu, BranchCondition.C),
            0xda: i8080_Jcond.bind(cpu, BranchCondition.C),
            0xdb: i8080_IN,
            0xdc: i8080_Ccond.bind(cpu, BranchCondition.C),
            0xde: i8080_SBI,
            0xe0: i8080_Rcond.bind(cpu, BranchCondition.PO),
            0xe1: i8080_POP.bind(cpu, RegisterPair.HL),
            0xe2: i8080_Jcond.bind(cpu, BranchCondition.PO),
            0xe3: i8080_XTHL,
            0xe4: i8080_Ccond.bind(cpu, BranchCondition.PO),
            0xe5: i8080_PUSH.bind(cpu, RegisterPair.HL),
            0xe6: i8080_ANI,
            0xe8: i8080_Rcond.bind(cpu, BranchCondition.PE),
            0xe9: i8080_PCHL,
            0xea: i8080_Jcond.bind(cpu, BranchCondition.PE),
            0xeb: i8080_XCHG,
            0xec: i8080_Ccond.bind(cpu, BranchCondition.PE),
            0xf0: i8080_Rcond.bind(cpu, BranchCondition.P),
            0xf1: i8080_POP.bind(cpu, RegisterPair.SP),
            0xf2: i8080_Jcond.bind(cpu, BranchCondition.P),
            0xf4: i8080_Ccond.bind(cpu, BranchCondition.P),
            0xf5: i8080_PUSH.bind(cpu, RegisterPair.SP),
            0xf6: i8080_ORI,
            0xf8: i8080_Rcond.bind(cpu, BranchCondition.M),
            0xfa: i8080_Jcond.bind(cpu, BranchCondition.M),
            0xfb: i8080_EI,
            0xfc: i8080_Ccond.bind(cpu, BranchCondition.M),
            0xfe: i8080_CPI
        }
    }
}
