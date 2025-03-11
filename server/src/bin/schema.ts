/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Kysely } from 'kysely';
import { PostgresJSDialect } from 'kysely-postgres-js';
import postgres from 'postgres';
import 'reflect-metadata';

const asSnakeCase = (name: string): string => name.replaceAll(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

type TableOptions = {
  name?: string;
};
type ColumnOptions = {
  name?: string;
  type?: ColumnType;
  nullable?: boolean;
  default?: boolean | string;
};
type IndexOptions = {
  name?: string;
  unique?: boolean;
  columns?: string[];
  where?: string;
};

type RegisterTable = { target: Function; options: TableOptions };
type RegisterColumn = { object: object; propertyName: string | symbol; options: ColumnOptions };
type RegisterIndex = { object: object; propertyName: string | symbol; options: IndexOptions };

const tables: RegisterTable[] = [];
const columns: RegisterColumn[] = [];
const indexes: RegisterIndex[] = [];

let initialized = false;
const dynamicSchema: DatabaseSchema = {
  name: 'public',
  tables: {},
};

export enum MetadataKey {
  TableName = 'immich-schema:table-name',
  ColumnName = 'immich-schema:column-name',
  IndexName = 'immich-schema:index-name',
}

const initialize = () => {
  if (initialized) {
    return;
  }

  for (const { options, target } of tables) {
    const tableName = options.name || asSnakeCase(target.name);
    Reflect.defineMetadata(MetadataKey.TableName, tableName, target);

    dynamicSchema.tables[tableName] = {
      name: tableName,
      columns: {},
      constraints: {},
      indexes: {},
    };
  }

  for (const { object, propertyName, options } of columns) {
    const tableName = Reflect.getMetadata(MetadataKey.TableName, object.constructor);
    if (!tableName) {
      continue;
    }

    const table = dynamicSchema.tables[tableName];
    if (!table) {
      continue;
    }

    const columnName = asSnakeCase(String(propertyName));
    table.columns[columnName] = {
      name: columnName,
      tableName,
      ...options,
      nullable: options.nullable ?? false,
      type: options.type || 'varchar',
    };
  }

  initialized = true;
};

const registerTable = (table: RegisterTable) => tables.push(table);
const registerColumn = (column: RegisterColumn) => columns.push(column);
const registerIndex = (index: RegisterIndex) => indexes.push(index);

export const Table = (options: TableOptions = {}): ClassDecorator => {
  return (target: Function) => void registerTable({ target, options });
};
export const Column = (options: ColumnOptions = {}): PropertyDecorator => {
  return (object: object, propertyName: string | symbol) => void registerColumn({ object, propertyName, options });
};
export const Index = (options: IndexOptions = {}): PropertyDecorator => {
  return (object: object, propertyName: string | symbol) => void registerIndex({ object, propertyName, options });
};

export const setSchemaName = (name: string) => {
  dynamicSchema.name = name;
};

@Table({ name: 'user' })
class User {
  id!: string;

  @Column()
  email!: string;

  @Column()
  name!: number;

  @Column({ default: false })
  isAdmin!: boolean;
}

@Table({ name: 'partner' })
class Partner {}

type PostgresDB = {
  'information_schema.tables': {
    table_catalog: string;
    table_schema: string;
    table_name: string;
    table_type: 'VIEW' | 'BASE TABLE' | string;
    is_insertable_info: YesOrNo;
    is_typed: YesOrNo;
    commit_action: string | null;
  };

  'information_schema.columns': {
    table_catalog: string;
    table_schema: string;
    table_name: string;
    column_name: string;
    ordinal_position: number;
    column_default: string | null;
    is_nullable: YesOrNo;
    data_type: string;
    character_maximum_length: number | null;
    character_octet_length: number | null;
    numeric_precision: number | null;
    numeric_precision_radix: number | null;
    numeric_scale: number | null;
    datetime_precision: number | null;
    interval_type: string | null;
    interval_precision: number | null;
    udt_catalog: string;
    udt_schema: string;
    udt_name: string;
    maximum_cardinality: number | null;
    is_updatable: YesOrNo;
  };

  pg_namespace: {
    oid: number;
    nspname: string;
    nspowner: number;
    nspacl: string[];
  };

  pg_indexes: {
    schemaname: string;
    tablename: string;
    indexname: string;
    tablespace: string | null;
    indexdef: string;
  };

  pg_constraint: {
    oid: number;
    conname: string;
    conrelid: string;
    contype: string;
    connamespace: string;
    conkey: number[];
    confkey: number[];
    confrelid: string;
    confupdtype: number;
    confdeltype: number;
    confmatchtype: number;
    condeferrable: YesOrNo;
    condeferred: YesOrNo;
    convalidated: YesOrNo;
    conindid: number;
  };

  pg_class: {
    oid: number;
    relname: string;
    relkind: string;
    relnamespace: string;
    reltype: string;
    relowner: string;
    relam: string;
    relfilenode: string;
    reltablespace: string;
    relpages: number;
    reltuples: number;
    relallvisible: number;
    reltoastrelid: string;
    relhasindex: YesOrNo;
    relisshared: YesOrNo;
    relpersistence: string;
  };

  pg_attribute: {
    attrelid: number;
    attname: string;
    attnum: number;
    atttypeid: number;
    attstattarget: number;
    attstatarget: number;
    aanum: number;
  };
};

type YesOrNo = 'YES' | 'NO';

export type DatabaseSchema = {
  name: string;
  tables: Record<string, DatabaseTable>;
};

export type DatabaseTable = {
  name: string;
  columns: Record<string, DatabaseColumn>;
  constraints: Record<string, DatabaseConstraint>;
  indexes: Record<string, DatabaseIndex>;
};

export type DatabaseColumn = {
  name: string;
  tableName: string;
  type: ColumnType;
  nullable: boolean;
};

export type DatabaseConstraint = {
  name: string;
  columnName: string;
  expression: string;
};

export type DatabaseIndex = {
  name: string;
  tableName: string;
  schemaName: string;
  columnNames: string[];
  where?: string;
};

export type ColumnType =
  | 'varchar'
  | 'jsonb'
  | 'bigint'
  | 'timestamp with time zone'
  | 'boolean'
  | 'uuid'
  | 'integer'
  | 'double precision';

export type LoadSchemaOptions = {
  schemaName?: string;
};

const getKyselyDb = (options: postgres.Options<any>) => {
  return new Kysely<PostgresDB>({
    dialect: new PostgresJSDialect({
      postgres: postgres({
        max: 5,
        types: {
          date: {
            to: 1184,
            from: [1082, 1114, 1184],
            serialize: (x: Date | string) => (x instanceof Date ? x.toISOString() : x),
            parse: (x: string) => new Date(x),
          },
          bigint: {
            to: 20,
            from: [20],
            parse: (value: string) => Number.parseInt(value),
            serialize: (value: number) => value.toString(),
          },
        },
        connection: {
          TimeZone: 'UTC',
        },
        ...options,
      }),
    }),
  });
};

const getTables = (db: Kysely<PostgresDB>, schemaName: string) =>
  db
    .selectFrom('information_schema.tables')
    .where('table_schema', '=', schemaName)
    .where('table_type', '=', 'BASE TABLE')
    .selectAll()
    .execute();

const getTableColumns = (db: Kysely<PostgresDB>, schemaName: string) =>
  db
    .selectFrom('information_schema.columns')
    .select([
      'table_name',
      'column_name',
      'data_type',
      'column_default',
      'is_nullable',
      'numeric_precision',
      'numeric_scale',
      'datetime_precision',
    ])
    .where('table_schema', '=', schemaName)
    .execute();

const getTableIndexes = (db: Kysely<PostgresDB>, schemaName: string) =>
  db
    .selectFrom('pg_indexes')
    .select(['tablename as table_name', 'indexname as index_name', 'indexdef as index_definition'])
    .where('schemaname', '=', schemaName)
    .execute();

const getTableConstraints = (db: Kysely<PostgresDB>, schemaName: string) =>
  db
    .selectFrom('pg_constraint')
    .innerJoin('pg_class', 'pg_class.oid', 'pg_constraint.conrelid') // table
    .innerJoin('pg_namespace', 'pg_namespace.oid', 'pg_constraint.connamespace') // namespace
    .leftJoin('pg_attribute', 'pg_attribute.attrelid', 'pg_constraint.conindid') // column
    .select((eb) => [
      'pg_class.relname as table_name',
      'pg_constraint.conname as constraint_name',
      // 'pg_constraint.oid as constraint_id',
      'pg_attribute.attname as column_name',
      eb.fn<string>('pg_get_constraintdef', ['pg_constraint.oid']).as('expression'),
    ])
    .where('pg_namespace.nspname', '=', schemaName)
    .where('pg_class.relkind', 'in', ['r', 'p'])
    .execute();

export const loadSchema = async (db: Kysely<PostgresDB>, options: LoadSchemaOptions = {}): Promise<DatabaseSchema> => {
  const schemaName = options.schemaName || 'public';

  const schema: DatabaseSchema = {
    name: schemaName,
    tables: {},
  };

  const [tables, columns, indexes, constraints] = await Promise.all([
    getTables(db, schemaName),
    getTableColumns(db, schemaName),
    getTableIndexes(db, schemaName),
    getTableConstraints(db, schemaName),
  ]);

  for (const table of tables) {
    const tableName = table.table_name;
    if (schema.tables[tableName]) {
      continue;
    }

    schema.tables[table.table_name] = {
      name: table.table_name,
      columns: {},
      indexes: {},
      constraints: {},
    };
  }

  for (const column of columns) {
    const table = schema.tables[column.table_name];
    if (!table) {
      continue;
    }

    const columnName = column.column_name;
    if (table.columns[columnName]) {
      continue;
    }

    table.columns[columnName] = {
      name: columnName,
      type: column.data_type as ColumnType,
      tableName: column.table_name,
      nullable: column.is_nullable === 'YES',
    };
  }

  for (const index of indexes) {
    const table = schema.tables[index.table_name];
    if (!table) {
      continue;
    }

    const indexName = index.table_name;
    if (table.indexes[indexName]) {
      continue;
    }

    table.indexes[indexName] = {
      name: index.index_name,
      tableName: index.table_name,
      schemaName,
      // definition: index.index_definition,
      columnNames: [],
    };
  }

  for (const constraint of constraints) {
    const table = schema.tables[constraint.table_name];
    if (!table) {
      continue;
    }

    const constraintName = constraint.constraint_name;
    if (table.constraints[constraintName]) {
      continue;
    }

    table.constraints[constraintName] = {
      name: constraint.constraint_name,
      columnName: constraint.column_name as string,
      expression: constraint.expression,
    };
  }

  return schema;
};

const createTableSql = (table: DatabaseTable) => {
  const columns = Object.values(table.columns)
    .map((column) => `"${column.name}" ${column.type}`)
    .join(', ');
  return `CREATE TABLE "${table.name}" (${columns});`;
};

const createIndexSql = (index: DatabaseIndex) => {
  const columns = index.columnNames.map((name) => `"${name}"`).join(', ');
  let statement = `CREATE INDEX "${index.name}" ON "${index.tableName}" (${columns})`;
  if (index.where) {
    statement += ` WHERE ${index.where}`;
  }

  return statement;
};

export const reconcile = (actual: DatabaseSchema, expected: DatabaseSchema) => {
  const items: string[] = [];

  for (const table of Object.values(actual.tables)) {
    const schema2Table = expected.tables[table.name];
    if (!schema2Table) {
      items.push(createTableSql(table));
      for (const index of Object.values(table.indexes)) {
        items.push(createIndexSql(index));
      }
      continue;
    }
  }

  for (const table of Object.values(expected.tables)) {
    const schema1Table = actual.tables[table.name];
    if (!schema1Table) {
      items.push(`DROP TABLE ${table.name} ...`);
      continue;
    }
  }

  return items;
};

const main = async () => {
  const db = getKyselyDb({
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'immich',
  });

  try {
    const schema = await loadSchema(db, { schemaName: 'public' });
    console.dir(schema, { depth: 6 });

    initialize();
    const sql = reconcile(schema, dynamicSchema);

    console.log(sql);
  } finally {
    await db.destroy();
  }
};

main()
  .then(() => {
    console.log('done');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
