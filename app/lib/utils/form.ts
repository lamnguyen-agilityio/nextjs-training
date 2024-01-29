/**
 * Extracts specific data from FormData based on provided keys.
 * @param {Object} params - The parameters for the extraction.
 * @param {string[]} params.keys - The keys to extract from the FormData.
 * @param {FormData} params.formData - The FormData object containing the data.
 * @returns {Record<string, string | null>} - An object with extracted data mapped to the specified keys.
 */
export const extractFormData = ({
  keys,
  formData,
}: {
  keys: string[];
  formData: FormData;
}): Record<string, string | null> => {
  const result: Record<string, string | null> = {};

  if (!keys || !formData) {
    return {};
  }

  keys.forEach((key) => {
    const value = formData.get(key);

    if (value instanceof File) {
      // Handle File type
      result[key] = value.name;
    } else {
      // For other types (string, null, etc.)
      result[key] = (value as string) || null;
    }
  });

  return result;
};
