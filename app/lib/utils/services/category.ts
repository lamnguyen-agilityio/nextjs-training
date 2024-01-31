// Utils
import { getEntities } from '.';

// Interfaces
import { Category } from '@/app/lib/interfaces';

// Constants
import { ENTITY } from '@/app/lib/constants';

export const getCategoryOptions = async () => {
  const categories = await getEntities<Category>({
    collectionName: ENTITY.CATEGORIES,
  });

  const categoryOptions =
    categories.data &&
    categories.data.map((item) => ({
      ...item,
      label: item.name,
    }));

  return categoryOptions;
};
