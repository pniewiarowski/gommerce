import { JSX } from "preact";

type Props = {
  children: Array<string> | string | Array<JSX.Element> | JSX.Element;
  tailwind?: string;
};

function Bar({ children, tailwind = "" }: Props): JSX.Element {
  return (
    <nav className={`p-8 m-0 bg-ui-element-background shadow-xl ${tailwind}`}>
      {children}
    </nav>
  );
}

Bar.Title = function ({ children, tailwind = "" }: Props): JSX.Element {
  return (
    <h1
      className={`text-ui-element-foreground tracking-widest text-2xl font-black uppercase ${tailwind} cursor-pointer`}
    >
      <a href="/">{children}</a>
    </h1>
  );
};

export default Bar;
