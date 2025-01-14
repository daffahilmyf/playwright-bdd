import { promises as fs } from 'fs';
import * as path from 'path';

/**
 * Reads the content of a file from the "fixtures" directory.
 * Ensures the file exists before attempting to read it.
 * 
 * @param fileName - The name of the file to read.
 * @returns The content of the file as a string.
 * 
 * @example
 * ```typescript
 * const content = await readFile('cart-contents.json');
 * console.log(content);
 * ```
 */
export default async function (fileName: string): Promise<string> {
    const directory = path.join(process.cwd(), 'fixtures');
    const filePath = path.join(directory, fileName);

    const content = await fs.readFile(filePath, 'utf8');
    return content;
}
