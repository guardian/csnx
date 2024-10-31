type ConsoleMessageType = 'info' | 'log' | 'debug' | 'warn' | 'error';

export function suppressConsoleMessage(type: ConsoleMessageType) {
	jest.spyOn(console, type).mockImplementation(() => jest.fn());
}

export function restoreConsoleMessage(type: ConsoleMessageType) {
	jest.spyOn(console, type).mockRestore();
}
