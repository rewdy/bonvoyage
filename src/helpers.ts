import { cancel } from "@clack/prompts";
import chalk, { type ChalkInstance } from "chalk";
import { BANNER, SHIP } from "./constants";

/**
 * Handles user cancellation by displaying a message and exiting the process.
 */
export function doCancel() {
  cancel(chalk.yellow("Operation cancelled. Exiting... ✌️"));
  process.exit(0);
}

function isHexColor(color: string): boolean {
  const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  return hexRegex.test(color);
}

function isRgbColor(color: string): [number, number, number] | undefined {
  const match = color.match(
    /^rgb\(\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*,\s*([01]?\d\d?|2[0-4]\d|25[0-5])\s*\)$/,
  );
  if (!match) return undefined;

  const [r, g, b] = match.slice(1, 4).map(Number);
  return [r, g, b] as [number, number, number];
}

/**
 * Helper function that takes a string to be used as a CSS color value. If it's
 * hex or rgb, we'll return a chalk instance with the background set to that color.
 *
 * If it's something else, we'll return you your string back unchanged.
 */
export function colorizeColorString(
  color: string,
  fallbackWrapper?: (input: string) => ChalkInstance | string,
): ChalkInstance | string {
  if (isHexColor(color)) {
    return chalk.bgHex(color)(color);
  } else {
    const rgbResult = isRgbColor(color);
    if (rgbResult) {
      const [r, g, b] = rgbResult;
      return chalk.bgRgb(r, g, b)(color);
    }
  }
  // Not a known color format (maybe a named color).. but we don't care. 👋
  return fallbackWrapper ? fallbackWrapper(color) : color;
}

// Basic ANSI stripper so we can measure visible width without losing color codes.
// biome-ignore lint: ESC is required to strip ANSI sequences
const ansiRegex = /\x1B\[[0-9;]*[ -/]*[@-~]/g;
const emojiRegex = /(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\uFE0F)/u;
const combiningRegex = /[\p{Mark}\p{Cf}]/u;

const graphemeSegmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : undefined;

function isFullwidthCodePoint(codePoint: number): boolean {
  return (
    codePoint >= 0x1100 &&
    (codePoint <= 0x115f ||
      codePoint === 0x2329 ||
      codePoint === 0x232a ||
      (codePoint >= 0x2e80 && codePoint <= 0xa4cf && codePoint !== 0x303f) ||
      (codePoint >= 0xac00 && codePoint <= 0xd7a3) ||
      (codePoint >= 0xf900 && codePoint <= 0xfaff) ||
      (codePoint >= 0xfe10 && codePoint <= 0xfe19) ||
      (codePoint >= 0xfe30 && codePoint <= 0xfe6f) ||
      (codePoint >= 0xff00 && codePoint <= 0xff60) ||
      (codePoint >= 0xffe0 && codePoint <= 0xffe6) ||
      (codePoint >= 0x1f300 && codePoint <= 0x1f64f) ||
      (codePoint >= 0x1f900 && codePoint <= 0x1f9ff))
  );
}

function graphemeWidth(grapheme: string): number {
  const codePoint = grapheme.codePointAt(0);
  if (codePoint === undefined) return 0;
  if (combiningRegex.test(String.fromCodePoint(codePoint))) return 0;
  if (emojiRegex.test(grapheme)) return 2;
  if (isFullwidthCodePoint(codePoint)) return 2;
  return 1;
}

function visibleWidth(input: string): number {
  const clean = input.replace(ansiRegex, "");
  const segments = graphemeSegmenter
    ? Array.from(graphemeSegmenter.segment(clean), ({ segment }) => segment)
    : Array.from(clean);
  return segments.reduce((width, segment) => width + graphemeWidth(segment), 0);
}

type TextLayer = {
  content: string;
  offsetX?: number;
  offsetY?: number;
  colorFunc?: (text: string) => string;
};

/**
 * Stack text layers
 *
 * Function that takes a list of multi-line strings and stacks them vertically,
 * each layer receives an offset x and offset y which will position the layer
 * accordingly. x is character based, y is line based. If no x/y provided,
 * both default to 0.
 */
const stackTextLayers = (layers: TextLayer[]): string => {
  type Cell = { char: string; colorFunc?: (text: string) => string };
  const canvas: Cell[][] = [];

  const graphemes = (text: string) =>
    graphemeSegmenter
      ? Array.from(graphemeSegmenter.segment(text), ({ segment }) => segment)
      : Array.from(text);

  layers.forEach(({ content, offsetX = 0, offsetY = 0, colorFunc }) => {
    const lines = content.split(/\r?\n/);

    lines.forEach((line, idx) => {
      const targetRow = offsetY + idx;
      while (canvas.length <= targetRow) canvas.push([]);

      const row = canvas[targetRow] ?? [];
      canvas[targetRow] = row;
      let cursor = offsetX;

      graphemes(line).forEach((grapheme) => {
        const width = graphemeWidth(grapheme);
        const cellWidth = Math.max(width, 1);

        while (row.length < cursor + cellWidth) row.push({ char: " " });

        for (let i = 0; i < cellWidth; i++) {
          row[cursor + i] = { char: grapheme, colorFunc };
        }

        cursor += cellWidth;
      });
    });
  });

  return canvas
    .map((row) => {
      if (row.length === 0) return "";

      const segments: { text: string; colorFunc?: (text: string) => string }[] =
        [];
      row.forEach((cell) => {
        const current = segments[segments.length - 1];
        if (current && current.colorFunc === cell.colorFunc) {
          current.text += cell.char;
        } else {
          segments.push({ text: cell.char, colorFunc: cell.colorFunc });
        }
      });

      return segments
        .map(({ text, colorFunc: cf }) => (cf ? cf(text) : text))
        .join("");
    })
    .join("\n");
};

export const makeHeader = () => {
  return stackTextLayers([
    { content: SHIP, colorFunc: chalk.blue },
    { content: BANNER, offsetX: 18, offsetY: 12, colorFunc: chalk.magenta },
  ]);
};

/**
 * Utility function that takes a string and a line width and returns the
 * string with lines padded with spaces to center it within the given width.
 *
 * Function properly handles ANSI escape codes (like those used by chalk) and
 * emojis to maintain correct visual alignment.
 */
export function centerText(text: string, lineWidth: number): string {
  const lines = text.split(/\r?\n/);

  const centered = lines.map((line) => {
    const width = visibleWidth(line);
    const padding = Math.max(lineWidth - width, 0);
    const left = Math.floor(padding / 2);
    const right = padding - left;
    return `${" ".repeat(left)}${line}${" ".repeat(right)}`;
  });

  return centered.join("\n");
}
