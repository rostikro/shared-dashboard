import React, { useRef, useEffect, useState } from 'react';

const ShareBoard = (props) => {

    const { brushColor, brushSize, canvasRef, sendDrawData } = props;

    useEffect(() => {
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        const startDrawing = (e) => {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        };

        const draw = (e) => {
            if (!isDrawing) return;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            }

            [lastX, lastY] = [e.offsetX, e.offsetY];
        };

        const endDrawing = () => {
            const canvas = canvasRef.current;
            const dataURL = canvas.toDataURL();
            sendDrawData(dataURL);
            isDrawing = false;
        };

        const canvas = canvasRef.current;
        const ctx = canvasRef.current?.getContext('2d');

        if (ctx) {
            ctx.strokeStyle = brushColor;
            ctx.lineWidth = brushSize;

            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mouseout', endDrawing);
    }, [brushColor, brushSize]);


    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);
    }, []);


    return (
        <canvas
            ref={canvasRef}
            width={windowSize[0] > 600 ? 1280 : 300}
            height={windowSize[1] > 400 ? 720 : 200}
            style={{ backgroundColor: 'white' }}
        />
    );
};

export default ShareBoard;