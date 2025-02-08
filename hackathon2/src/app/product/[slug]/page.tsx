import Image from "next/image";
import { client } from "@/sanity/lib/client";
import Barline from "./productcomponent/bar";
import ProductCard from "./productcomponent/DescriptionProduct";
import { product } from "@/sanity/schemaTypes/product";

interface Props {
    params: {
      slug: string;
    };
  }

  export default async function Post({ params }: Props) {
  
    const Data = await client.fetch(`*[_type == "product" && slug.current == "${params.slug}"]
        {
         _id,
        title,
        _type,
        price,
        dicountPercentage,
        description,
        isNew,
        tags,
        "slug":slug.current,
        "imageurl":productImage.asset->url
        }`)

         
       let Desc: string =Data[0].description;
       Desc= Desc.substring(0,Desc.indexOf("Key Features:"));
               
     return(
      <div>
        <Barline title={Data[0].title}/>     
        <ProductCard product={Data[0]}/>

        <div className="border-t border-gray-300">

          <div className="mt-12 text-2xl font-medium flex items-start justify-center">
                <p>Description</p>
          </div>
          <div className="mt-[37px] mx-[5%] text-justify">
          {Desc}
          </div>
        </div>

       </div>
     )   


  }