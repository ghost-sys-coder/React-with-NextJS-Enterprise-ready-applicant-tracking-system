import { create } from "zustand";
import { ResumeFeedbackProps } from "@/types";
interface FileStore {
    resumeFile: File | null;
    setResumeFile: (file: File | null) => void;

    isStreaming: boolean;
    setIsStreaming: (value: boolean) => void;

    streamingData: ResumeFeedbackProps | null;
    setStreamingData: (data: ResumeFeedbackProps | null) => void;
}



export const useResumeFileStore = create<FileStore>((set) => ({
    resumeFile: null,
    setResumeFile: (file) => set({ resumeFile: file }),
    isStreaming: false,
    setIsStreaming: (value) => set({ isStreaming: value }),
    streamingData: null,
    setStreamingData: (data) => set({streamingData: data})
}))