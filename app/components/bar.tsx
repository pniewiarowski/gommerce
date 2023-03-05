import { JSX } from "preact";
import { BaseJSXProps } from "../utils/types.ts";

/**
 * Main Bar component.
 *
 * @param props Array with properties.
 * @returns Main component for Bar elements.
 */
function Bar({ children, tailwind = "" }: BaseJSXProps): JSX.Element {
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
 * Component for Bar title.
 *
 * @param props Array with properties.
 * @returns Component for contain Bar title.
 */
Bar.Title = function ({ children, tailwind = "" }: BaseJSXProps): JSX.Element {
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
 * @param props Array with properties.
 * @returns Component to group elements.
 */
Bar.Group = function ({ children, tailwind = "" }: BaseJSXProps): JSX.Element {
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
 * @param props Array with properties.
 * @returns Component to contain single Group element.
 */
Bar.Item = function ({ children, tailwind = "" }: BaseJSXProps): JSX.Element {
  const style: Array<string> = [
    "ml-10",
  ];

  return (
    <div className={`${style.join(" ")} ${tailwind}`}>
      {children}
    </div>
  );
};

export default Bar;
