'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col items-center w-full py-24 mx-auto">
      <div className="w-full text-center mb-4 px-4">
        {/* Ajusta el ancho máximo aquí según necesites */}
        <div className="text-left inline-block text-sm md:text-base max-w-2xl" style={{ lineHeight: '1.75' }}>
          <p style={{ marginBottom: '1rem' }}>Please choose one of the following options by typing the number of your choice and :, then enter your input accordingly:</p>
          {/* Añade un margin bottom a cada párrafo para las líneas en blanco */}
          <p style={{ marginBottom: '1rem' }}>1: List of Ingredients - Enter a list of ingredients, and I will respond with the name of a dish from Mediterranean cuisine that matches those ingredients, if possible.</p>
          <p style={{ marginBottom: '1rem' }}>2: Recipe - Enter the name of a dish, and I will provide you with its recipe.</p>
          <p style={{ marginBottom: '1rem' }}>3: Criticize Recipe - Enter the name of a dish, and I will offer criticism on the recipe, with suggestions on how to make it tastier and fresher.</p>
          <p style={{ marginBottom: '1rem' }}>Example - 2: Caesar salad</p>
          <p>Your choice:</p>
        </div>
      </div>
      {messages.map((m, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}
      
      <form onSubmit={handleSubmit} className="w-full flex justify-center px-4">
        <input
          className="w-full p-2 mt-2 border border-gray-300 rounded shadow text-black max-w-2xl"
          value={input}
          placeholder="Enter your choice and input here"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

