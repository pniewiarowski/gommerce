import React from "react";
import {Button, Navbar as Base, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import Link from "next/link";
import {Category} from "@/api/definition";

interface Props {
    heading?: string | null,
    categories?: Array<Category> | null
}

function Navbar(props: Props): React.JSX.Element {
    const categories: React.JSX.Element[] | undefined = props.categories?.map(category => {
        return (
            <NavbarItem key={category.ID}>
                <Link className="text-xl" href={category.Name.toLocaleLowerCase()}>
                    {category.Name.toLocaleLowerCase()}
                </Link>
            </NavbarItem>
        )
    });

    return (
        <Base className={"p-4"} position={"static"}>
            <NavbarBrand>
                {props.heading && <p className="text-xl text-inherit">{props.heading.toLowerCase()}</p>}
            </NavbarBrand>

            {categories &&
                <NavbarContent className="sm:flex gap-4" justify="center">
                    {categories}
                </NavbarContent>
            }


            <NavbarContent justify="end">
                <NavbarItem>
                    <span className={"material-icons"}>shopping_cart</span>
                </NavbarItem>
                <NavbarItem>
                    <Link className={"material-icons"} href="/sign-up">account_circle</Link>
                </NavbarItem>
            </NavbarContent>
        </Base>
    );
}

export default Navbar;