import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      colors: {
        "ui-element-background": "#eeeeff",
        "ui-element-foreground": "#15152f",
      },
    },
  },
} as Options;
