import React, { useRef, useState, useEffect } from "react";
import './Quiz.css';
import { data } from "../assets/data.js";

const Quiz = () => {
    // Generar un orden aleatorio de índices
    const generateRandomOrder = (length) => {
        return Array.from({ length }, (_, i) => i).sort(() => Math.random() - 0.5);
    };

    const [questionOrder, setQuestionOrder] = useState(generateRandomOrder(data.length));
    const [index, setIndex] = useState(0);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    
    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);
    let option_array = [Option1, Option2, Option3, Option4];

    const question = data[questionOrder[index]]; // Directamente acceder con `index`

    const checkAns = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add("correcto");
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("incorrecto");
                option_array[question.ans - 1].current.classList.add("correcto");
            }
            setLock(true);
        }
    };

    const next = () => {
        if (lock) {
            if (index === questionOrder.length - 1) {
                setResult(true);
                return;
            }
            setIndex(prev => prev + 1);
            setLock(false);
            option_array.forEach(option => {
                option.current.classList.remove("incorrecto");
                option.current.classList.remove("correcto");
            });
        }
    };

    const reset = () => {
        const newOrder = generateRandomOrder(data.length);
        setQuestionOrder(newOrder);
        setIndex(0);
        setScore(0);
        setLock(false);
        setResult(false);
    };

    const [timeLeft, setTimeLeft] = useState(30); // 30 segundos por pregunta
    const [timeUp, setTimeUp] = useState(false);

    useEffect(() => {
        setTimeLeft(30); // Reinicia el tiempo al cambiar de pregunta
        setTimeUp(false);
    
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setTimeUp(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    
        return () => clearInterval(timer);
    }, [index]);    
    
    useEffect(() => {
        if (timeUp) {
            // Marcar una opción incorrecta visualmente
            option_array.forEach((option, i) => {
                if (i !== question.ans - 1) { // Evita marcar la correcta
                    option.current.classList.add("incorrecto");
                }
            });
    
            // Resaltar la correcta
            option_array[question.ans - 1].current.classList.add("correcto");
    
            setTimeout(() => {
                next(); // Pasar a la siguiente pregunta después de una pausa
            }, 1500); // Espera 1.5s para que el usuario vea la respuesta correcta
        }
    }, [timeUp]);
    

    return (
        <div className="container">
            <h1>Plaza Cielo Tierra Quiz</h1>
            <hr />
            {result ? (
                <>
                    <h2>Has obtenido {score} de {data.length} preguntas correctas</h2>
                    <button onClick={reset}>Reiniciar</button>
                </>
            ) : (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
                        <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
                        <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                        <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
                    </ul>
                    <button onClick={next}>Siguiente</button>
                    <div className="index">{index + 1} de {data.length} preguntas</div>
                    <div className="timer">Tiempo restante: {timeLeft}s</div>
                </>
            )}
        </div>
    );
};

export default Quiz;
