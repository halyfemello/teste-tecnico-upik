"use client";
import { useEffect, useState } from "react";
import CardImages from "../components/images/CardImages";
import SumaryLikesImages from "../components/images/SumaryLikesImages";
import { listLikes } from "@/requests/likes";

interface LikesData {
  id: string;
  likes: number;
}

export default function Home() {

  const [sumaryLikes, setSumaryLikes] = useState<LikesData[]>([]);

  const recuperarSumaryLikes = async () => {
    const imagesResponse = await listLikes();
    setSumaryLikes(imagesResponse);
}

  useEffect(() => {
    recuperarSumaryLikes();
  }, []);

  return (
    <main className="m-4 p-2">
      <div>
        <h1 style={{ marginLeft: '50px' }}>App Seleção imagens</h1>

        <div className="flex">
          <div className="m-4">

          </div>
          <div className="m-4">
            <CardImages recuperarSumaryLikes={recuperarSumaryLikes} />
          </div>
          <div className="m-4">
            <SumaryLikesImages sumaryLikes={sumaryLikes}/>
          </div>
        </div>
    
      </div>
    </main>
  );
}