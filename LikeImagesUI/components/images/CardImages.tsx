"use client";
import { useEffect, useState } from "react";
import { listImages } from "../../requests/images/index";
import { saveLike } from "../../requests/likes/index";
import Image from "next/image";
import './CardImagesStyles.css';
import ButtonLike from "../buttons/ButtonLike";

interface ImageData {
    id: string;
    url: string;
}

interface PropsCardImages {
    recuperarSumaryLikes: () => {};
}

const CardImages: React.FC<PropsCardImages> = ({recuperarSumaryLikes}) => {
    
    const [images, setImages] = useState<ImageData[]>([]);

    const recuperarListaImagens = async () => {
        const imagesResponse = await listImages();
        setImages(imagesResponse);
    }

    const realizarLike = async (id: string) => {
        const likesResponse = await saveLike(id);
        recuperarSumaryLikes();
    }

    useEffect(() => {
        recuperarListaImagens();
    }, []);

    return (
        <>
            <div className="flex-container">
                {images.map((image) => (
                    <div key={image.id} className="flex-item">

                        <p>Nome: {image.id}</p>

                        <Image
                            src={image.url}
                            alt={`Imagem ${image.id}`}
                            width={300}
                            height={300}
                        />

                        <ButtonLike 
                            realizarLike={() => realizarLike(image.id)}
                        /> 
                    </div>
                ))}
            </div>
        </>
    );
}

export default CardImages;