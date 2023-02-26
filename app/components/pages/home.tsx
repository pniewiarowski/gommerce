import { JSX } from "preact";
import Navbar from "../modules/navbar.tsx";

type Props = {
  title: string;
};

const Home = ({ title }: Props): JSX.Element => (
  <div>
    <Navbar title={title} />
  </div>
);

export default Home;
