import { JSX } from "preact";
import Bar from "../atoms/bar.tsx";

type Props = {
  title: string;
};

function Navbar({ title }: Props): JSX.Element {
  return (
    <Bar>
      <Bar.Title>{title}</Bar.Title>
    </Bar>
  );
}

export default Navbar;
