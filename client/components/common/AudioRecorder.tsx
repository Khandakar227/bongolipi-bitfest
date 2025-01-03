import React, { useState, useRef } from "react";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob|null>(null);
  const mediaRecorder = useRef<MediaRecorder>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.current.onstop = () => {
      const blob = new Blob(audioChunks.current, { type: "audio/m4a" });
      setAudioBlob(blob);
      audioChunks.current = [];
    };

    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
  };

  const uploadAudio = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.m4a");

    try {
      const response = await fetch("/api/upload-audio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      alert(`File uploaded successfully: ${data.message}`);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload the audio.");
    }
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {audioBlob && (
        <div>
          <audio controls src={URL.createObjectURL(audioBlob)} />
          <button onClick={uploadAudio}>Upload Audio</button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
