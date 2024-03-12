import React from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Avatar} from "@nextui-org/react";
import {Opinion} from "@/molecule";
import {Opinions} from "@/organism";

function Home(): React.JSX.Element {
    return (
        <div className="m-auto w-8/12">
            <div className="grid grid-cols-2">
                <div className="text-left font-bold w-128 pl-16 mt-64 mb-64">
                    <p className="text-4xl">Lorem ipsum dolor sit amet....</p>
                    <p className="text-4xl">mollis et, <span
                        className="bg-gradient-to-r from-sky-500 to-pink-600 inline-block text-transparent bg-clip-text">ecommerce platform</span>
                    </p>
                    <p className="text-4xl">risus eget purus accumsan sagittis.</p>
                </div>

                <div className="p-16 grid grid-cols-1 pr-16 gap-8">
                    <div className="mt-8 grid grid-cols-2 gap-8">
                        <Opinion name={"Pan Paweł"}
                                 content={"To niezły sklepik internetowy...masny fest a mi się podoba ez."}
                                 rating={4}/>
                        <Opinion name={"Naweł Piewiarowski"}
                                 content={"W stacku ASP.NET na mikroserwisach, Next.js jako aplikacja webowa, i CLI w Pythonie."}
                                 rating={5}/>
                    </div>
                    <div className="mb-8 grid grid-cols-2 gap-8">
                        <Opinion name={"Paweł Niewiarowski"}
                                 content={"Wolałbym pisać mikroserwisy w GO ale trzeba przedmiot zaliczyć, nie ma wyjścia ten zawodnik."}
                                 rating={5}/>
                        <Opinion name={"Paweł Niewiarowski"}
                                 content={"To tylko preview bo trzeba coś pokazać, większość będzie trzeba do abstrakcji wyciągnać."}
                                 rating={4}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
