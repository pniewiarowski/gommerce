import {JSX} from "preact";

/**
 * Base JSX for React components.
 * Extend this for type component props.
 */
type BaseProps = {
    children?: Array<string> | string | Array<JSX.Element> | JSX.Element;
    tailwind?: string;
};

export default BaseProps;
