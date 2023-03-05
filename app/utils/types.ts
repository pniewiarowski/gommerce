import {JSX} from "preact";

/**
 * Base JSX for React components.
 * Extend this for type component props.
 */
export type BaseJSXProps = {
    children?: Array<string> | string | Array<JSX.Element> | JSX.Element;
    tailwind?: string;
};
