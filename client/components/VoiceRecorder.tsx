'use client';

import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface TranscriptionResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export default function Transcribe() {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const handleStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          setAudioChunks(prev => [...prev, event.data]);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Could not start recording:', error);
    }
  };

  const handleStop = async () => {
    setIsRecording(false);
    setIsLoading(true);

    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      mediaRecorderRef.current = null;
    }

    try {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('audio', audioBlob);

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data: TranscriptionResponse = await response.json();

      if (data.success && data.data) {
        setTranscript(data.data);
      } else {
        throw new Error(data.error || 'Transcription failed');
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Transcription failed',
      );
      setTranscript('');
    } finally {
      setIsLoading(false);
      setAudioChunks([]);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transcript);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Audio Transcription</h1>

      <button
        onClick={isRecording ? handleStop : handleStart}
        className={`px-4 py-2 rounded ${
          isRecording ? 'bg-red-500' : 'bg-blue-500'
        } text-white`}
        disabled={isLoading}
      >
        {isLoading
          ? 'Processing...'
          : isRecording
          ? 'Stop Recording'
          : 'Start Recording'}
      </button>

      {transcript && (
        <div className="mt-4">
          <h3 className="font-semibold">Transcript:</h3>
          <p className="mt-2 p-4 bg-gray-50 rounded">{transcript}</p>
          <button
            onClick={copyToClipboard}
            className="mt-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Copy Transcript
          </button>
        </div>
      )}
    </div>
  );
}
