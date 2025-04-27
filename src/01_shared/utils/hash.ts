export const getRandomgHashId = (): string => {
  return (
    crypto?.randomUUID() ||
    `${Date.now()}-${Math.random()}-${Math.random()}-${Math.random()}`
  );
};
