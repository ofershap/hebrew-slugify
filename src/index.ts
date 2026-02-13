const HEBREW_MAP: Record<string, string> = {
  א: "a",
  ב: "b",
  ג: "g",
  ד: "d",
  ה: "h",
  ו: "v",
  ז: "z",
  ח: "ch",
  ט: "t",
  י: "y",
  כ: "k",
  ך: "k",
  ל: "l",
  מ: "m",
  ם: "m",
  נ: "n",
  ן: "n",
  ס: "s",
  ע: "a",
  פ: "p",
  ף: "p",
  צ: "ts",
  ץ: "ts",
  ק: "k",
  ר: "r",
  ש: "sh",
  ת: "t",
};

const NIQQUD_RANGE_START = 0x0591;
const NIQQUD_RANGE_END = 0x05c7;

interface SlugifyOptions {
  separator?: string;
  lowercase?: boolean;
  transliterate?: boolean;
}

function stripNiqqud(text: string): string {
  let result = "";
  for (const char of text) {
    const code = char.codePointAt(0) ?? 0;
    if (code < NIQQUD_RANGE_START || code > NIQQUD_RANGE_END) {
      result += char;
    }
  }
  return result;
}

function transliterate(text: string): string {
  let result = "";
  for (const char of text) {
    result += HEBREW_MAP[char] ?? char;
  }
  return result;
}

export function hebrewSlugify(
  text: string,
  options: SlugifyOptions = {},
): string {
  const {
    separator = "-",
    lowercase = true,
    transliterate: shouldTransliterate = true,
  } = options;

  let slug = stripNiqqud(text.trim());

  if (shouldTransliterate) {
    slug = transliterate(slug);
  }

  if (lowercase) {
    slug = slug.toLowerCase();
  }

  slug = slug
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, separator)
    .replace(
      new RegExp(`^${escapeRegex(separator)}|${escapeRegex(separator)}$`, "g"),
      "",
    );

  return slug;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
