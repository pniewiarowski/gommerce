import {createContext} from "react";

const JwtContext = createContext<string | null>(null);

export default JwtContext;
