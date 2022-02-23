export default abstract class EmulatorCleanupManager {

    private static cleanupCallbacks: Function[] = [];

    public static registerCleanupCallback(func: Function) {
        EmulatorCleanupManager.cleanupCallbacks.push(func);
    }

    public static cleanup() {
        while(EmulatorCleanupManager.cleanupCallbacks.length > 0)
            (EmulatorCleanupManager.cleanupCallbacks.pop() as Function)();
    }

}