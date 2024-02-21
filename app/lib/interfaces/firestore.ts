export interface FieldValue {
  stringValue?: string;
  timestampValue?: Date;
  arrayValue?: {
    values: Array<{ mapValue: { fields: Record<string, FieldValue> } }>;
  };
}

export interface Document {
  name: string;
  fields: Record<string, FieldValue>;
}

export interface DocumentResponse {
  document: Document;
  skippedResults?: number;
}

export interface Documents {
  documents: Document[];
}

export interface FieldFilter {
  fieldFilter: {
    field: { fieldPath: string };
    op: string;
    value: { stringValue: string };
  };
}

export interface CompositeFilter {
  compositeFilter: {
    op: string;
    filters: FieldFilter[];
  };
}

export interface FirestoreQuery {
  structuredQuery: {
    where: CompositeFilter;
    from: { collectionId: string }[];
    orderBy: { field: { fieldPath: string }; direction: string }[];
    offset: number;
    limit: number;
  };
}
