'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from "react";

export default function Chat() {
  const { messages, input, isLoading, append, handleInputChange, handleSubmit } = useChat();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen flex-col items-center w-full py-24 mx-auto stretch">
      <div className="w-full text-center mb-4 px-4">      
        {/* Ajusta el ancho máximo aquí según necesites */}
        <div className="text-left inline-block text-sm md:text-base max-w-2xl" style={{ lineHeight: '1.75' }}>
          <p style={{ marginBottom: '1rem' }}>Please choose one of the following options by typing the number of your choice and then enter your input accordingly:</p>
          {/* Añade un margin bottom a cada párrafo para las líneas en blanco */}
          <p style={{ marginBottom: '1rem' }}>1: List of Ingredients - Enter a list of ingredients, and I will respond with the name of a dish from Mediterranean cuisine that matches those ingredients, if possible.</p>
          <p style={{ marginBottom: '1rem' }}>2: Recipe - Enter the name of a dish, and I will provide you with its recipe.</p>
          <p style={{ marginBottom: '1rem' }}>3: Criticize Recipe - Enter the name of a dish, and I will offer criticism on the recipe, with suggestions on how to make it tastier and fresher.</p>
          <p style={{ marginBottom: '1rem' }}>Example - 2: Caesar salad</p>
          <p>Your choice:</p>
        </div>
      </div>
      <div className="flex flex-col w-full h-screen text-white max-w-md py-24 mx-auto stretch">
        <div className="overflow-auto w-full" ref={messagesContainerRef}>
        {messages.map((m) => (
          <div
            key={m.id}
              className={`whitespace-pre-wrap ${
              m.role === "user"
              ? "bg-green-700 p-3 m-2 rounded-lg"
              : "bg-slate-700 p-3 m-2 rounded-lg"
              }`}>
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
          </div>
        ))}
          {
           isLoading && (
              <div className="flex justify-end pr-4">
                <span className="animate-bounce">...</span>
              </div>
            )
          } 
        </div>
      </div>        
      
      <div className="fixed top-0 w-full max-w-md">
        <div className="flex flex-col justify-center mb-2 items-center">
          <button
            className="bg-blue-500 p-2 text-white rounded shadow-xl"
            disabled={isLoading}
            onClick={() => append({ role: "user", content: "Give me a random recipe" })}>
            Random Recipe
          </button>
        </div>
      </div>  

    <div className="fixed bottom-0 w-full max-w-md">  
      <form onSubmit={handleSubmit} className="w-full flex justify-center px-4">
        <input
          className="w-full p-2 mb-8 border border-gray-300 rounded shadow text-black max-w-2xl"
          disabled={isLoading}
          value={input}
          placeholder="Enter your choice and input here"
          onChange={handleInputChange}
        />
      </form>
    </div>
  </div>
  );
}

