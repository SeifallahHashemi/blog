import { PortableTextComponents } from "next-sanity";
import PortableImage from "./PortableImage";
import CodeBlock from "./CodeBlock";

export const CustomPortableText: PortableTextComponents = {
    types: {
        image: PortableImage,
        code: CodeBlock,
    },
    block: {
        normal: ({ children }) => <p className="basic-font-styles py-2">{children}</p>,
    }
}