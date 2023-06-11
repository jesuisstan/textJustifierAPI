import crypto from 'crypto';

// Функция для генерации токена на основе email
export function generateToken(email: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(email);
  const token = hash.digest('hex');
  return token;
}

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
        currentLine = padStringWithSpaces(currentLine)
        justifiedLines.push(currentLine);
        
        currentLine = word;
      }
    }

    currentLine = padStringWithSpaces(currentLine)

    justifiedLines.push(currentLine);

  }

  return justifiedLines.join('\n');
}

function padStringWithSpaces(input: string): string {
  const maxLength = 80;

  if (input.length >= maxLength) {
    return input;
  }

  const words = input.split(' ');
  const wordCount = words.length;
  let spacesToAdd = maxLength - input.length + wordCount - 1;

  let paddedString = '';
  for (let i = 0; i < wordCount; i++) {
    paddedString += words[i];

    if (i < wordCount - 1) {
      const spaces = Math.ceil(spacesToAdd / (wordCount - i - 1));
      paddedString += ' '.repeat(spaces);
      spacesToAdd -= spaces;
    }
  }

  return paddedString;
}