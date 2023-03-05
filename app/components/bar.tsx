import {JSX} from "preact";
import {BaseProps} from "../types/base-props.ts";


/**
 * Main Bar component.
 *
 * @param children JSX children elements.
 * @param tailwind External tailwind CSS rules.
 *
 * @return Main component to contain all bar elements.
 */
function Bar({children, tailwind = ""}: BaseProps): JSX.Element {
    const style: Array<string> = [
        "p-8",
        "m-4",
        "border-4",
        "flex",
        "flex-row",
        "justify-between",
        "items-center",
        "border-ui-element-foreground",
        "rounded-xl",
        "bg-ui-element-background",
        "shadow-2xl",
    ];

    return (
        <nav className={`${style.join(" ")} ${tailwind}`}>
            {children}
        </nav>
    );
}

/**

 /**
 * Component for containing Bar title.
 *
 * @param children JSX children elements.
 * @param tailwind External tailwind CSS rules.
 *
 * @returns Component for contain Bar title.
 */
Bar.Title = function ({children, tailwind = ""}: BaseProps): JSX.Element {
    const style: Array<string> = [
        "text-ui-element-foreground",
        "text-2xl",
        "font-black",
        "cursor-pointer",
    ];

    return (
        <h1 className={`${style.join(" ")} ${tailwind}`}>
            <a href="/">{children}</a>
        </h1>
    );
};

/**
 * Default component to group all element in flex Bar.
 *
 * @param children JSX children elements.
 * @param tailwind External tailwind CSS rules.
 *
 * @returns Component to group elements.
 */
Bar.Group = function ({children, tailwind = ""}: BaseProps): JSX.Element {
    const style: Array<string> = [
        "flex",
        "flex-row",
        "justify-between",
        "items-center",
    ];

    return (
        <div className={`${style.join(" ")} ${tailwind}`}>
            {children}
        </div>
    );
};

/**
 * Default component to contain single Group element.
 *
 * @param children JSX children elements.
 * @param tailwind External tailwind CSS rules.
 *
 * @returns Component to contain single Group element.
 */
Bar.Item = function ({children, tailwind = ""}: BaseProps): JSX.Element {
    const style: Array<string> = [
        "ml-3",
        "mr-3"
    ];

    return (
        <div className={`${style.join(" ")} ${tailwind}`}>
            {children}
        </div>
    );
};

export default Bar;
