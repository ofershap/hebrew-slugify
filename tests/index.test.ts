import { describe, it, expect } from "vitest";
import { hebrewSlugify } from "../src/index.js";

describe("hebrewSlugify", () => {
  describe("basic Hebrew text", () => {
    it("slugifies simple Hebrew word", () => {
      expect(hebrewSlugify("שלום")).toBe("shlvm");
    });

    it("slugifies Hebrew phrase", () => {
      expect(hebrewSlugify("שלום עולם")).toBe("shlvm-avlm");
    });

    it("handles all Hebrew letters", () => {
      expect(hebrewSlugify("אבגדהוזחטי")).toBe("abgdhvzchty");
    });

    it("handles final-form letters (sofit)", () => {
      expect(hebrewSlugify("ךםןףץ")).toBe("kmnpts");
    });
  });

  describe("mixed Hebrew + English", () => {
    it("handles mixed Hebrew and English", () => {
      expect(hebrewSlugify("שלום Hello")).toBe("shlvm-hello");
    });

    it("handles English only", () => {
      expect(hebrewSlugify("Hello World")).toBe("hello-world");
    });

    it("handles numbers mixed with Hebrew", () => {
      expect(hebrewSlugify("פוסט 42 בבלוג")).toBe("pvst-42-bblvg");
    });
  });

  describe("niqqud (vowel marks)", () => {
    it("strips niqqud marks", () => {
      expect(hebrewSlugify("שָׁלוֹם")).toBe("shlvm");
    });

    it("handles text with heavy niqqud", () => {
      const withNiqqud = "בְּרֵאשִׁית";
      const result = hebrewSlugify(withNiqqud);
      expect(result).toBe("brashyt");
    });
  });

  describe("special characters and whitespace", () => {
    it("replaces multiple spaces with single separator", () => {
      expect(hebrewSlugify("שלום   עולם")).toBe("shlvm-avlm");
    });

    it("removes leading and trailing spaces", () => {
      expect(hebrewSlugify("  שלום  ")).toBe("shlvm");
    });

    it("removes punctuation", () => {
      expect(hebrewSlugify("שלום, עולם!")).toBe("shlvm-avlm");
    });

    it("handles dashes in input", () => {
      expect(hebrewSlugify("שלום - עולם")).toBe("shlvm-avlm");
    });

    it("handles empty string", () => {
      expect(hebrewSlugify("")).toBe("");
    });

    it("handles string with only special characters", () => {
      expect(hebrewSlugify("!@#$%")).toBe("");
    });
  });

  describe("options", () => {
    it("supports custom separator", () => {
      expect(hebrewSlugify("שלום עולם", { separator: "_" })).toBe("shlvm_avlm");
    });

    it("supports disabling lowercase", () => {
      expect(hebrewSlugify("Hello World", { lowercase: false })).toBe(
        "Hello-World",
      );
    });

    it("supports disabling transliteration (keeps Hebrew)", () => {
      expect(hebrewSlugify("שלום עולם", { transliterate: false })).toBe(
        "שלום-עולם",
      );
    });

    it("combines multiple options", () => {
      expect(
        hebrewSlugify("שלום World", { separator: "_", lowercase: false }),
      ).toBe("shlvm_World");
    });
  });

  describe("edge cases", () => {
    it("handles a single Hebrew letter", () => {
      expect(hebrewSlugify("א")).toBe("a");
    });

    it("handles accented Latin characters", () => {
      expect(hebrewSlugify("café résumé")).toBe("cafe-resume");
    });

    it("handles long text", () => {
      const long = "זהו מאמר ארוך מאוד בעברית על תכנות";
      expect(hebrewSlugify(long)).toBe("zhv-mamr-arvk-mavd-babryt-al-tknvt");
    });

    it("handles consecutive separators are collapsed", () => {
      expect(hebrewSlugify("שלום...עולם")).toBe("shlvm-avlm");
    });
  });
});
