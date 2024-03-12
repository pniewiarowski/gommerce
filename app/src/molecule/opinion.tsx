"use client";

import React from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Avatar} from "@nextui-org/react";
import {randomFromArray} from "@/util";

interface Props {
    name: string,
    content: string,
    rating: number,
}

function Opinion(props: Props): React.JSX.Element {
    const animations: Array<string> = [
        'animate-floating1',
        'animate-floating2',
        'animate-floating3',
    ];

    return (
        <Card className={`p-4 ${randomFromArray(animations)}`}>
            <CardHeader>
                <Avatar name={props.name} classNames={{
                    base: "bg-gradient-to-br from-sky-500 to-pink-600",
                    icon: "text-black/80",
                }}/>
                <p className="ml-4">{props.name}</p>
            </CardHeader>
            <CardBody className="text-justify">
                {props.content}
            </CardBody>
            <CardFooter>Rating: {props.rating}/5</CardFooter>
        </Card>
    );
}

export default Opinion;
