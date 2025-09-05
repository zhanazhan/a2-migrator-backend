import { Document } from 'mongoose';

export const getDocumentId = <T extends Document>(
  document: T,
): string | undefined => {
  const id: unknown = document?.id ?? document?._id;
  return id ? (id as string) : undefined;
};
