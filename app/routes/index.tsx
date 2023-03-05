import {JSX} from "preact";
import Navbar from "../islands/navbar.tsx";

/**
 * Component contains home page.
 *
 * @return Home page.
 */
const Index = (): JSX.Element => (
    <div>
        <Navbar title="Gommerce"/>
    </div>
);

export default Index;
