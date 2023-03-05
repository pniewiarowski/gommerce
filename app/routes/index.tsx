import {JSX} from "preact";
import Navbar from "../islands/navbar.tsx";

/**
 * Component contains home page.
 *
 * @return Home page.
 */
function Index(): JSX.Element {
    return (
        <div>
            <Navbar title="Gommerce"/>
        </div>
    );
}

export default Index;
