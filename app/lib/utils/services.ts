import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  UpdateData,
  getCountFromServer,
  getDoc,
  DocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';

// Database
import { database } from '@/app/lib/firebase/config';

// Interfaces
import { Response } from '@/app/lib/interfaces';

interface Entity {
  id: string;
}

/**
 * Fetch all entities from a collection along with the total count.
 * @param collectionName - The name of the Firebase collection.
 * @returns A Promise containing an array of entities and the total count.
 */
export const getEntities = async <T extends Entity>(
  collectionName: string
): Promise<Response<T>> => {
  const querySnapshot = await getDocs(collection(database, collectionName));
  const countSnapshot = await getCountFromServer(
    collection(database, collectionName)
  );
  const count = countSnapshot.data().count;
  const entities: T[] = [];

  querySnapshot.forEach((doc) => {
    entities.push({ id: doc.id, ...doc.data() } as T);
  });

  return {
    data: entities,
    count,
  };
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
  const documentSnapshot: DocumentSnapshot<DocumentData> = await getDoc(
    doc(database, collectionName, id)
  );

  if (!documentSnapshot.exists()) {
    return undefined;
  }

  const entityData = documentSnapshot.data();
  return entityData as T;
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
): Promise<void> => {
  const entityRef = doc(database, collectionName, entityId);
  await deleteDoc(entityRef);
};
