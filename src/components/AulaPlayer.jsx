import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const AulaPlayer = ({ video }) => {

    const [videoWatched, setVideoWatched] = useState(false);
    const videoRef = useRef(null);
    const handleVideoEnd = () => {
        setVideoWatched(true);
    };
    // const handleRouter = async () => {
    //     if (!(hasToken && videoWatched)) {
    //         toast.error(
    //             "Por favor, assista ao vídeo e preencha todos os campos obrigatórios."
    //         );
    //         return;
    //     }

    //     if (
    //         aula &&
    //         (!formData[aula["pergunta 01"]] || !formData[aula["pergunta 02"]])
    //     ) {
    //         toast.error(
    //             "Por favor, preencha todos os campos do formulário antes de prosseguir."
    //         );
    //         return;
    //     }
    // }
    return (
        <div className='video-box'>
            <div className={videoWatched ? 'view-icon checked' : 'view-icon' }></div>
            
            {typeof window !== "undefined" && (
                <ReactPlayer
                    controls={true}
                    onEnded={handleVideoEnd}
                    ref={videoRef}
                    maxHeight='400px'
                    url={video}
                />
            )}
        </div>
    )
}
export default AulaPlayer