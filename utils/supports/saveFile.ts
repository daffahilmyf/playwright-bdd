import { promises as fs } from 'fs';
import * as path from 'path';

/**
 * Saves the provided content to a file in the "fixtures" directory.
 * Ensures the directory exists before writing the file.
 * 
 * @param fileName - The name of the file to save.
 * @param content - The content to write to the file.
 * 
 * @example
 * ```typescript
 * await saveFile('cart-contents.json', JSON.stringify([
 *   { name: 'Sauce Labs Backpack', price: 29.99 }
 * ]));
 * ```
 */
export default async function (fileName: string, content: string): Promise<void> {
    const directory = path.join(process.cwd(), 'fixtures');
    const filePath = path.join(directory, fileName);
    const subdirectory = path.dirname(filePath);

    await fs.mkdir(subdirectory, { recursive: true });
    await fs.writeFile(filePath, content, 'utf8');
}