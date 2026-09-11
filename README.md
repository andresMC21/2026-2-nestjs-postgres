# Computación en Internet 3 — NestJS + PostgreSQL

Proyecto base para las prácticas del curso **Computación en Internet 3**. Es una API REST construida con [NestJS](https://nestjs.com/) que se conecta a una base de datos **PostgreSQL** usando **TypeORM**.

Este repositorio sirve como punto de partida: trae la configuración inicial (conexión a la base de datos, validaciones globales, prefijo de rutas) y un módulo de ejemplo (`student`) que irán completando en clase.

## Stack y dependencias

### Dependencias de producción

| Paquete | Versión | Para qué sirve |
|---|---|---|
| `@nestjs/common` | ^11.0.1 | Decoradores y utilidades base de Nest (`@Module`, `@Controller`, `@Injectable`, pipes, etc.) |
| `@nestjs/core` | ^11.0.1 | Núcleo del framework: arranque de la aplicación, inyección de dependencias |
| `@nestjs/platform-express` | ^11.0.1 | Adaptador HTTP: hace que Nest corra sobre Express por debajo |
| `@nestjs/config` | ^12.0.0 | Carga variables de entorno desde `.env` (`ConfigModule`) |
| `@nestjs/typeorm` | ^12.0.1 | Integra TypeORM como ORM dentro de Nest (`TypeOrmModule`) |
| `typeorm` | ^1.1.1 | ORM: mapea clases TypeScript (entidades) a tablas de la base de datos |
| `pg` | ^8.23.0 | Driver de PostgreSQL que usa TypeORM para conectarse |
| `class-validator` | ^0.15.1 | Valida los DTOs (`@IsString()`, `@IsInt()`, etc.) |
| `class-transformer` | ^0.5.1 | Transforma objetos planos (JSON de las peticiones) en instancias de clases (DTOs) |
| `@nestjs/mapped-types` | * | Utilidades para derivar DTOs (`PartialType`, `PickType`) sin repetir código, típico en `update-*.dto.ts` |
| `reflect-metadata` | ^0.2.2 | Requerido por los decoradores de TypeScript (metadata en tiempo de ejecución) |
| `rxjs` | ^7.8.1 | Programación reactiva; Nest la usa internamente (interceptores, streams) |

### Dependencias de desarrollo

| Paquete | Para qué sirve |
|---|---|
| `@nestjs/cli` | Comandos `nest ...` (build, generate, start) |
| `@nestjs/schematics` | Generadores de código (`nest g module/controller/service`) |
| `@nestjs/testing` | Utilidades para escribir tests de Nest |
| `jest`, `ts-jest`, `@types/jest` | Framework y soporte de TypeScript para pruebas unitarias |
| `supertest`, `@types/supertest` | Pruebas de integración/e2e sobre HTTP |
| `typescript`, `ts-node`, `tsconfig-paths` | Compilación y ejecución de TypeScript |
| `eslint`, `typescript-eslint`, `eslint-config-prettier`, `eslint-plugin-prettier`, `@eslint/js`, `@eslint/eslintrc`, `globals` | Linting del código |
| `prettier` | Formateo automático del código |
| `ts-loader` | Loader de TypeScript (usado por el build de Nest) |
| `source-map-support` | Mapea errores en tiempo de ejecución de vuelta al código TypeScript original |
| `@types/express`, `@types/node` | Tipos de TypeScript para Express y Node |

## Estructura del proyecto

```
src/
├── main.ts                     # Punto de entrada: arranca la app, prefijo global, validaciones
├── app.module.ts                # Módulo raíz: config, conexión a la BD, módulos de features
└── student/
    ├── student.module.ts        # Módulo de la feature "student"
    ├── student.controller.ts    # Rutas HTTP de "student" (por implementar)
    └── student.service.ts       # Lógica de negocio de "student" (por implementar)
test/
└── app.e2e-spec.ts              # Prueba end-to-end de ejemplo
```

Cada nueva funcionalidad del curso debería seguir este mismo patrón: una carpeta por *feature*, con su `module`, `controller`, `service` y, cuando aplique, `dto/` y `entities/`.

## Requisitos previos

- **Node.js** 18 o superior
- **npm**
- **PostgreSQL** corriendo localmente (o accesible por red), con una base de datos ya creada

## Puesta en marcha

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Crear un archivo `.env` en la raíz del proyecto con las credenciales de tu base de datos:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=compunet3
   DB_USERNAME=postgres
   DB_PASSWORD=tu_password
   ```

   > El `.env` está en `.gitignore`: cada quien usa el suyo y **no se sube al repositorio**.

3. Levantar la aplicación en modo desarrollo (con recarga automática):

   ```bash
   npm run start:dev
   ```

4. La API queda disponible en `http://localhost:9000/student` (ver [Puntos clave](#puntos-clave) sobre el prefijo global).

## Scripts disponibles

| Comando | Qué hace |
|---|---|
| `npm run start` | Levanta la app una vez (sin watch) |
| `npm run start:dev` | Levanta la app en modo watch (recarga en cada cambio) |
| `npm run start:debug` | Igual que `start:dev`, con el debugger de Node habilitado |
| `npm run start:prod` | Ejecuta el build ya compilado (`dist/main.js`) |
| `npm run build` | Compila TypeScript a `dist/` |
| `npm run lint` | Corre ESLint y corrige automáticamente lo que pueda |
| `npm run format` | Formatea el código con Prettier |
| `npm run test` | Corre las pruebas unitarias con Jest |
| `npm run test:watch` | Pruebas unitarias en modo watch |
| `npm run test:cov` | Pruebas unitarias con reporte de cobertura |
| `npm run test:e2e` | Corre las pruebas end-to-end |

## Comandos del CLI de Nest

El [Nest CLI](https://docs.nestjs.com/cli/overview) (`nest`, instalado como dependencia de desarrollo) sirve para generar código y gestionar el proyecto sin escribir todo el boilerplate a mano. Se ejecuta con `npx nest <comando>` (o directamente `nest <comando>` si lo tienen instalado global con `npm i -g @nestjs/cli`).

| Comando | Alias | Qué hace |
|---|---|---|
| `nest new <nombre>` | `nest n` | Crea un proyecto Nest nuevo desde cero |
| `nest generate module <nombre>` | `nest g mo` | Genera un módulo (`*.module.ts`) y lo registra en el módulo padre |
| `nest generate controller <nombre>` | `nest g co` | Genera un controlador (`*.controller.ts`) con su spec de test |
| `nest generate service <nombre>` | `nest g s` | Genera un servicio (`*.service.ts`) con su spec de test |
| `nest generate resource <nombre>` | `nest g res` | Genera un CRUD completo: módulo, controlador, servicio, DTOs y entidad (pregunta el transport layer, ej. REST API) |
| `nest generate class <nombre>` | `nest g cl` | Genera una clase simple (útil para DTOs o entidades) |
| `nest generate interface <nombre>` | `nest g interface` | Genera una interfaz de TypeScript |
| `nest generate pipe <nombre>` | `nest g pi` | Genera un pipe (para validación/transformación de datos) |
| `nest generate guard <nombre>` | `nest g gu` | Genera un guard (para autenticación/autorización de rutas) |
| `nest generate interceptor <nombre>` | `nest g in` | Genera un interceptor |
| `nest generate filter <nombre>` | `nest g f` | Genera un filtro de excepciones |
| `nest build` | | Compila el proyecto a `dist/` (equivalente a `npm run build`) |
| `nest start` | | Levanta la aplicación (equivalente a `npm run start`) |
| `nest start --watch` | | Levanta la aplicación en modo watch (equivalente a `npm run start:dev`) |
| `nest info` | `nest i` | Muestra las versiones de Node, npm y de los paquetes `@nestjs/*` instalados |

> Tip: se puede indicar la carpeta destino del recurso generado, por ejemplo `nest g mo course` crea `src/course/course.module.ts`. Así es como se generó la estructura de `src/student/`.

## Puntos clave

Estos son los conceptos importantes que se están usando en este proyecto y que van a reutilizar durante el curso:

- **Módulos (`@Module`)**: Nest organiza la app en módulos. `AppModule` es el módulo raíz y va importando los módulos de cada feature (como `StudentModule`). Cada feature nueva del curso debe crear su propio módulo y registrarse en `imports` de `AppModule`.

- **Inyección de dependencias**: las clases marcadas con `@Injectable()` (como `StudentService`) se inyectan por constructor donde se necesiten (por ejemplo, en `StudentController`). Nest se encarga de crear e inyectar esas instancias, no hay que hacerlo a mano.

- **Conexión a PostgreSQL con TypeORM** (`src/app.module.ts`): `TypeOrmModule.forRoot()` configura la conexión leyendo las variables de entorno cargadas por `ConfigModule`. `autoLoadEntities: true` hace que TypeORM detecte automáticamente las entidades registradas en cada módulo, sin tener que listarlas todas a mano.

- **`synchronize: true`**: hace que TypeORM cree/actualice las tablas automáticamente a partir de las entidades, sin necesidad de escribir migraciones. Es muy cómodo para aprender y prototipar, **pero nunca debe usarse en producción** (puede borrar o alterar datos reales). El propio código lo marca con un comentario recordándolo.

- **`ValidationPipe` global** (`src/main.ts`): valida automáticamente el `body` de las peticiones contra los DTOs usando `class-validator`.
  - `whitelist: true`: elimina del `body` cualquier propiedad que no esté declarada en el DTO.
  - `forbidNonWhitelisted: true`: si llega una propiedad no declarada, la petición falla con un error 400 en lugar de ignorarla silenciosamente.

- **Prefijo global de rutas** (`app.setGlobalPrefix('student')` en `main.ts`): todas las rutas de la aplicación quedan bajo `/student`. Esto es temporal/particular de este arranque del proyecto — cuando agreguen más módulos (por ejemplo `course`, `enrollment`), probablemente deban quitar este prefijo global y manejar el prefijo por controlador con `@Controller('student')`, `@Controller('course')`, etc.

- **DTOs + `class-validator`/`class-transformer`**: los DTOs (`create-*.dto.ts`, `update-*.dto.ts`) son las clases que definen la forma y las reglas de validación de los datos que entran por la API. `@nestjs/mapped-types` (`PartialType`) permite crear el DTO de actualización reutilizando el de creación, sin duplicar campos.

- **Módulo `student` aún vacío**: `StudentController` y `StudentService` están creados pero sin lógica ni rutas. Es el punto de partida para implementar el CRUD durante las clases (entidad, DTOs, endpoints).

## ⚠️ Cosas a revisar (para practicar debugging)

- En `src/app.module.ts`, la línea `port: +!process.env.DB_PORT` no calcula el puerto correctamente: el operador `!` niega el valor *antes* de convertirlo a número, por lo que el puerto configurado en `DB_PORT` nunca se usa como tal. Es un buen ejercicio identificar por qué y corregirlo (pista: comparar con cómo se leen las demás variables de entorno en el mismo bloque).

## Pruebas

```bash
# pruebas unitarias
npm run test

# pruebas end-to-end
npm run test:e2e

# cobertura
npm run test:cov
```

## Recursos del framework

- [Documentación de NestJS](https://docs.nestjs.com)
- [Documentación de TypeORM](https://typeorm.io)
- [class-validator](https://github.com/typestack/class-validator)
