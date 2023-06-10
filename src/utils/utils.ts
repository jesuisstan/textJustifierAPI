// to count Words in text
export function countWords(text: string): number {
  const words = text.split(' ');
  return words.length;
}

interface SpecialCharacters {
  [key: string]: string;
}

function replaceSpecialCharacters(text: string): string {
  const specialChars: SpecialCharacters = {
    '’': "'",
    '“': '"',
    '”': '"',
    '‘': "'",
    '–': '-',
    '—': '--',
    '…': '...',
    'œ': 'oe',
    'Œ': 'OE',
    'æ': 'ae',
    'Æ': 'AE',
    'ç': 'c',
    'Ç': 'C',
  };

  let replacedText = text;
  for (const char in specialChars) {
    if (Object.prototype.hasOwnProperty.call(specialChars, char)) {
      replacedText = replacedText.replace(new RegExp(char, 'g'), specialChars[char as keyof SpecialCharacters]);
    }
  }

  return replacedText;
}

// Adding spaces between words
export function justifyText(text: string): string {
  const replacedText = replaceSpecialCharacters(text);

  const lines = replacedText.split('\n');
  const justifiedLines: string[] = [];

  for (const line of lines) {
    const words = line.split(' ');
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      if (currentLine.length + word.length + 1 <= 80) {
        currentLine += ` ${word}`;
      } else {
        const spacesToAdd = 80 - currentLine.length;
        const spaces = ' '.repeat(spacesToAdd);
        currentLine = addSpacesBetweenWords(currentLine, spaces);
        justifiedLines.push(currentLine);
        currentLine = word;
      }
    }

    const spacesToAdd = 80 - currentLine.length;
    const spaces = ' '.repeat(spacesToAdd);
    currentLine = addSpacesBetweenWords(currentLine, spaces);
    justifiedLines.push(currentLine);
  }

  return justifiedLines.join('\n');
}

function addSpacesBetweenWords(line: string, spaces: string): string {
  const words = line.split(' ');
  const gaps = words.length - 1;

  if (gaps === 0) {
    return line;
  }

  const spacesPerGap = Math.floor(spaces.length / gaps);
  const extraSpaces = spaces.length % gaps;

  let newLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const numSpaces = spacesPerGap + (i <= extraSpaces ? 1 : 0);
    newLine += ' '.repeat(numSpaces) + words[i];
  }

  return newLine;
}
