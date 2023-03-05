import { JSX } from "preact";
import Bar from "../components/bar.tsx";

/**
 * Type for props for main navigation component
 */
type NavbarProps = {
  title: string;
};

/**
 * Component with main page navigation.
 *
 * @param props Array with properties.
 * @returns Navbar island to render.
 */
function Navbar({ title }: NavbarProps): JSX.Element {
  return (
    <Bar>
      <Bar.Title>{title}</Bar.Title>
      <Bar.Group>
        <Bar.Item>Item 1</Bar.Item>
        <Bar.Item>Item 2</Bar.Item>
        <Bar.Item>Item 3</Bar.Item>
      </Bar.Group>
      <Bar.Group>
        <Bar.Item>Item 5</Bar.Item>
        <Bar.Item>Item 6</Bar.Item>
      </Bar.Group>
    </Bar>
  );
}

export default Navbar;
