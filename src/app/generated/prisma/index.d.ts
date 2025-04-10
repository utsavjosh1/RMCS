
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model GameRoom
 * 
 */
export type GameRoom = $Result.DefaultSelection<Prisma.$GameRoomPayload>
/**
 * Model Player
 * 
 */
export type Player = $Result.DefaultSelection<Prisma.$PlayerPayload>
/**
 * Model RoomPlayers
 * 
 */
export type RoomPlayers = $Result.DefaultSelection<Prisma.$RoomPlayersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RoomStatus: {
  waiting: 'waiting',
  in_progress: 'in_progress',
  finished: 'finished'
};

export type RoomStatus = (typeof RoomStatus)[keyof typeof RoomStatus]

}

export type RoomStatus = $Enums.RoomStatus

export const RoomStatus: typeof $Enums.RoomStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more GameRooms
 * const gameRooms = await prisma.gameRoom.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more GameRooms
   * const gameRooms = await prisma.gameRoom.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.gameRoom`: Exposes CRUD operations for the **GameRoom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameRooms
    * const gameRooms = await prisma.gameRoom.findMany()
    * ```
    */
  get gameRoom(): Prisma.GameRoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.player`: Exposes CRUD operations for the **Player** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Players
    * const players = await prisma.player.findMany()
    * ```
    */
  get player(): Prisma.PlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomPlayers`: Exposes CRUD operations for the **RoomPlayers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomPlayers
    * const roomPlayers = await prisma.roomPlayers.findMany()
    * ```
    */
  get roomPlayers(): Prisma.RoomPlayersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    GameRoom: 'GameRoom',
    Player: 'Player',
    RoomPlayers: 'RoomPlayers'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "gameRoom" | "player" | "roomPlayers"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      GameRoom: {
        payload: Prisma.$GameRoomPayload<ExtArgs>
        fields: Prisma.GameRoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameRoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameRoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRoomPayload>
          }
          findFirst: {
            args: Prisma.GameRoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameRoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRoomPayload>
          }
          findMany: {
            args: Prisma.GameRoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRoomPayload>[]
          }
          create: {
            args: Prisma.GameRoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRoomPayload>
          }
          createMany: {
            args: Prisma.GameRoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameRoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRoomPayload>[]
          }
          delete: {
            args: Prisma.GameRoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRoomPayload>
          }
          update: {
            args: Prisma.GameRoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRoomPayload>
          }
          deleteMany: {
            args: Prisma.GameRoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameRoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameRoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRoomPayload>[]
          }
          upsert: {
            args: Prisma.GameRoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRoomPayload>
          }
          aggregate: {
            args: Prisma.GameRoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameRoom>
          }
          groupBy: {
            args: Prisma.GameRoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameRoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameRoomCountArgs<ExtArgs>
            result: $Utils.Optional<GameRoomCountAggregateOutputType> | number
          }
        }
      }
      Player: {
        payload: Prisma.$PlayerPayload<ExtArgs>
        fields: Prisma.PlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findFirst: {
            args: Prisma.PlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findMany: {
            args: Prisma.PlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          create: {
            args: Prisma.PlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          createMany: {
            args: Prisma.PlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          delete: {
            args: Prisma.PlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          update: {
            args: Prisma.PlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          deleteMany: {
            args: Prisma.PlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          upsert: {
            args: Prisma.PlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          aggregate: {
            args: Prisma.PlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayer>
          }
          groupBy: {
            args: Prisma.PlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayerCountArgs<ExtArgs>
            result: $Utils.Optional<PlayerCountAggregateOutputType> | number
          }
        }
      }
      RoomPlayers: {
        payload: Prisma.$RoomPlayersPayload<ExtArgs>
        fields: Prisma.RoomPlayersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomPlayersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPlayersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomPlayersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPlayersPayload>
          }
          findFirst: {
            args: Prisma.RoomPlayersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPlayersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomPlayersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPlayersPayload>
          }
          findMany: {
            args: Prisma.RoomPlayersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPlayersPayload>[]
          }
          create: {
            args: Prisma.RoomPlayersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPlayersPayload>
          }
          createMany: {
            args: Prisma.RoomPlayersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomPlayersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPlayersPayload>[]
          }
          delete: {
            args: Prisma.RoomPlayersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPlayersPayload>
          }
          update: {
            args: Prisma.RoomPlayersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPlayersPayload>
          }
          deleteMany: {
            args: Prisma.RoomPlayersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomPlayersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomPlayersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPlayersPayload>[]
          }
          upsert: {
            args: Prisma.RoomPlayersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPlayersPayload>
          }
          aggregate: {
            args: Prisma.RoomPlayersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomPlayers>
          }
          groupBy: {
            args: Prisma.RoomPlayersGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomPlayersGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomPlayersCountArgs<ExtArgs>
            result: $Utils.Optional<RoomPlayersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    gameRoom?: GameRoomOmit
    player?: PlayerOmit
    roomPlayers?: RoomPlayersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type GameRoomCountOutputType
   */

  export type GameRoomCountOutputType = {
    playersList: number
  }

  export type GameRoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playersList?: boolean | GameRoomCountOutputTypeCountPlayersListArgs
  }

  // Custom InputTypes
  /**
   * GameRoomCountOutputType without action
   */
  export type GameRoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRoomCountOutputType
     */
    select?: GameRoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameRoomCountOutputType without action
   */
  export type GameRoomCountOutputTypeCountPlayersListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model GameRoom
   */

  export type AggregateGameRoom = {
    _count: GameRoomCountAggregateOutputType | null
    _min: GameRoomMinAggregateOutputType | null
    _max: GameRoomMaxAggregateOutputType | null
  }

  export type GameRoomMinAggregateOutputType = {
    id: string | null
    roomCode: string | null
    title: string | null
    imageUrl: string | null
    status: $Enums.RoomStatus | null
    createdAt: Date | null
    hostId: string | null
    hostName: string | null
    isPrivate: boolean | null
  }

  export type GameRoomMaxAggregateOutputType = {
    id: string | null
    roomCode: string | null
    title: string | null
    imageUrl: string | null
    status: $Enums.RoomStatus | null
    createdAt: Date | null
    hostId: string | null
    hostName: string | null
    isPrivate: boolean | null
  }

  export type GameRoomCountAggregateOutputType = {
    id: number
    roomCode: number
    title: number
    imageUrl: number
    status: number
    createdAt: number
    hostId: number
    hostName: number
    isPrivate: number
    _all: number
  }


  export type GameRoomMinAggregateInputType = {
    id?: true
    roomCode?: true
    title?: true
    imageUrl?: true
    status?: true
    createdAt?: true
    hostId?: true
    hostName?: true
    isPrivate?: true
  }

  export type GameRoomMaxAggregateInputType = {
    id?: true
    roomCode?: true
    title?: true
    imageUrl?: true
    status?: true
    createdAt?: true
    hostId?: true
    hostName?: true
    isPrivate?: true
  }

  export type GameRoomCountAggregateInputType = {
    id?: true
    roomCode?: true
    title?: true
    imageUrl?: true
    status?: true
    createdAt?: true
    hostId?: true
    hostName?: true
    isPrivate?: true
    _all?: true
  }

  export type GameRoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameRoom to aggregate.
     */
    where?: GameRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameRooms to fetch.
     */
    orderBy?: GameRoomOrderByWithRelationInput | GameRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameRooms
    **/
    _count?: true | GameRoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameRoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameRoomMaxAggregateInputType
  }

  export type GetGameRoomAggregateType<T extends GameRoomAggregateArgs> = {
        [P in keyof T & keyof AggregateGameRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameRoom[P]>
      : GetScalarType<T[P], AggregateGameRoom[P]>
  }




  export type GameRoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameRoomWhereInput
    orderBy?: GameRoomOrderByWithAggregationInput | GameRoomOrderByWithAggregationInput[]
    by: GameRoomScalarFieldEnum[] | GameRoomScalarFieldEnum
    having?: GameRoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameRoomCountAggregateInputType | true
    _min?: GameRoomMinAggregateInputType
    _max?: GameRoomMaxAggregateInputType
  }

  export type GameRoomGroupByOutputType = {
    id: string
    roomCode: string
    title: string
    imageUrl: string
    status: $Enums.RoomStatus
    createdAt: Date
    hostId: string
    hostName: string
    isPrivate: boolean
    _count: GameRoomCountAggregateOutputType | null
    _min: GameRoomMinAggregateOutputType | null
    _max: GameRoomMaxAggregateOutputType | null
  }

  type GetGameRoomGroupByPayload<T extends GameRoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameRoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameRoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameRoomGroupByOutputType[P]>
            : GetScalarType<T[P], GameRoomGroupByOutputType[P]>
        }
      >
    >


  export type GameRoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomCode?: boolean
    title?: boolean
    imageUrl?: boolean
    status?: boolean
    createdAt?: boolean
    hostId?: boolean
    hostName?: boolean
    isPrivate?: boolean
    players?: boolean | GameRoom$playersArgs<ExtArgs>
    playersList?: boolean | GameRoom$playersListArgs<ExtArgs>
    _count?: boolean | GameRoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameRoom"]>

  export type GameRoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomCode?: boolean
    title?: boolean
    imageUrl?: boolean
    status?: boolean
    createdAt?: boolean
    hostId?: boolean
    hostName?: boolean
    isPrivate?: boolean
  }, ExtArgs["result"]["gameRoom"]>

  export type GameRoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomCode?: boolean
    title?: boolean
    imageUrl?: boolean
    status?: boolean
    createdAt?: boolean
    hostId?: boolean
    hostName?: boolean
    isPrivate?: boolean
  }, ExtArgs["result"]["gameRoom"]>

  export type GameRoomSelectScalar = {
    id?: boolean
    roomCode?: boolean
    title?: boolean
    imageUrl?: boolean
    status?: boolean
    createdAt?: boolean
    hostId?: boolean
    hostName?: boolean
    isPrivate?: boolean
  }

  export type GameRoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomCode" | "title" | "imageUrl" | "status" | "createdAt" | "hostId" | "hostName" | "isPrivate", ExtArgs["result"]["gameRoom"]>
  export type GameRoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | GameRoom$playersArgs<ExtArgs>
    playersList?: boolean | GameRoom$playersListArgs<ExtArgs>
    _count?: boolean | GameRoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameRoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GameRoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GameRoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameRoom"
    objects: {
      players: Prisma.$RoomPlayersPayload<ExtArgs> | null
      playersList: Prisma.$PlayerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomCode: string
      title: string
      imageUrl: string
      status: $Enums.RoomStatus
      createdAt: Date
      hostId: string
      hostName: string
      isPrivate: boolean
    }, ExtArgs["result"]["gameRoom"]>
    composites: {}
  }

  type GameRoomGetPayload<S extends boolean | null | undefined | GameRoomDefaultArgs> = $Result.GetResult<Prisma.$GameRoomPayload, S>

  type GameRoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameRoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameRoomCountAggregateInputType | true
    }

  export interface GameRoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameRoom'], meta: { name: 'GameRoom' } }
    /**
     * Find zero or one GameRoom that matches the filter.
     * @param {GameRoomFindUniqueArgs} args - Arguments to find a GameRoom
     * @example
     * // Get one GameRoom
     * const gameRoom = await prisma.gameRoom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameRoomFindUniqueArgs>(args: SelectSubset<T, GameRoomFindUniqueArgs<ExtArgs>>): Prisma__GameRoomClient<$Result.GetResult<Prisma.$GameRoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GameRoom that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameRoomFindUniqueOrThrowArgs} args - Arguments to find a GameRoom
     * @example
     * // Get one GameRoom
     * const gameRoom = await prisma.gameRoom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameRoomFindUniqueOrThrowArgs>(args: SelectSubset<T, GameRoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameRoomClient<$Result.GetResult<Prisma.$GameRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameRoom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRoomFindFirstArgs} args - Arguments to find a GameRoom
     * @example
     * // Get one GameRoom
     * const gameRoom = await prisma.gameRoom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameRoomFindFirstArgs>(args?: SelectSubset<T, GameRoomFindFirstArgs<ExtArgs>>): Prisma__GameRoomClient<$Result.GetResult<Prisma.$GameRoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameRoom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRoomFindFirstOrThrowArgs} args - Arguments to find a GameRoom
     * @example
     * // Get one GameRoom
     * const gameRoom = await prisma.gameRoom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameRoomFindFirstOrThrowArgs>(args?: SelectSubset<T, GameRoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameRoomClient<$Result.GetResult<Prisma.$GameRoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GameRooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameRooms
     * const gameRooms = await prisma.gameRoom.findMany()
     * 
     * // Get first 10 GameRooms
     * const gameRooms = await prisma.gameRoom.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameRoomWithIdOnly = await prisma.gameRoom.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameRoomFindManyArgs>(args?: SelectSubset<T, GameRoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GameRoom.
     * @param {GameRoomCreateArgs} args - Arguments to create a GameRoom.
     * @example
     * // Create one GameRoom
     * const GameRoom = await prisma.gameRoom.create({
     *   data: {
     *     // ... data to create a GameRoom
     *   }
     * })
     * 
     */
    create<T extends GameRoomCreateArgs>(args: SelectSubset<T, GameRoomCreateArgs<ExtArgs>>): Prisma__GameRoomClient<$Result.GetResult<Prisma.$GameRoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GameRooms.
     * @param {GameRoomCreateManyArgs} args - Arguments to create many GameRooms.
     * @example
     * // Create many GameRooms
     * const gameRoom = await prisma.gameRoom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameRoomCreateManyArgs>(args?: SelectSubset<T, GameRoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameRooms and returns the data saved in the database.
     * @param {GameRoomCreateManyAndReturnArgs} args - Arguments to create many GameRooms.
     * @example
     * // Create many GameRooms
     * const gameRoom = await prisma.gameRoom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameRooms and only return the `id`
     * const gameRoomWithIdOnly = await prisma.gameRoom.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameRoomCreateManyAndReturnArgs>(args?: SelectSubset<T, GameRoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameRoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GameRoom.
     * @param {GameRoomDeleteArgs} args - Arguments to delete one GameRoom.
     * @example
     * // Delete one GameRoom
     * const GameRoom = await prisma.gameRoom.delete({
     *   where: {
     *     // ... filter to delete one GameRoom
     *   }
     * })
     * 
     */
    delete<T extends GameRoomDeleteArgs>(args: SelectSubset<T, GameRoomDeleteArgs<ExtArgs>>): Prisma__GameRoomClient<$Result.GetResult<Prisma.$GameRoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GameRoom.
     * @param {GameRoomUpdateArgs} args - Arguments to update one GameRoom.
     * @example
     * // Update one GameRoom
     * const gameRoom = await prisma.gameRoom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameRoomUpdateArgs>(args: SelectSubset<T, GameRoomUpdateArgs<ExtArgs>>): Prisma__GameRoomClient<$Result.GetResult<Prisma.$GameRoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GameRooms.
     * @param {GameRoomDeleteManyArgs} args - Arguments to filter GameRooms to delete.
     * @example
     * // Delete a few GameRooms
     * const { count } = await prisma.gameRoom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameRoomDeleteManyArgs>(args?: SelectSubset<T, GameRoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameRooms
     * const gameRoom = await prisma.gameRoom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameRoomUpdateManyArgs>(args: SelectSubset<T, GameRoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameRooms and returns the data updated in the database.
     * @param {GameRoomUpdateManyAndReturnArgs} args - Arguments to update many GameRooms.
     * @example
     * // Update many GameRooms
     * const gameRoom = await prisma.gameRoom.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GameRooms and only return the `id`
     * const gameRoomWithIdOnly = await prisma.gameRoom.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameRoomUpdateManyAndReturnArgs>(args: SelectSubset<T, GameRoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameRoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GameRoom.
     * @param {GameRoomUpsertArgs} args - Arguments to update or create a GameRoom.
     * @example
     * // Update or create a GameRoom
     * const gameRoom = await prisma.gameRoom.upsert({
     *   create: {
     *     // ... data to create a GameRoom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameRoom we want to update
     *   }
     * })
     */
    upsert<T extends GameRoomUpsertArgs>(args: SelectSubset<T, GameRoomUpsertArgs<ExtArgs>>): Prisma__GameRoomClient<$Result.GetResult<Prisma.$GameRoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GameRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRoomCountArgs} args - Arguments to filter GameRooms to count.
     * @example
     * // Count the number of GameRooms
     * const count = await prisma.gameRoom.count({
     *   where: {
     *     // ... the filter for the GameRooms we want to count
     *   }
     * })
    **/
    count<T extends GameRoomCountArgs>(
      args?: Subset<T, GameRoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameRoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameRoomAggregateArgs>(args: Subset<T, GameRoomAggregateArgs>): Prisma.PrismaPromise<GetGameRoomAggregateType<T>>

    /**
     * Group by GameRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameRoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameRoomGroupByArgs['orderBy'] }
        : { orderBy?: GameRoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameRoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameRoom model
   */
  readonly fields: GameRoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameRoom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameRoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    players<T extends GameRoom$playersArgs<ExtArgs> = {}>(args?: Subset<T, GameRoom$playersArgs<ExtArgs>>): Prisma__RoomPlayersClient<$Result.GetResult<Prisma.$RoomPlayersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    playersList<T extends GameRoom$playersListArgs<ExtArgs> = {}>(args?: Subset<T, GameRoom$playersListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GameRoom model
   */
  interface GameRoomFieldRefs {
    readonly id: FieldRef<"GameRoom", 'String'>
    readonly roomCode: FieldRef<"GameRoom", 'String'>
    readonly title: FieldRef<"GameRoom", 'String'>
    readonly imageUrl: FieldRef<"GameRoom", 'String'>
    readonly status: FieldRef<"GameRoom", 'RoomStatus'>
    readonly createdAt: FieldRef<"GameRoom", 'DateTime'>
    readonly hostId: FieldRef<"GameRoom", 'String'>
    readonly hostName: FieldRef<"GameRoom", 'String'>
    readonly isPrivate: FieldRef<"GameRoom", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * GameRoom findUnique
   */
  export type GameRoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRoom
     */
    select?: GameRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRoom
     */
    omit?: GameRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRoomInclude<ExtArgs> | null
    /**
     * Filter, which GameRoom to fetch.
     */
    where: GameRoomWhereUniqueInput
  }

  /**
   * GameRoom findUniqueOrThrow
   */
  export type GameRoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRoom
     */
    select?: GameRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRoom
     */
    omit?: GameRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRoomInclude<ExtArgs> | null
    /**
     * Filter, which GameRoom to fetch.
     */
    where: GameRoomWhereUniqueInput
  }

  /**
   * GameRoom findFirst
   */
  export type GameRoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRoom
     */
    select?: GameRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRoom
     */
    omit?: GameRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRoomInclude<ExtArgs> | null
    /**
     * Filter, which GameRoom to fetch.
     */
    where?: GameRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameRooms to fetch.
     */
    orderBy?: GameRoomOrderByWithRelationInput | GameRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameRooms.
     */
    cursor?: GameRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameRooms.
     */
    distinct?: GameRoomScalarFieldEnum | GameRoomScalarFieldEnum[]
  }

  /**
   * GameRoom findFirstOrThrow
   */
  export type GameRoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRoom
     */
    select?: GameRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRoom
     */
    omit?: GameRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRoomInclude<ExtArgs> | null
    /**
     * Filter, which GameRoom to fetch.
     */
    where?: GameRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameRooms to fetch.
     */
    orderBy?: GameRoomOrderByWithRelationInput | GameRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameRooms.
     */
    cursor?: GameRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameRooms.
     */
    distinct?: GameRoomScalarFieldEnum | GameRoomScalarFieldEnum[]
  }

  /**
   * GameRoom findMany
   */
  export type GameRoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRoom
     */
    select?: GameRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRoom
     */
    omit?: GameRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRoomInclude<ExtArgs> | null
    /**
     * Filter, which GameRooms to fetch.
     */
    where?: GameRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameRooms to fetch.
     */
    orderBy?: GameRoomOrderByWithRelationInput | GameRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameRooms.
     */
    cursor?: GameRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameRooms.
     */
    skip?: number
    distinct?: GameRoomScalarFieldEnum | GameRoomScalarFieldEnum[]
  }

  /**
   * GameRoom create
   */
  export type GameRoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRoom
     */
    select?: GameRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRoom
     */
    omit?: GameRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRoomInclude<ExtArgs> | null
    /**
     * The data needed to create a GameRoom.
     */
    data: XOR<GameRoomCreateInput, GameRoomUncheckedCreateInput>
  }

  /**
   * GameRoom createMany
   */
  export type GameRoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameRooms.
     */
    data: GameRoomCreateManyInput | GameRoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameRoom createManyAndReturn
   */
  export type GameRoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRoom
     */
    select?: GameRoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameRoom
     */
    omit?: GameRoomOmit<ExtArgs> | null
    /**
     * The data used to create many GameRooms.
     */
    data: GameRoomCreateManyInput | GameRoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameRoom update
   */
  export type GameRoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRoom
     */
    select?: GameRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRoom
     */
    omit?: GameRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRoomInclude<ExtArgs> | null
    /**
     * The data needed to update a GameRoom.
     */
    data: XOR<GameRoomUpdateInput, GameRoomUncheckedUpdateInput>
    /**
     * Choose, which GameRoom to update.
     */
    where: GameRoomWhereUniqueInput
  }

  /**
   * GameRoom updateMany
   */
  export type GameRoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameRooms.
     */
    data: XOR<GameRoomUpdateManyMutationInput, GameRoomUncheckedUpdateManyInput>
    /**
     * Filter which GameRooms to update
     */
    where?: GameRoomWhereInput
    /**
     * Limit how many GameRooms to update.
     */
    limit?: number
  }

  /**
   * GameRoom updateManyAndReturn
   */
  export type GameRoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRoom
     */
    select?: GameRoomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameRoom
     */
    omit?: GameRoomOmit<ExtArgs> | null
    /**
     * The data used to update GameRooms.
     */
    data: XOR<GameRoomUpdateManyMutationInput, GameRoomUncheckedUpdateManyInput>
    /**
     * Filter which GameRooms to update
     */
    where?: GameRoomWhereInput
    /**
     * Limit how many GameRooms to update.
     */
    limit?: number
  }

  /**
   * GameRoom upsert
   */
  export type GameRoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRoom
     */
    select?: GameRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRoom
     */
    omit?: GameRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRoomInclude<ExtArgs> | null
    /**
     * The filter to search for the GameRoom to update in case it exists.
     */
    where: GameRoomWhereUniqueInput
    /**
     * In case the GameRoom found by the `where` argument doesn't exist, create a new GameRoom with this data.
     */
    create: XOR<GameRoomCreateInput, GameRoomUncheckedCreateInput>
    /**
     * In case the GameRoom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameRoomUpdateInput, GameRoomUncheckedUpdateInput>
  }

  /**
   * GameRoom delete
   */
  export type GameRoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRoom
     */
    select?: GameRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRoom
     */
    omit?: GameRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRoomInclude<ExtArgs> | null
    /**
     * Filter which GameRoom to delete.
     */
    where: GameRoomWhereUniqueInput
  }

  /**
   * GameRoom deleteMany
   */
  export type GameRoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameRooms to delete
     */
    where?: GameRoomWhereInput
    /**
     * Limit how many GameRooms to delete.
     */
    limit?: number
  }

  /**
   * GameRoom.players
   */
  export type GameRoom$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomPlayers
     */
    select?: RoomPlayersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomPlayers
     */
    omit?: RoomPlayersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomPlayersInclude<ExtArgs> | null
    where?: RoomPlayersWhereInput
  }

  /**
   * GameRoom.playersList
   */
  export type GameRoom$playersListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    cursor?: PlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * GameRoom without action
   */
  export type GameRoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRoom
     */
    select?: GameRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRoom
     */
    omit?: GameRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRoomInclude<ExtArgs> | null
  }


  /**
   * Model Player
   */

  export type AggregatePlayer = {
    _count: PlayerCountAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  export type PlayerMinAggregateOutputType = {
    id: string | null
    name: string | null
    isReady: boolean | null
    joinedAt: Date | null
    roomId: string | null
  }

  export type PlayerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    isReady: boolean | null
    joinedAt: Date | null
    roomId: string | null
  }

  export type PlayerCountAggregateOutputType = {
    id: number
    name: number
    isReady: number
    joinedAt: number
    roomId: number
    _all: number
  }


  export type PlayerMinAggregateInputType = {
    id?: true
    name?: true
    isReady?: true
    joinedAt?: true
    roomId?: true
  }

  export type PlayerMaxAggregateInputType = {
    id?: true
    name?: true
    isReady?: true
    joinedAt?: true
    roomId?: true
  }

  export type PlayerCountAggregateInputType = {
    id?: true
    name?: true
    isReady?: true
    joinedAt?: true
    roomId?: true
    _all?: true
  }

  export type PlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Player to aggregate.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Players
    **/
    _count?: true | PlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayerMaxAggregateInputType
  }

  export type GetPlayerAggregateType<T extends PlayerAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayer[P]>
      : GetScalarType<T[P], AggregatePlayer[P]>
  }




  export type PlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithAggregationInput | PlayerOrderByWithAggregationInput[]
    by: PlayerScalarFieldEnum[] | PlayerScalarFieldEnum
    having?: PlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayerCountAggregateInputType | true
    _min?: PlayerMinAggregateInputType
    _max?: PlayerMaxAggregateInputType
  }

  export type PlayerGroupByOutputType = {
    id: string
    name: string
    isReady: boolean
    joinedAt: Date
    roomId: string | null
    _count: PlayerCountAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  type GetPlayerGroupByPayload<T extends PlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayerGroupByOutputType[P]>
            : GetScalarType<T[P], PlayerGroupByOutputType[P]>
        }
      >
    >


  export type PlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isReady?: boolean
    joinedAt?: boolean
    roomId?: boolean
    room?: boolean | Player$roomArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isReady?: boolean
    joinedAt?: boolean
    roomId?: boolean
    room?: boolean | Player$roomArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isReady?: boolean
    joinedAt?: boolean
    roomId?: boolean
    room?: boolean | Player$roomArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectScalar = {
    id?: boolean
    name?: boolean
    isReady?: boolean
    joinedAt?: boolean
    roomId?: boolean
  }

  export type PlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "isReady" | "joinedAt" | "roomId", ExtArgs["result"]["player"]>
  export type PlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | Player$roomArgs<ExtArgs>
  }
  export type PlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | Player$roomArgs<ExtArgs>
  }
  export type PlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | Player$roomArgs<ExtArgs>
  }

  export type $PlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Player"
    objects: {
      room: Prisma.$GameRoomPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      isReady: boolean
      joinedAt: Date
      roomId: string | null
    }, ExtArgs["result"]["player"]>
    composites: {}
  }

  type PlayerGetPayload<S extends boolean | null | undefined | PlayerDefaultArgs> = $Result.GetResult<Prisma.$PlayerPayload, S>

  type PlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlayerCountAggregateInputType | true
    }

  export interface PlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Player'], meta: { name: 'Player' } }
    /**
     * Find zero or one Player that matches the filter.
     * @param {PlayerFindUniqueArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerFindUniqueArgs>(args: SelectSubset<T, PlayerFindUniqueArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Player that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlayerFindUniqueOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerFindFirstArgs>(args?: SelectSubset<T, PlayerFindFirstArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Players that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Players
     * const players = await prisma.player.findMany()
     * 
     * // Get first 10 Players
     * const players = await prisma.player.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playerWithIdOnly = await prisma.player.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlayerFindManyArgs>(args?: SelectSubset<T, PlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Player.
     * @param {PlayerCreateArgs} args - Arguments to create a Player.
     * @example
     * // Create one Player
     * const Player = await prisma.player.create({
     *   data: {
     *     // ... data to create a Player
     *   }
     * })
     * 
     */
    create<T extends PlayerCreateArgs>(args: SelectSubset<T, PlayerCreateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Players.
     * @param {PlayerCreateManyArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayerCreateManyArgs>(args?: SelectSubset<T, PlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Players and returns the data saved in the database.
     * @param {PlayerCreateManyAndReturnArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, PlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Player.
     * @param {PlayerDeleteArgs} args - Arguments to delete one Player.
     * @example
     * // Delete one Player
     * const Player = await prisma.player.delete({
     *   where: {
     *     // ... filter to delete one Player
     *   }
     * })
     * 
     */
    delete<T extends PlayerDeleteArgs>(args: SelectSubset<T, PlayerDeleteArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Player.
     * @param {PlayerUpdateArgs} args - Arguments to update one Player.
     * @example
     * // Update one Player
     * const player = await prisma.player.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayerUpdateArgs>(args: SelectSubset<T, PlayerUpdateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Players.
     * @param {PlayerDeleteManyArgs} args - Arguments to filter Players to delete.
     * @example
     * // Delete a few Players
     * const { count } = await prisma.player.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayerDeleteManyArgs>(args?: SelectSubset<T, PlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayerUpdateManyArgs>(args: SelectSubset<T, PlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players and returns the data updated in the database.
     * @param {PlayerUpdateManyAndReturnArgs} args - Arguments to update many Players.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, PlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Player.
     * @param {PlayerUpsertArgs} args - Arguments to update or create a Player.
     * @example
     * // Update or create a Player
     * const player = await prisma.player.upsert({
     *   create: {
     *     // ... data to create a Player
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Player we want to update
     *   }
     * })
     */
    upsert<T extends PlayerUpsertArgs>(args: SelectSubset<T, PlayerUpsertArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerCountArgs} args - Arguments to filter Players to count.
     * @example
     * // Count the number of Players
     * const count = await prisma.player.count({
     *   where: {
     *     // ... the filter for the Players we want to count
     *   }
     * })
    **/
    count<T extends PlayerCountArgs>(
      args?: Subset<T, PlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayerAggregateArgs>(args: Subset<T, PlayerAggregateArgs>): Prisma.PrismaPromise<GetPlayerAggregateType<T>>

    /**
     * Group by Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerGroupByArgs['orderBy'] }
        : { orderBy?: PlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Player model
   */
  readonly fields: PlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Player.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends Player$roomArgs<ExtArgs> = {}>(args?: Subset<T, Player$roomArgs<ExtArgs>>): Prisma__GameRoomClient<$Result.GetResult<Prisma.$GameRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Player model
   */
  interface PlayerFieldRefs {
    readonly id: FieldRef<"Player", 'String'>
    readonly name: FieldRef<"Player", 'String'>
    readonly isReady: FieldRef<"Player", 'Boolean'>
    readonly joinedAt: FieldRef<"Player", 'DateTime'>
    readonly roomId: FieldRef<"Player", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Player findUnique
   */
  export type PlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findUniqueOrThrow
   */
  export type PlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findFirst
   */
  export type PlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findFirstOrThrow
   */
  export type PlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findMany
   */
  export type PlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Players to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player create
   */
  export type PlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a Player.
     */
    data: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
  }

  /**
   * Player createMany
   */
  export type PlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player createManyAndReturn
   */
  export type PlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Player update
   */
  export type PlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a Player.
     */
    data: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
    /**
     * Choose, which Player to update.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player updateMany
   */
  export type PlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
  }

  /**
   * Player updateManyAndReturn
   */
  export type PlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Player upsert
   */
  export type PlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the Player to update in case it exists.
     */
    where: PlayerWhereUniqueInput
    /**
     * In case the Player found by the `where` argument doesn't exist, create a new Player with this data.
     */
    create: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
    /**
     * In case the Player was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
  }

  /**
   * Player delete
   */
  export type PlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter which Player to delete.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player deleteMany
   */
  export type PlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Players to delete
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to delete.
     */
    limit?: number
  }

  /**
   * Player.room
   */
  export type Player$roomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRoom
     */
    select?: GameRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameRoom
     */
    omit?: GameRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameRoomInclude<ExtArgs> | null
    where?: GameRoomWhereInput
  }

  /**
   * Player without action
   */
  export type PlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
  }


  /**
   * Model RoomPlayers
   */

  export type AggregateRoomPlayers = {
    _count: RoomPlayersCountAggregateOutputType | null
    _avg: RoomPlayersAvgAggregateOutputType | null
    _sum: RoomPlayersSumAggregateOutputType | null
    _min: RoomPlayersMinAggregateOutputType | null
    _max: RoomPlayersMaxAggregateOutputType | null
  }

  export type RoomPlayersAvgAggregateOutputType = {
    current: number | null
    max: number | null
  }

  export type RoomPlayersSumAggregateOutputType = {
    current: number | null
    max: number | null
  }

  export type RoomPlayersMinAggregateOutputType = {
    id: string | null
    current: number | null
    max: number | null
    roomId: string | null
  }

  export type RoomPlayersMaxAggregateOutputType = {
    id: string | null
    current: number | null
    max: number | null
    roomId: string | null
  }

  export type RoomPlayersCountAggregateOutputType = {
    id: number
    current: number
    max: number
    roomId: number
    _all: number
  }


  export type RoomPlayersAvgAggregateInputType = {
    current?: true
    max?: true
  }

  export type RoomPlayersSumAggregateInputType = {
    current?: true
    max?: true
  }

  export type RoomPlayersMinAggregateInputType = {
    id?: true
    current?: true
    max?: true
    roomId?: true
  }

  export type RoomPlayersMaxAggregateInputType = {
    id?: true
    current?: true
    max?: true
    roomId?: true
  }

  export type RoomPlayersCountAggregateInputType = {
    id?: true
    current?: true
    max?: true
    roomId?: true
    _all?: true
  }

  export type RoomPlayersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomPlayers to aggregate.
     */
    where?: RoomPlayersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomPlayers to fetch.
     */
    orderBy?: RoomPlayersOrderByWithRelationInput | RoomPlayersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomPlayersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomPlayers
    **/
    _count?: true | RoomPlayersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomPlayersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomPlayersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomPlayersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomPlayersMaxAggregateInputType
  }

  export type GetRoomPlayersAggregateType<T extends RoomPlayersAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomPlayers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomPlayers[P]>
      : GetScalarType<T[P], AggregateRoomPlayers[P]>
  }




  export type RoomPlayersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomPlayersWhereInput
    orderBy?: RoomPlayersOrderByWithAggregationInput | RoomPlayersOrderByWithAggregationInput[]
    by: RoomPlayersScalarFieldEnum[] | RoomPlayersScalarFieldEnum
    having?: RoomPlayersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomPlayersCountAggregateInputType | true
    _avg?: RoomPlayersAvgAggregateInputType
    _sum?: RoomPlayersSumAggregateInputType
    _min?: RoomPlayersMinAggregateInputType
    _max?: RoomPlayersMaxAggregateInputType
  }

  export type RoomPlayersGroupByOutputType = {
    id: string
    current: number
    max: number
    roomId: string
    _count: RoomPlayersCountAggregateOutputType | null
    _avg: RoomPlayersAvgAggregateOutputType | null
    _sum: RoomPlayersSumAggregateOutputType | null
    _min: RoomPlayersMinAggregateOutputType | null
    _max: RoomPlayersMaxAggregateOutputType | null
  }

  type GetRoomPlayersGroupByPayload<T extends RoomPlayersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomPlayersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomPlayersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomPlayersGroupByOutputType[P]>
            : GetScalarType<T[P], RoomPlayersGroupByOutputType[P]>
        }
      >
    >


  export type RoomPlayersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    current?: boolean
    max?: boolean
    roomId?: boolean
    room?: boolean | GameRoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomPlayers"]>

  export type RoomPlayersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    current?: boolean
    max?: boolean
    roomId?: boolean
    room?: boolean | GameRoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomPlayers"]>

  export type RoomPlayersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    current?: boolean
    max?: boolean
    roomId?: boolean
    room?: boolean | GameRoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomPlayers"]>

  export type RoomPlayersSelectScalar = {
    id?: boolean
    current?: boolean
    max?: boolean
    roomId?: boolean
  }

  export type RoomPlayersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "current" | "max" | "roomId", ExtArgs["result"]["roomPlayers"]>
  export type RoomPlayersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | GameRoomDefaultArgs<ExtArgs>
  }
  export type RoomPlayersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | GameRoomDefaultArgs<ExtArgs>
  }
  export type RoomPlayersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | GameRoomDefaultArgs<ExtArgs>
  }

  export type $RoomPlayersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomPlayers"
    objects: {
      room: Prisma.$GameRoomPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      current: number
      max: number
      roomId: string
    }, ExtArgs["result"]["roomPlayers"]>
    composites: {}
  }

  type RoomPlayersGetPayload<S extends boolean | null | undefined | RoomPlayersDefaultArgs> = $Result.GetResult<Prisma.$RoomPlayersPayload, S>

  type RoomPlayersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomPlayersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomPlayersCountAggregateInputType | true
    }

  export interface RoomPlayersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomPlayers'], meta: { name: 'RoomPlayers' } }
    /**
     * Find zero or one RoomPlayers that matches the filter.
     * @param {RoomPlayersFindUniqueArgs} args - Arguments to find a RoomPlayers
     * @example
     * // Get one RoomPlayers
     * const roomPlayers = await prisma.roomPlayers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomPlayersFindUniqueArgs>(args: SelectSubset<T, RoomPlayersFindUniqueArgs<ExtArgs>>): Prisma__RoomPlayersClient<$Result.GetResult<Prisma.$RoomPlayersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomPlayers that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomPlayersFindUniqueOrThrowArgs} args - Arguments to find a RoomPlayers
     * @example
     * // Get one RoomPlayers
     * const roomPlayers = await prisma.roomPlayers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomPlayersFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomPlayersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomPlayersClient<$Result.GetResult<Prisma.$RoomPlayersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomPlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomPlayersFindFirstArgs} args - Arguments to find a RoomPlayers
     * @example
     * // Get one RoomPlayers
     * const roomPlayers = await prisma.roomPlayers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomPlayersFindFirstArgs>(args?: SelectSubset<T, RoomPlayersFindFirstArgs<ExtArgs>>): Prisma__RoomPlayersClient<$Result.GetResult<Prisma.$RoomPlayersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomPlayers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomPlayersFindFirstOrThrowArgs} args - Arguments to find a RoomPlayers
     * @example
     * // Get one RoomPlayers
     * const roomPlayers = await prisma.roomPlayers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomPlayersFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomPlayersFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomPlayersClient<$Result.GetResult<Prisma.$RoomPlayersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomPlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomPlayersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomPlayers
     * const roomPlayers = await prisma.roomPlayers.findMany()
     * 
     * // Get first 10 RoomPlayers
     * const roomPlayers = await prisma.roomPlayers.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomPlayersWithIdOnly = await prisma.roomPlayers.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomPlayersFindManyArgs>(args?: SelectSubset<T, RoomPlayersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPlayersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomPlayers.
     * @param {RoomPlayersCreateArgs} args - Arguments to create a RoomPlayers.
     * @example
     * // Create one RoomPlayers
     * const RoomPlayers = await prisma.roomPlayers.create({
     *   data: {
     *     // ... data to create a RoomPlayers
     *   }
     * })
     * 
     */
    create<T extends RoomPlayersCreateArgs>(args: SelectSubset<T, RoomPlayersCreateArgs<ExtArgs>>): Prisma__RoomPlayersClient<$Result.GetResult<Prisma.$RoomPlayersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomPlayers.
     * @param {RoomPlayersCreateManyArgs} args - Arguments to create many RoomPlayers.
     * @example
     * // Create many RoomPlayers
     * const roomPlayers = await prisma.roomPlayers.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomPlayersCreateManyArgs>(args?: SelectSubset<T, RoomPlayersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomPlayers and returns the data saved in the database.
     * @param {RoomPlayersCreateManyAndReturnArgs} args - Arguments to create many RoomPlayers.
     * @example
     * // Create many RoomPlayers
     * const roomPlayers = await prisma.roomPlayers.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomPlayers and only return the `id`
     * const roomPlayersWithIdOnly = await prisma.roomPlayers.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomPlayersCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomPlayersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPlayersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomPlayers.
     * @param {RoomPlayersDeleteArgs} args - Arguments to delete one RoomPlayers.
     * @example
     * // Delete one RoomPlayers
     * const RoomPlayers = await prisma.roomPlayers.delete({
     *   where: {
     *     // ... filter to delete one RoomPlayers
     *   }
     * })
     * 
     */
    delete<T extends RoomPlayersDeleteArgs>(args: SelectSubset<T, RoomPlayersDeleteArgs<ExtArgs>>): Prisma__RoomPlayersClient<$Result.GetResult<Prisma.$RoomPlayersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomPlayers.
     * @param {RoomPlayersUpdateArgs} args - Arguments to update one RoomPlayers.
     * @example
     * // Update one RoomPlayers
     * const roomPlayers = await prisma.roomPlayers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomPlayersUpdateArgs>(args: SelectSubset<T, RoomPlayersUpdateArgs<ExtArgs>>): Prisma__RoomPlayersClient<$Result.GetResult<Prisma.$RoomPlayersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomPlayers.
     * @param {RoomPlayersDeleteManyArgs} args - Arguments to filter RoomPlayers to delete.
     * @example
     * // Delete a few RoomPlayers
     * const { count } = await prisma.roomPlayers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomPlayersDeleteManyArgs>(args?: SelectSubset<T, RoomPlayersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomPlayersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomPlayers
     * const roomPlayers = await prisma.roomPlayers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomPlayersUpdateManyArgs>(args: SelectSubset<T, RoomPlayersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomPlayers and returns the data updated in the database.
     * @param {RoomPlayersUpdateManyAndReturnArgs} args - Arguments to update many RoomPlayers.
     * @example
     * // Update many RoomPlayers
     * const roomPlayers = await prisma.roomPlayers.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomPlayers and only return the `id`
     * const roomPlayersWithIdOnly = await prisma.roomPlayers.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomPlayersUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomPlayersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPlayersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomPlayers.
     * @param {RoomPlayersUpsertArgs} args - Arguments to update or create a RoomPlayers.
     * @example
     * // Update or create a RoomPlayers
     * const roomPlayers = await prisma.roomPlayers.upsert({
     *   create: {
     *     // ... data to create a RoomPlayers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomPlayers we want to update
     *   }
     * })
     */
    upsert<T extends RoomPlayersUpsertArgs>(args: SelectSubset<T, RoomPlayersUpsertArgs<ExtArgs>>): Prisma__RoomPlayersClient<$Result.GetResult<Prisma.$RoomPlayersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomPlayersCountArgs} args - Arguments to filter RoomPlayers to count.
     * @example
     * // Count the number of RoomPlayers
     * const count = await prisma.roomPlayers.count({
     *   where: {
     *     // ... the filter for the RoomPlayers we want to count
     *   }
     * })
    **/
    count<T extends RoomPlayersCountArgs>(
      args?: Subset<T, RoomPlayersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomPlayersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomPlayersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomPlayersAggregateArgs>(args: Subset<T, RoomPlayersAggregateArgs>): Prisma.PrismaPromise<GetRoomPlayersAggregateType<T>>

    /**
     * Group by RoomPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomPlayersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomPlayersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomPlayersGroupByArgs['orderBy'] }
        : { orderBy?: RoomPlayersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomPlayersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomPlayersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomPlayers model
   */
  readonly fields: RoomPlayersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomPlayers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomPlayersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends GameRoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameRoomDefaultArgs<ExtArgs>>): Prisma__GameRoomClient<$Result.GetResult<Prisma.$GameRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomPlayers model
   */
  interface RoomPlayersFieldRefs {
    readonly id: FieldRef<"RoomPlayers", 'String'>
    readonly current: FieldRef<"RoomPlayers", 'Int'>
    readonly max: FieldRef<"RoomPlayers", 'Int'>
    readonly roomId: FieldRef<"RoomPlayers", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RoomPlayers findUnique
   */
  export type RoomPlayersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomPlayers
     */
    select?: RoomPlayersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomPlayers
     */
    omit?: RoomPlayersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomPlayersInclude<ExtArgs> | null
    /**
     * Filter, which RoomPlayers to fetch.
     */
    where: RoomPlayersWhereUniqueInput
  }

  /**
   * RoomPlayers findUniqueOrThrow
   */
  export type RoomPlayersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomPlayers
     */
    select?: RoomPlayersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomPlayers
     */
    omit?: RoomPlayersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomPlayersInclude<ExtArgs> | null
    /**
     * Filter, which RoomPlayers to fetch.
     */
    where: RoomPlayersWhereUniqueInput
  }

  /**
   * RoomPlayers findFirst
   */
  export type RoomPlayersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomPlayers
     */
    select?: RoomPlayersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomPlayers
     */
    omit?: RoomPlayersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomPlayersInclude<ExtArgs> | null
    /**
     * Filter, which RoomPlayers to fetch.
     */
    where?: RoomPlayersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomPlayers to fetch.
     */
    orderBy?: RoomPlayersOrderByWithRelationInput | RoomPlayersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomPlayers.
     */
    cursor?: RoomPlayersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomPlayers.
     */
    distinct?: RoomPlayersScalarFieldEnum | RoomPlayersScalarFieldEnum[]
  }

  /**
   * RoomPlayers findFirstOrThrow
   */
  export type RoomPlayersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomPlayers
     */
    select?: RoomPlayersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomPlayers
     */
    omit?: RoomPlayersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomPlayersInclude<ExtArgs> | null
    /**
     * Filter, which RoomPlayers to fetch.
     */
    where?: RoomPlayersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomPlayers to fetch.
     */
    orderBy?: RoomPlayersOrderByWithRelationInput | RoomPlayersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomPlayers.
     */
    cursor?: RoomPlayersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomPlayers.
     */
    distinct?: RoomPlayersScalarFieldEnum | RoomPlayersScalarFieldEnum[]
  }

  /**
   * RoomPlayers findMany
   */
  export type RoomPlayersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomPlayers
     */
    select?: RoomPlayersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomPlayers
     */
    omit?: RoomPlayersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomPlayersInclude<ExtArgs> | null
    /**
     * Filter, which RoomPlayers to fetch.
     */
    where?: RoomPlayersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomPlayers to fetch.
     */
    orderBy?: RoomPlayersOrderByWithRelationInput | RoomPlayersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomPlayers.
     */
    cursor?: RoomPlayersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomPlayers.
     */
    skip?: number
    distinct?: RoomPlayersScalarFieldEnum | RoomPlayersScalarFieldEnum[]
  }

  /**
   * RoomPlayers create
   */
  export type RoomPlayersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomPlayers
     */
    select?: RoomPlayersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomPlayers
     */
    omit?: RoomPlayersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomPlayersInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomPlayers.
     */
    data: XOR<RoomPlayersCreateInput, RoomPlayersUncheckedCreateInput>
  }

  /**
   * RoomPlayers createMany
   */
  export type RoomPlayersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomPlayers.
     */
    data: RoomPlayersCreateManyInput | RoomPlayersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomPlayers createManyAndReturn
   */
  export type RoomPlayersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomPlayers
     */
    select?: RoomPlayersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomPlayers
     */
    omit?: RoomPlayersOmit<ExtArgs> | null
    /**
     * The data used to create many RoomPlayers.
     */
    data: RoomPlayersCreateManyInput | RoomPlayersCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomPlayersIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomPlayers update
   */
  export type RoomPlayersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomPlayers
     */
    select?: RoomPlayersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomPlayers
     */
    omit?: RoomPlayersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomPlayersInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomPlayers.
     */
    data: XOR<RoomPlayersUpdateInput, RoomPlayersUncheckedUpdateInput>
    /**
     * Choose, which RoomPlayers to update.
     */
    where: RoomPlayersWhereUniqueInput
  }

  /**
   * RoomPlayers updateMany
   */
  export type RoomPlayersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomPlayers.
     */
    data: XOR<RoomPlayersUpdateManyMutationInput, RoomPlayersUncheckedUpdateManyInput>
    /**
     * Filter which RoomPlayers to update
     */
    where?: RoomPlayersWhereInput
    /**
     * Limit how many RoomPlayers to update.
     */
    limit?: number
  }

  /**
   * RoomPlayers updateManyAndReturn
   */
  export type RoomPlayersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomPlayers
     */
    select?: RoomPlayersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomPlayers
     */
    omit?: RoomPlayersOmit<ExtArgs> | null
    /**
     * The data used to update RoomPlayers.
     */
    data: XOR<RoomPlayersUpdateManyMutationInput, RoomPlayersUncheckedUpdateManyInput>
    /**
     * Filter which RoomPlayers to update
     */
    where?: RoomPlayersWhereInput
    /**
     * Limit how many RoomPlayers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomPlayersIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomPlayers upsert
   */
  export type RoomPlayersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomPlayers
     */
    select?: RoomPlayersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomPlayers
     */
    omit?: RoomPlayersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomPlayersInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomPlayers to update in case it exists.
     */
    where: RoomPlayersWhereUniqueInput
    /**
     * In case the RoomPlayers found by the `where` argument doesn't exist, create a new RoomPlayers with this data.
     */
    create: XOR<RoomPlayersCreateInput, RoomPlayersUncheckedCreateInput>
    /**
     * In case the RoomPlayers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomPlayersUpdateInput, RoomPlayersUncheckedUpdateInput>
  }

  /**
   * RoomPlayers delete
   */
  export type RoomPlayersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomPlayers
     */
    select?: RoomPlayersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomPlayers
     */
    omit?: RoomPlayersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomPlayersInclude<ExtArgs> | null
    /**
     * Filter which RoomPlayers to delete.
     */
    where: RoomPlayersWhereUniqueInput
  }

  /**
   * RoomPlayers deleteMany
   */
  export type RoomPlayersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomPlayers to delete
     */
    where?: RoomPlayersWhereInput
    /**
     * Limit how many RoomPlayers to delete.
     */
    limit?: number
  }

  /**
   * RoomPlayers without action
   */
  export type RoomPlayersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomPlayers
     */
    select?: RoomPlayersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomPlayers
     */
    omit?: RoomPlayersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomPlayersInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const GameRoomScalarFieldEnum: {
    id: 'id',
    roomCode: 'roomCode',
    title: 'title',
    imageUrl: 'imageUrl',
    status: 'status',
    createdAt: 'createdAt',
    hostId: 'hostId',
    hostName: 'hostName',
    isPrivate: 'isPrivate'
  };

  export type GameRoomScalarFieldEnum = (typeof GameRoomScalarFieldEnum)[keyof typeof GameRoomScalarFieldEnum]


  export const PlayerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    isReady: 'isReady',
    joinedAt: 'joinedAt',
    roomId: 'roomId'
  };

  export type PlayerScalarFieldEnum = (typeof PlayerScalarFieldEnum)[keyof typeof PlayerScalarFieldEnum]


  export const RoomPlayersScalarFieldEnum: {
    id: 'id',
    current: 'current',
    max: 'max',
    roomId: 'roomId'
  };

  export type RoomPlayersScalarFieldEnum = (typeof RoomPlayersScalarFieldEnum)[keyof typeof RoomPlayersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'RoomStatus'
   */
  export type EnumRoomStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoomStatus'>
    


  /**
   * Reference to a field of type 'RoomStatus[]'
   */
  export type ListEnumRoomStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoomStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type GameRoomWhereInput = {
    AND?: GameRoomWhereInput | GameRoomWhereInput[]
    OR?: GameRoomWhereInput[]
    NOT?: GameRoomWhereInput | GameRoomWhereInput[]
    id?: StringFilter<"GameRoom"> | string
    roomCode?: StringFilter<"GameRoom"> | string
    title?: StringFilter<"GameRoom"> | string
    imageUrl?: StringFilter<"GameRoom"> | string
    status?: EnumRoomStatusFilter<"GameRoom"> | $Enums.RoomStatus
    createdAt?: DateTimeFilter<"GameRoom"> | Date | string
    hostId?: StringFilter<"GameRoom"> | string
    hostName?: StringFilter<"GameRoom"> | string
    isPrivate?: BoolFilter<"GameRoom"> | boolean
    players?: XOR<RoomPlayersNullableScalarRelationFilter, RoomPlayersWhereInput> | null
    playersList?: PlayerListRelationFilter
  }

  export type GameRoomOrderByWithRelationInput = {
    id?: SortOrder
    roomCode?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    hostId?: SortOrder
    hostName?: SortOrder
    isPrivate?: SortOrder
    players?: RoomPlayersOrderByWithRelationInput
    playersList?: PlayerOrderByRelationAggregateInput
  }

  export type GameRoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    roomCode?: string
    AND?: GameRoomWhereInput | GameRoomWhereInput[]
    OR?: GameRoomWhereInput[]
    NOT?: GameRoomWhereInput | GameRoomWhereInput[]
    title?: StringFilter<"GameRoom"> | string
    imageUrl?: StringFilter<"GameRoom"> | string
    status?: EnumRoomStatusFilter<"GameRoom"> | $Enums.RoomStatus
    createdAt?: DateTimeFilter<"GameRoom"> | Date | string
    hostId?: StringFilter<"GameRoom"> | string
    hostName?: StringFilter<"GameRoom"> | string
    isPrivate?: BoolFilter<"GameRoom"> | boolean
    players?: XOR<RoomPlayersNullableScalarRelationFilter, RoomPlayersWhereInput> | null
    playersList?: PlayerListRelationFilter
  }, "id" | "roomCode">

  export type GameRoomOrderByWithAggregationInput = {
    id?: SortOrder
    roomCode?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    hostId?: SortOrder
    hostName?: SortOrder
    isPrivate?: SortOrder
    _count?: GameRoomCountOrderByAggregateInput
    _max?: GameRoomMaxOrderByAggregateInput
    _min?: GameRoomMinOrderByAggregateInput
  }

  export type GameRoomScalarWhereWithAggregatesInput = {
    AND?: GameRoomScalarWhereWithAggregatesInput | GameRoomScalarWhereWithAggregatesInput[]
    OR?: GameRoomScalarWhereWithAggregatesInput[]
    NOT?: GameRoomScalarWhereWithAggregatesInput | GameRoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GameRoom"> | string
    roomCode?: StringWithAggregatesFilter<"GameRoom"> | string
    title?: StringWithAggregatesFilter<"GameRoom"> | string
    imageUrl?: StringWithAggregatesFilter<"GameRoom"> | string
    status?: EnumRoomStatusWithAggregatesFilter<"GameRoom"> | $Enums.RoomStatus
    createdAt?: DateTimeWithAggregatesFilter<"GameRoom"> | Date | string
    hostId?: StringWithAggregatesFilter<"GameRoom"> | string
    hostName?: StringWithAggregatesFilter<"GameRoom"> | string
    isPrivate?: BoolWithAggregatesFilter<"GameRoom"> | boolean
  }

  export type PlayerWhereInput = {
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    id?: StringFilter<"Player"> | string
    name?: StringFilter<"Player"> | string
    isReady?: BoolFilter<"Player"> | boolean
    joinedAt?: DateTimeFilter<"Player"> | Date | string
    roomId?: StringNullableFilter<"Player"> | string | null
    room?: XOR<GameRoomNullableScalarRelationFilter, GameRoomWhereInput> | null
  }

  export type PlayerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    isReady?: SortOrder
    joinedAt?: SortOrder
    roomId?: SortOrderInput | SortOrder
    room?: GameRoomOrderByWithRelationInput
  }

  export type PlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    name?: StringFilter<"Player"> | string
    isReady?: BoolFilter<"Player"> | boolean
    joinedAt?: DateTimeFilter<"Player"> | Date | string
    roomId?: StringNullableFilter<"Player"> | string | null
    room?: XOR<GameRoomNullableScalarRelationFilter, GameRoomWhereInput> | null
  }, "id">

  export type PlayerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    isReady?: SortOrder
    joinedAt?: SortOrder
    roomId?: SortOrderInput | SortOrder
    _count?: PlayerCountOrderByAggregateInput
    _max?: PlayerMaxOrderByAggregateInput
    _min?: PlayerMinOrderByAggregateInput
  }

  export type PlayerScalarWhereWithAggregatesInput = {
    AND?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    OR?: PlayerScalarWhereWithAggregatesInput[]
    NOT?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Player"> | string
    name?: StringWithAggregatesFilter<"Player"> | string
    isReady?: BoolWithAggregatesFilter<"Player"> | boolean
    joinedAt?: DateTimeWithAggregatesFilter<"Player"> | Date | string
    roomId?: StringNullableWithAggregatesFilter<"Player"> | string | null
  }

  export type RoomPlayersWhereInput = {
    AND?: RoomPlayersWhereInput | RoomPlayersWhereInput[]
    OR?: RoomPlayersWhereInput[]
    NOT?: RoomPlayersWhereInput | RoomPlayersWhereInput[]
    id?: StringFilter<"RoomPlayers"> | string
    current?: IntFilter<"RoomPlayers"> | number
    max?: IntFilter<"RoomPlayers"> | number
    roomId?: StringFilter<"RoomPlayers"> | string
    room?: XOR<GameRoomScalarRelationFilter, GameRoomWhereInput>
  }

  export type RoomPlayersOrderByWithRelationInput = {
    id?: SortOrder
    current?: SortOrder
    max?: SortOrder
    roomId?: SortOrder
    room?: GameRoomOrderByWithRelationInput
  }

  export type RoomPlayersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    roomId?: string
    AND?: RoomPlayersWhereInput | RoomPlayersWhereInput[]
    OR?: RoomPlayersWhereInput[]
    NOT?: RoomPlayersWhereInput | RoomPlayersWhereInput[]
    current?: IntFilter<"RoomPlayers"> | number
    max?: IntFilter<"RoomPlayers"> | number
    room?: XOR<GameRoomScalarRelationFilter, GameRoomWhereInput>
  }, "id" | "roomId">

  export type RoomPlayersOrderByWithAggregationInput = {
    id?: SortOrder
    current?: SortOrder
    max?: SortOrder
    roomId?: SortOrder
    _count?: RoomPlayersCountOrderByAggregateInput
    _avg?: RoomPlayersAvgOrderByAggregateInput
    _max?: RoomPlayersMaxOrderByAggregateInput
    _min?: RoomPlayersMinOrderByAggregateInput
    _sum?: RoomPlayersSumOrderByAggregateInput
  }

  export type RoomPlayersScalarWhereWithAggregatesInput = {
    AND?: RoomPlayersScalarWhereWithAggregatesInput | RoomPlayersScalarWhereWithAggregatesInput[]
    OR?: RoomPlayersScalarWhereWithAggregatesInput[]
    NOT?: RoomPlayersScalarWhereWithAggregatesInput | RoomPlayersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomPlayers"> | string
    current?: IntWithAggregatesFilter<"RoomPlayers"> | number
    max?: IntWithAggregatesFilter<"RoomPlayers"> | number
    roomId?: StringWithAggregatesFilter<"RoomPlayers"> | string
  }

  export type GameRoomCreateInput = {
    id?: string
    roomCode: string
    title: string
    imageUrl: string
    status: $Enums.RoomStatus
    createdAt?: Date | string
    hostId: string
    hostName: string
    isPrivate: boolean
    players?: RoomPlayersCreateNestedOneWithoutRoomInput
    playersList?: PlayerCreateNestedManyWithoutRoomInput
  }

  export type GameRoomUncheckedCreateInput = {
    id?: string
    roomCode: string
    title: string
    imageUrl: string
    status: $Enums.RoomStatus
    createdAt?: Date | string
    hostId: string
    hostName: string
    isPrivate: boolean
    players?: RoomPlayersUncheckedCreateNestedOneWithoutRoomInput
    playersList?: PlayerUncheckedCreateNestedManyWithoutRoomInput
  }

  export type GameRoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCode?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hostId?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    players?: RoomPlayersUpdateOneWithoutRoomNestedInput
    playersList?: PlayerUpdateManyWithoutRoomNestedInput
  }

  export type GameRoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCode?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hostId?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    players?: RoomPlayersUncheckedUpdateOneWithoutRoomNestedInput
    playersList?: PlayerUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type GameRoomCreateManyInput = {
    id?: string
    roomCode: string
    title: string
    imageUrl: string
    status: $Enums.RoomStatus
    createdAt?: Date | string
    hostId: string
    hostName: string
    isPrivate: boolean
  }

  export type GameRoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCode?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hostId?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GameRoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCode?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hostId?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PlayerCreateInput = {
    id: string
    name: string
    isReady: boolean
    joinedAt: Date | string
    room?: GameRoomCreateNestedOneWithoutPlayersListInput
  }

  export type PlayerUncheckedCreateInput = {
    id: string
    name: string
    isReady: boolean
    joinedAt: Date | string
    roomId?: string | null
  }

  export type PlayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isReady?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: GameRoomUpdateOneWithoutPlayersListNestedInput
  }

  export type PlayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isReady?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PlayerCreateManyInput = {
    id: string
    name: string
    isReady: boolean
    joinedAt: Date | string
    roomId?: string | null
  }

  export type PlayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isReady?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isReady?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoomPlayersCreateInput = {
    id?: string
    current: number
    max: number
    room: GameRoomCreateNestedOneWithoutPlayersInput
  }

  export type RoomPlayersUncheckedCreateInput = {
    id?: string
    current: number
    max: number
    roomId: string
  }

  export type RoomPlayersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    current?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
    room?: GameRoomUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type RoomPlayersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    current?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
    roomId?: StringFieldUpdateOperationsInput | string
  }

  export type RoomPlayersCreateManyInput = {
    id?: string
    current: number
    max: number
    roomId: string
  }

  export type RoomPlayersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    current?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
  }

  export type RoomPlayersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    current?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
    roomId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoomStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomStatus | EnumRoomStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoomStatus[] | ListEnumRoomStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomStatus[] | ListEnumRoomStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomStatusFilter<$PrismaModel> | $Enums.RoomStatus
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type RoomPlayersNullableScalarRelationFilter = {
    is?: RoomPlayersWhereInput | null
    isNot?: RoomPlayersWhereInput | null
  }

  export type PlayerListRelationFilter = {
    every?: PlayerWhereInput
    some?: PlayerWhereInput
    none?: PlayerWhereInput
  }

  export type PlayerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameRoomCountOrderByAggregateInput = {
    id?: SortOrder
    roomCode?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    hostId?: SortOrder
    hostName?: SortOrder
    isPrivate?: SortOrder
  }

  export type GameRoomMaxOrderByAggregateInput = {
    id?: SortOrder
    roomCode?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    hostId?: SortOrder
    hostName?: SortOrder
    isPrivate?: SortOrder
  }

  export type GameRoomMinOrderByAggregateInput = {
    id?: SortOrder
    roomCode?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    hostId?: SortOrder
    hostName?: SortOrder
    isPrivate?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoomStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomStatus | EnumRoomStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoomStatus[] | ListEnumRoomStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomStatus[] | ListEnumRoomStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomStatusWithAggregatesFilter<$PrismaModel> | $Enums.RoomStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoomStatusFilter<$PrismaModel>
    _max?: NestedEnumRoomStatusFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type GameRoomNullableScalarRelationFilter = {
    is?: GameRoomWhereInput | null
    isNot?: GameRoomWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PlayerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isReady?: SortOrder
    joinedAt?: SortOrder
    roomId?: SortOrder
  }

  export type PlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isReady?: SortOrder
    joinedAt?: SortOrder
    roomId?: SortOrder
  }

  export type PlayerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isReady?: SortOrder
    joinedAt?: SortOrder
    roomId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type GameRoomScalarRelationFilter = {
    is?: GameRoomWhereInput
    isNot?: GameRoomWhereInput
  }

  export type RoomPlayersCountOrderByAggregateInput = {
    id?: SortOrder
    current?: SortOrder
    max?: SortOrder
    roomId?: SortOrder
  }

  export type RoomPlayersAvgOrderByAggregateInput = {
    current?: SortOrder
    max?: SortOrder
  }

  export type RoomPlayersMaxOrderByAggregateInput = {
    id?: SortOrder
    current?: SortOrder
    max?: SortOrder
    roomId?: SortOrder
  }

  export type RoomPlayersMinOrderByAggregateInput = {
    id?: SortOrder
    current?: SortOrder
    max?: SortOrder
    roomId?: SortOrder
  }

  export type RoomPlayersSumOrderByAggregateInput = {
    current?: SortOrder
    max?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type RoomPlayersCreateNestedOneWithoutRoomInput = {
    create?: XOR<RoomPlayersCreateWithoutRoomInput, RoomPlayersUncheckedCreateWithoutRoomInput>
    connectOrCreate?: RoomPlayersCreateOrConnectWithoutRoomInput
    connect?: RoomPlayersWhereUniqueInput
  }

  export type PlayerCreateNestedManyWithoutRoomInput = {
    create?: XOR<PlayerCreateWithoutRoomInput, PlayerUncheckedCreateWithoutRoomInput> | PlayerCreateWithoutRoomInput[] | PlayerUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutRoomInput | PlayerCreateOrConnectWithoutRoomInput[]
    createMany?: PlayerCreateManyRoomInputEnvelope
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
  }

  export type RoomPlayersUncheckedCreateNestedOneWithoutRoomInput = {
    create?: XOR<RoomPlayersCreateWithoutRoomInput, RoomPlayersUncheckedCreateWithoutRoomInput>
    connectOrCreate?: RoomPlayersCreateOrConnectWithoutRoomInput
    connect?: RoomPlayersWhereUniqueInput
  }

  export type PlayerUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<PlayerCreateWithoutRoomInput, PlayerUncheckedCreateWithoutRoomInput> | PlayerCreateWithoutRoomInput[] | PlayerUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutRoomInput | PlayerCreateOrConnectWithoutRoomInput[]
    createMany?: PlayerCreateManyRoomInputEnvelope
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoomStatusFieldUpdateOperationsInput = {
    set?: $Enums.RoomStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RoomPlayersUpdateOneWithoutRoomNestedInput = {
    create?: XOR<RoomPlayersCreateWithoutRoomInput, RoomPlayersUncheckedCreateWithoutRoomInput>
    connectOrCreate?: RoomPlayersCreateOrConnectWithoutRoomInput
    upsert?: RoomPlayersUpsertWithoutRoomInput
    disconnect?: RoomPlayersWhereInput | boolean
    delete?: RoomPlayersWhereInput | boolean
    connect?: RoomPlayersWhereUniqueInput
    update?: XOR<XOR<RoomPlayersUpdateToOneWithWhereWithoutRoomInput, RoomPlayersUpdateWithoutRoomInput>, RoomPlayersUncheckedUpdateWithoutRoomInput>
  }

  export type PlayerUpdateManyWithoutRoomNestedInput = {
    create?: XOR<PlayerCreateWithoutRoomInput, PlayerUncheckedCreateWithoutRoomInput> | PlayerCreateWithoutRoomInput[] | PlayerUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutRoomInput | PlayerCreateOrConnectWithoutRoomInput[]
    upsert?: PlayerUpsertWithWhereUniqueWithoutRoomInput | PlayerUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: PlayerCreateManyRoomInputEnvelope
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    update?: PlayerUpdateWithWhereUniqueWithoutRoomInput | PlayerUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: PlayerUpdateManyWithWhereWithoutRoomInput | PlayerUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
  }

  export type RoomPlayersUncheckedUpdateOneWithoutRoomNestedInput = {
    create?: XOR<RoomPlayersCreateWithoutRoomInput, RoomPlayersUncheckedCreateWithoutRoomInput>
    connectOrCreate?: RoomPlayersCreateOrConnectWithoutRoomInput
    upsert?: RoomPlayersUpsertWithoutRoomInput
    disconnect?: RoomPlayersWhereInput | boolean
    delete?: RoomPlayersWhereInput | boolean
    connect?: RoomPlayersWhereUniqueInput
    update?: XOR<XOR<RoomPlayersUpdateToOneWithWhereWithoutRoomInput, RoomPlayersUpdateWithoutRoomInput>, RoomPlayersUncheckedUpdateWithoutRoomInput>
  }

  export type PlayerUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<PlayerCreateWithoutRoomInput, PlayerUncheckedCreateWithoutRoomInput> | PlayerCreateWithoutRoomInput[] | PlayerUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutRoomInput | PlayerCreateOrConnectWithoutRoomInput[]
    upsert?: PlayerUpsertWithWhereUniqueWithoutRoomInput | PlayerUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: PlayerCreateManyRoomInputEnvelope
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    update?: PlayerUpdateWithWhereUniqueWithoutRoomInput | PlayerUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: PlayerUpdateManyWithWhereWithoutRoomInput | PlayerUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
  }

  export type GameRoomCreateNestedOneWithoutPlayersListInput = {
    create?: XOR<GameRoomCreateWithoutPlayersListInput, GameRoomUncheckedCreateWithoutPlayersListInput>
    connectOrCreate?: GameRoomCreateOrConnectWithoutPlayersListInput
    connect?: GameRoomWhereUniqueInput
  }

  export type GameRoomUpdateOneWithoutPlayersListNestedInput = {
    create?: XOR<GameRoomCreateWithoutPlayersListInput, GameRoomUncheckedCreateWithoutPlayersListInput>
    connectOrCreate?: GameRoomCreateOrConnectWithoutPlayersListInput
    upsert?: GameRoomUpsertWithoutPlayersListInput
    disconnect?: GameRoomWhereInput | boolean
    delete?: GameRoomWhereInput | boolean
    connect?: GameRoomWhereUniqueInput
    update?: XOR<XOR<GameRoomUpdateToOneWithWhereWithoutPlayersListInput, GameRoomUpdateWithoutPlayersListInput>, GameRoomUncheckedUpdateWithoutPlayersListInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type GameRoomCreateNestedOneWithoutPlayersInput = {
    create?: XOR<GameRoomCreateWithoutPlayersInput, GameRoomUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: GameRoomCreateOrConnectWithoutPlayersInput
    connect?: GameRoomWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GameRoomUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<GameRoomCreateWithoutPlayersInput, GameRoomUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: GameRoomCreateOrConnectWithoutPlayersInput
    upsert?: GameRoomUpsertWithoutPlayersInput
    connect?: GameRoomWhereUniqueInput
    update?: XOR<XOR<GameRoomUpdateToOneWithWhereWithoutPlayersInput, GameRoomUpdateWithoutPlayersInput>, GameRoomUncheckedUpdateWithoutPlayersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoomStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomStatus | EnumRoomStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoomStatus[] | ListEnumRoomStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomStatus[] | ListEnumRoomStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomStatusFilter<$PrismaModel> | $Enums.RoomStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoomStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomStatus | EnumRoomStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoomStatus[] | ListEnumRoomStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomStatus[] | ListEnumRoomStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomStatusWithAggregatesFilter<$PrismaModel> | $Enums.RoomStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoomStatusFilter<$PrismaModel>
    _max?: NestedEnumRoomStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type RoomPlayersCreateWithoutRoomInput = {
    id?: string
    current: number
    max: number
  }

  export type RoomPlayersUncheckedCreateWithoutRoomInput = {
    id?: string
    current: number
    max: number
  }

  export type RoomPlayersCreateOrConnectWithoutRoomInput = {
    where: RoomPlayersWhereUniqueInput
    create: XOR<RoomPlayersCreateWithoutRoomInput, RoomPlayersUncheckedCreateWithoutRoomInput>
  }

  export type PlayerCreateWithoutRoomInput = {
    id: string
    name: string
    isReady: boolean
    joinedAt: Date | string
  }

  export type PlayerUncheckedCreateWithoutRoomInput = {
    id: string
    name: string
    isReady: boolean
    joinedAt: Date | string
  }

  export type PlayerCreateOrConnectWithoutRoomInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutRoomInput, PlayerUncheckedCreateWithoutRoomInput>
  }

  export type PlayerCreateManyRoomInputEnvelope = {
    data: PlayerCreateManyRoomInput | PlayerCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type RoomPlayersUpsertWithoutRoomInput = {
    update: XOR<RoomPlayersUpdateWithoutRoomInput, RoomPlayersUncheckedUpdateWithoutRoomInput>
    create: XOR<RoomPlayersCreateWithoutRoomInput, RoomPlayersUncheckedCreateWithoutRoomInput>
    where?: RoomPlayersWhereInput
  }

  export type RoomPlayersUpdateToOneWithWhereWithoutRoomInput = {
    where?: RoomPlayersWhereInput
    data: XOR<RoomPlayersUpdateWithoutRoomInput, RoomPlayersUncheckedUpdateWithoutRoomInput>
  }

  export type RoomPlayersUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    current?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
  }

  export type RoomPlayersUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    current?: IntFieldUpdateOperationsInput | number
    max?: IntFieldUpdateOperationsInput | number
  }

  export type PlayerUpsertWithWhereUniqueWithoutRoomInput = {
    where: PlayerWhereUniqueInput
    update: XOR<PlayerUpdateWithoutRoomInput, PlayerUncheckedUpdateWithoutRoomInput>
    create: XOR<PlayerCreateWithoutRoomInput, PlayerUncheckedCreateWithoutRoomInput>
  }

  export type PlayerUpdateWithWhereUniqueWithoutRoomInput = {
    where: PlayerWhereUniqueInput
    data: XOR<PlayerUpdateWithoutRoomInput, PlayerUncheckedUpdateWithoutRoomInput>
  }

  export type PlayerUpdateManyWithWhereWithoutRoomInput = {
    where: PlayerScalarWhereInput
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyWithoutRoomInput>
  }

  export type PlayerScalarWhereInput = {
    AND?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
    OR?: PlayerScalarWhereInput[]
    NOT?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
    id?: StringFilter<"Player"> | string
    name?: StringFilter<"Player"> | string
    isReady?: BoolFilter<"Player"> | boolean
    joinedAt?: DateTimeFilter<"Player"> | Date | string
    roomId?: StringNullableFilter<"Player"> | string | null
  }

  export type GameRoomCreateWithoutPlayersListInput = {
    id?: string
    roomCode: string
    title: string
    imageUrl: string
    status: $Enums.RoomStatus
    createdAt?: Date | string
    hostId: string
    hostName: string
    isPrivate: boolean
    players?: RoomPlayersCreateNestedOneWithoutRoomInput
  }

  export type GameRoomUncheckedCreateWithoutPlayersListInput = {
    id?: string
    roomCode: string
    title: string
    imageUrl: string
    status: $Enums.RoomStatus
    createdAt?: Date | string
    hostId: string
    hostName: string
    isPrivate: boolean
    players?: RoomPlayersUncheckedCreateNestedOneWithoutRoomInput
  }

  export type GameRoomCreateOrConnectWithoutPlayersListInput = {
    where: GameRoomWhereUniqueInput
    create: XOR<GameRoomCreateWithoutPlayersListInput, GameRoomUncheckedCreateWithoutPlayersListInput>
  }

  export type GameRoomUpsertWithoutPlayersListInput = {
    update: XOR<GameRoomUpdateWithoutPlayersListInput, GameRoomUncheckedUpdateWithoutPlayersListInput>
    create: XOR<GameRoomCreateWithoutPlayersListInput, GameRoomUncheckedCreateWithoutPlayersListInput>
    where?: GameRoomWhereInput
  }

  export type GameRoomUpdateToOneWithWhereWithoutPlayersListInput = {
    where?: GameRoomWhereInput
    data: XOR<GameRoomUpdateWithoutPlayersListInput, GameRoomUncheckedUpdateWithoutPlayersListInput>
  }

  export type GameRoomUpdateWithoutPlayersListInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCode?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hostId?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    players?: RoomPlayersUpdateOneWithoutRoomNestedInput
  }

  export type GameRoomUncheckedUpdateWithoutPlayersListInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCode?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hostId?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    players?: RoomPlayersUncheckedUpdateOneWithoutRoomNestedInput
  }

  export type GameRoomCreateWithoutPlayersInput = {
    id?: string
    roomCode: string
    title: string
    imageUrl: string
    status: $Enums.RoomStatus
    createdAt?: Date | string
    hostId: string
    hostName: string
    isPrivate: boolean
    playersList?: PlayerCreateNestedManyWithoutRoomInput
  }

  export type GameRoomUncheckedCreateWithoutPlayersInput = {
    id?: string
    roomCode: string
    title: string
    imageUrl: string
    status: $Enums.RoomStatus
    createdAt?: Date | string
    hostId: string
    hostName: string
    isPrivate: boolean
    playersList?: PlayerUncheckedCreateNestedManyWithoutRoomInput
  }

  export type GameRoomCreateOrConnectWithoutPlayersInput = {
    where: GameRoomWhereUniqueInput
    create: XOR<GameRoomCreateWithoutPlayersInput, GameRoomUncheckedCreateWithoutPlayersInput>
  }

  export type GameRoomUpsertWithoutPlayersInput = {
    update: XOR<GameRoomUpdateWithoutPlayersInput, GameRoomUncheckedUpdateWithoutPlayersInput>
    create: XOR<GameRoomCreateWithoutPlayersInput, GameRoomUncheckedCreateWithoutPlayersInput>
    where?: GameRoomWhereInput
  }

  export type GameRoomUpdateToOneWithWhereWithoutPlayersInput = {
    where?: GameRoomWhereInput
    data: XOR<GameRoomUpdateWithoutPlayersInput, GameRoomUncheckedUpdateWithoutPlayersInput>
  }

  export type GameRoomUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCode?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hostId?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    playersList?: PlayerUpdateManyWithoutRoomNestedInput
  }

  export type GameRoomUncheckedUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCode?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hostId?: StringFieldUpdateOperationsInput | string
    hostName?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    playersList?: PlayerUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type PlayerCreateManyRoomInput = {
    id: string
    name: string
    isReady: boolean
    joinedAt: Date | string
  }

  export type PlayerUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isReady?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isReady?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isReady?: BoolFieldUpdateOperationsInput | boolean
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}