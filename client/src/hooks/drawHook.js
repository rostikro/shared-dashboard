import { useEffect, useRef } from "react";


const ws = new WebSocket("ws://localhost:8080");

export default function useDraw() {
    const canvasRef = useRef(null);

    useEffect(() => {
        ws.onmessage = (msg) => {
            const {type, data} = JSON.parse(msg.data);

            switch (type) {
                case 'newDrawData':
                    const image = new Image();
                    image.src = data;

                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext('2d');
                    image.onload = () => {
                        ctx.drawImage(image, 0, 0);
                    };
            }
        }
    }, []);

    function sendDrawData(data) {
        ws.send(JSON.stringify({type: 'newDrawData', data}));
    }

    return {
        canvasRef,
        sendDrawData,
    }
}