import { create } from "zustand";

interface FileStore {
    resumeFile: File | null;
    setResumeFile: (file: File | null) => void;
}

export const useResumeFileStore = create<FileStore>((set) => ({
    resumeFile: null,
    setResumeFile: (file) => set({resumeFile: file}) 
}))