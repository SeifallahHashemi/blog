import { PortableTextComponents } from "next-sanity";
import PortableImage from "./PortableImage";

export const CustomPortableText: PortableTextComponents = {
    types: {
        image: PortableImage,
    }
}