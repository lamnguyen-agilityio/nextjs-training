// Interfaces
import { CompositeFilter, FirestoreQuery } from '@/app/lib/interfaces';

// Constants
import { ENTITY } from '@/app/lib/constants';

/**
 * Creates a Firestore query object based on provided parameters.
 * @param filterField The field to filter the query by.
 * @param filterValue The value to filter the field by.
 * @param orderField The field to order the query results by.
 * @param direction The direction of ordering ('desc' for descending, 'asc' for ascending).
 * @param offset The number of results to skip.
 * @param limit The maximum number of results to return.
 * @returns A FirestoreQuery object representing the query.
 */
export const createQuery = (
  filterField: string,
  filterValue: string,
  orderField: string,
  direction: 'desc' | 'asc',
  offset: number,
  limit: number
): FirestoreQuery => {
  const where: CompositeFilter = {
    compositeFilter: {
      op: 'AND',
      filters:
        (filterField &&
          filterValue && [
            {
              fieldFilter: {
                field: { fieldPath: filterField },
                op: 'EQUAL',
                value: { stringValue: filterValue },
              },
            },
          ]) ||
        [],
    },
  };
  const formattedOrderBy = [
    {
      fieldPath: orderField,
      direction: direction === 'desc' ? 'DESCENDING' : 'ASCENDING',
    },
  ];
  const orderByInfo = formattedOrderBy.map((order) => ({
    field: { fieldPath: order.fieldPath },
    direction: order.direction,
  }));
  const query: FirestoreQuery = {
    structuredQuery: {
      where: where,
      from: [{ collectionId: ENTITY.COURSES }],
      orderBy: orderByInfo,
      offset,
      limit,
    },
  };

  return query;
};
