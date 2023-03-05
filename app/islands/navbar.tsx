import {JSX} from "preact";
import Bar from "../components/bar.tsx";
import Icon from "../components/icon.tsx";

/**
 * Type for props for main navigation component
 */
type NavbarProps = {
    title: string;
};

/**
 * Component with page navigation.
 *
 * @param title App title.
 *
 * @returns Navbar island to render.
 */
function Navbar({title}: NavbarProps): JSX.Element {
    return (
        <Bar>
            <Bar.Group>
                <Bar.Item>
                    <Icon.Container>
                        <Icon
                            source={"https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_Blue.png"}
                            alt="Gopher!!!"
                            tailwind="w-14"
                        />
                    </Icon.Container>
                </Bar.Item>
                <Bar.Item>
                    <Bar.Title>{title}</Bar.Title>
                </Bar.Item>
            </Bar.Group>
            <Bar.Group>
                <Bar.Item>Searchbar</Bar.Item>
            </Bar.Group>
            <Bar.Group>
                <Bar.Item>Item 1</Bar.Item>
                <Bar.Item>Item 2</Bar.Item>
                <Bar.Item>Item 3</Bar.Item>
            </Bar.Group>
        </Bar>
    );
}

export default Navbar;
