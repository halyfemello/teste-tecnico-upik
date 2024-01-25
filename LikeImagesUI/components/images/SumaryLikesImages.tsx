"use client";
import { listLikes } from "@/requests/likes";
import { useEffect, useState } from "react";
import './SumaryLikesImages.css';

interface LikesData {
    id: string;
    likes: number;
}

interface PropsSumaryLikesImages {
    sumaryLikes: LikesData[];
}

const SumaryLikesImages: React.FC<PropsSumaryLikesImages> = ({sumaryLikes}) => {

    return (
        <>
            <div className="image-list-container">
                {sumaryLikes.map((sumary) => (
                    <div key={sumary.id} className="image-item">
    
                        <div className="image-details">
                            <p className="image-name">Nome: <b>{sumary.id}</b></p>
                            <p className="image-likes">Likes: <b>{sumary.likes}</b></p>
                        </div>
    
                    </div>
                ))}
            </div>
        </>
    );
}

export default SumaryLikesImages;