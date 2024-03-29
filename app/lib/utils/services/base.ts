import {
  collection,
  addDoc,
  updateDoc,
  doc,
  UpdateData,
  getCountFromServer,
  getDoc,
  DocumentSnapshot,
  DocumentData,
  query,
  limit,
  startAfter,
  orderBy,
  FieldPath,
  where,
  endBefore,
} from 'firebase/firestore';

// Database
import { database } from '@/app/lib/firebase/config';

// Interfaces
import { Entity, Documents, Document } from '@/app/lib/interfaces';

export interface EntitiesParams {
  collectionName: string;
  limitData?: number;
  orderField?: string | FieldPath;
  direction?: 'asc' | 'desc';
  startAfterValue?: string | number;
  endBeforeValue?: string | number;
  filter?: {
    field: string;
    value: string;
  };
}

type QueryCondition =
  | ReturnType<typeof where>
  | ReturnType<typeof limit>
  | ReturnType<typeof orderBy>
  | ReturnType<typeof endBefore>
  | ReturnType<typeof startAfter>;

/**
 * Fetch all entities from a collection along with the total count.
 * @param collectionName - The name of the Firebase collection.
 * @returns A Promise containing the total count.
 */
export const getCountEntities = async (
  params: EntitiesParams
): Promise<number> => {
  const {
    collectionName,
    limitData = 10,
    orderField = 'name',
    direction = 'desc',
    startAfterValue = '',
    endBeforeValue = '',
    filter,
  } = params;

  const conditions: QueryCondition[] = [
    orderBy(orderField, direction),
    limit(limitData),
  ];

  if (startAfterValue) {
    conditions.push(startAfter(startAfterValue));
  }

  if (endBeforeValue) {
    conditions.push(endBefore(endBeforeValue));
  }

  if (filter?.field && filter?.value) {
    conditions.push(where(filter.field, '==', filter.value));
  }

  const baseCondition = collection(database, collectionName);
  const baseQuery = query(baseCondition, ...conditions);
  const countSnapshot = await getCountFromServer(
    filter?.field && filter?.value ? baseQuery : baseCondition
  );

  return countSnapshot.data().count;
};

/**
 * Fetch a single entity by ID.
 * @param collectionName - The name of the Firebase collection.
 * @param id - The ID of the entity to retrieve.
 * @returns A Promise containing the entity or undefined if not found.
 */
export const getEntityById = async <T extends Entity>(
  collectionName: string,
  id: string
): Promise<T | undefined> => {
  try {
    const documentSnapshot: DocumentSnapshot<DocumentData> = await getDoc(
      doc(database, collectionName, id)
    );

    if (!documentSnapshot.exists()) {
      return undefined;
    }

    const entityData = documentSnapshot.data();
    return entityData as T;
  } catch (error) {
    return undefined;
  }
};

/**
 * Add a new entity to the collection and return its ID.
 * @param collectionName - The name of the Firebase collection.
 * @param newEntity - The entity to add to the collection.
 * @returns A Promise containing the ID of the newly added entity.
 */
export const addEntity = async <T extends Omit<Entity, 'id'>>(
  collectionName: string,
  newEntity: T
): Promise<string> => {
  const docRef = await addDoc(collection(database, collectionName), newEntity);
  return docRef.id;
};

/**
 * Update an entity in the collection.
 * @param collectionName - The name of the Firebase collection.
 * @param entityId - The ID of the entity to update.
 * @param updatedEntity - The partial data to update on the existing entity.
 * @returns A Promise representing the completion of the update operation.
 */
export const updateEntity = async <T extends Entity>(
  collectionName: string,
  entityId: string,
  updatedEntity: Partial<T>
): Promise<void> => {
  const entityRef = doc(database, collectionName, entityId);
  await updateDoc(entityRef, updatedEntity as UpdateData<T>);
};

/**
 * Delete an entity from the collection.
 * @param collectionName - The name of the Firebase collection.
 * @param entityId - The ID of the entity to delete.
 * @returns A Promise representing the completion of the delete operation.
 */
export const deleteEntity = async (
  collectionName: string,
  entityId: string
): Promise<boolean> => {
  const response = await fetch(
    `${process.env.API_URL}/${collectionName}/${entityId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete data by id');
  }

  return true;
};

export const getData = async (resource: string): Promise<Documents> => {
  const response = await fetch(`${process.env.API_URL}/${resource}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get data');
  }

  return response.json();
};

export const getDataById = async <T>(
  collectionName: string,
  id: string
): Promise<(T & Document) | undefined> => {
  const response = await fetch(
    `${process.env.API_URL}/${collectionName}/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    return undefined;
  }

  return response.json();
};
