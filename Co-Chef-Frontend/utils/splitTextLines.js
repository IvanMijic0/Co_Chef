export const splitTextIntoLines = (text, maxWidth, context) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words.shift();

    for (const word of words) {
        const width = context.measureText(`${currentLine} ${word}`).width;
        if (width < maxWidth) {
            currentLine += ` ${word}`;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }

    lines.push(currentLine);
    return lines;
}