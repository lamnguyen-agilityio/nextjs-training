// Utils
import { getData, convertModel, getDataById } from '..';

// Interfaces
import { Category } from '@/app/lib/interfaces';

// Constants
import { ENTITY } from '@/app/lib/constants';

export const getCategoryOptions = async () => {
  const categories = await getData(`${ENTITY.CATEGORIES}?orderBy=name%20desc`);
  const convertedCategories = categories.documents.map((doc) =>
    convertModel<Category>(doc as Category)
  );
  const categoryOptions = convertedCategories.map((item) => ({
    ...item,
    label: item.name,
  }));

  return categoryOptions;
};

export const getCategoryById = async (id: string) => {
  if (!id) {
    return undefined;
  }

  const category = await getDataById<Category>(ENTITY.CATEGORIES, id);
  const convertedCategory = category && convertModel<Category>(category);

  return convertedCategory;
};
