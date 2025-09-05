const normalizeAddress = (address: any) => {
  if (!address) return '';
  try {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string,@typescript-eslint/no-unsafe-argument
    return typeof address !== 'string' ? Object.values(address).join(', ') : '';
  } catch {
    return '';
  }
};
