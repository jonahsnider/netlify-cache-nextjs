/**
 * Says hello world.
 * @param subject What the subject of the message is.
 * @returns Hello world message
 */
export function helloWorld(subject?: string): string {
	return `Hello, ${subject ?? 'world'}.`;
}
