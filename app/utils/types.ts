import { JSX } from "preact";

/**
 * Base JSX for React components.
 * Always extend this for props.
 */
export type BaseJSXProps = {
  children: Array<string> | string | Array<JSX.Element> | JSX.Element;
  tailwind?: string;
};
