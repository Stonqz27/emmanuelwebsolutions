// The SDK returns arrays for many entity calls; other deployments wrap items.
export function asRows(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.items)) return result.items;
  if (Array.isArray(result?.data?.items)) return result.data.items;
  return [];
}
