// Interfaces
import {
  CompositeFilter,
  ConvertedDocument,
  FirestoreQuery,
  Document,
  FieldValue,
} from '@/app/lib/interfaces';

// Enums
import { ValueTypes } from '@/app/lib/enums';

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

/**
 * Convert a model of type T to a ConvertedModel<T>.
 * This function takes a model, extracts its fields, converts them to the desired format,
 * and returns a ConvertedModel<T> object.
 * @param model The input model of type T to convert.
 * @returns A ConvertedModel<T> object.
 */
export const convertModel = <T extends Document>(model: T): T => {
  const { name, fields } = model;
  const id = name.split('/').pop() as string;

  const convertedFields: Record<string, ConvertedDocument> = {};
  for (const key in fields) {
    const value = fields[key];
    convertedFields[key] = convertValue(value) as ConvertedDocument;
  }

  return {
    id,
    ...convertedFields,
  } as unknown as T;
};

/**
 * Convert a single value to the desired format.
 * This function takes a value of type Value, determines its type
 * and converts it to the corresponding format.
 * @param value The input value of type Value to convert.
 * @returns ConvertedDocument, string, number, or boolean.
 */
export const convertValue = (
  value: FieldValue
): ConvertedDocument | string | number | boolean => {
  const valueType = Object.keys(value)[0] as ValueTypes;

  switch (valueType) {
    case ValueTypes.StringValue:
    case ValueTypes.TimestampValue:
    case ValueTypes.BooleanValue:
      return value[valueType]!;

    case ValueTypes.IntegerValue:
      return parseInt(value[valueType]!);

    case ValueTypes.ArrayValue:
      return value[valueType]!.values.map((item) =>
        convertValue(item)
      ) as unknown as ConvertedDocument;

    case ValueTypes.MapValue:
      const convertedMap: Record<string, ConvertedDocument> = {};
      for (const key in value[valueType]!.fields) {
        convertedMap[key] = convertValue(
          value[valueType]!.fields[key]
        ) as ConvertedDocument;
      }
      return convertedMap;
  }
};
