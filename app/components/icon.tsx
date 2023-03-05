import {JSX} from "preact";
import {BaseProps} from "../types/base-props.ts";

type IconProps = BaseProps & {
    source: string,
    alt?: string,
}

/**
 * Display icon by given source.
 *
 * @param children JSX children elements.
 * @param tailwind External tailwind CSS rules.
 *
 * @return Icon main container.
 */
function Icon({tailwind, source, alt}: IconProps): JSX.Element {
    const style: Array<string> = [];

    return (
        <img className={`${style.join(" ")} ${tailwind}`}
             src={source}
             alt={alt}
        />
    );
}

/**
 * Component to contain Icon component.
 *
 * @param children JSX children elements.
 * @param tailwind External tailwind CSS rules.
 *
 * @return Container for Icon component.
 */
Icon.Container = function ({children, tailwind}: BaseProps): JSX.Element {
    const style: Array<string> = [];

    return (
        <div className={`${style.join(" ")} ${tailwind}`}>
            {children}
        </div>
    );
}

export default Icon;
