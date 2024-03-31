"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const {
    messages,
    isLoading,
    append,
  } = useChat();

  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [audioIsLoading, setAudioIsLoading] = useState(false);
  const [audio, setAudio] = useState<string | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (imageIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          </div>
        </div>
      </div>
    );
  }

  if (image) {
    return (
      <div className="card w-full h-screen max-w-md py-24 mx-auto stretch">
        <img src={`data:image/jpeg;base64,${image}`} />
        <textarea
          className="mt-4 w-full text-white bg-black h-64"
          value={messages[messages.length - 1].content}
          readOnly
        />
        <div className="flex flex-col justify-center mb-2 items-center">
          {audio && (
            <>
              <p> Listen to the recipe: </p>
              <audio controls src={audio} className="w-full"></audio>
            </>
          )}
          {!audioIsLoading && !audio && (
          <button
            className="bg-blue-500 p-2 text-white rounded shadow-xl"
            onClick={async () => {
              setAudioIsLoading(true);
              const response = await fetch("/api/audio", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  message: messages[messages.length - 1].content,
                }),
              });
              const audioBlob = await response.blob();
              const audioUrl = URL.createObjectURL(audioBlob);
              setAudio(audioUrl);
              setAudioIsLoading(false);
            }}>
              Generate Audio
          </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen max-w-md py-24 text-white mx-auto stretch">
      <div className="overflow-auto mb-8 w-full" ref={messagesContainerRef}>
        {messages.map((m) => (
          <div
            key={m.id}
            className={`whitespace-pre-wrap ${
              m.role === "user"
                ? "bg-green-700 p-3 m-2 rounded-lg"
                : "bg-slate-700 p-3 m-2 rounded-lg"
            }`}
          >
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-end pr-4">
            <span className="animate-bounce">...</span>
          </div>
        )}
      </div>
      <div className="fixed bottom-0 w-full max-w-md">
        <div className="flex flex-col justify-center mb-2 items-center">
          {messages.length == 0 && (
            <button
              className="bg-blue-500 p-2 top-0 text-white rounded shadow-xl"
              disabled={isLoading}
              onClick={() => append({ role: "user", content: "Give me a random recipe" })}>
              Random Recipe
            </button>
          )}
          {messages.length == 2 && !isLoading && (
            <button
              className="bg-blue-500 p-2 text-white rounded shadow-xl"
              disabled={isLoading}
              onClick={async () => {
                setImageIsLoading(true);
                const response = await fetch("api/images", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    message: messages[messages.length - 1].content,
                  }),
                });
                const data = await response.json();
                setImage(data);
                setImageIsLoading(false);
              }}>
              Generate image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


