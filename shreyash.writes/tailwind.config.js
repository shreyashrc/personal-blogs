/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./blog/**/*.{md,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        'muted-foreground': "var(--muted-foreground)",
        border: "var(--border)",
        primary: "var(--primary)",
        'primary-foreground': "var(--primary-foreground)",
        accent: "var(--accent)",
        'accent-foreground': "var(--accent-foreground)",
        ring: "var(--ring)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      borderRadius: {
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      typography: {
        DEFAULT: {
          css: {
            a: { textDecoration: "underline", textUnderlineOffset: "3px" },
            pre: { borderRadius: "12px" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

