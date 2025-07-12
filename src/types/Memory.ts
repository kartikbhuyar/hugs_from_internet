export interface Memory {
  id: string;
  imageUrl: string;
  caption: string;
  uploadedAt: Date;
  fileName: string;
}

export interface MemoriesState {
  memories: Memory[];
  isUploading: boolean;
  selectedMemory: Memory | null;
}
