---
trigger: always_on
glob: "**/*.{ts,html,css}"
description: Reglas y guía del Design System de MitoCommerce. Contiene las especificaciones de colores, tipografía, bordes y patrones de diseño.
---

# Design System - MitoCommerce

Este documento centraliza las directrices de diseño visual, tokens, paleta de colores, tipografías y patrones interactivos del proyecto **MitoCommerce**. Cualquier componente nuevo o modificado debe seguir estrictamente estas especificaciones para garantizar la consistencia visual y la estética premium del sitio.

---

## 1. Paleta de Colores (Color Palette)

La paleta está diseñada para transmitir una experiencia limpia, moderna y orgánica (enfoque en e-commerce de productos naturales o frescos).

### 1.1. Color Primario y de Marca
- **Primary Green:** `#64b496`
  - *Uso:* Botones principales, precios actuales, enlaces interactivos, iconos destacados, bordes de elementos activos y badges de éxito.
  - *Clase Tailwind:* `bg-[#64b496]`, `text-[#64b496]`, `border-[#64b496]`.

### 1.2. Color de Acción Alterno
- **Interactive Dark / Hover State:** `#000000` (Negro puro)
  - *Uso:* Estado hover de botones primarios y acciones destacadas.
  - *Clase Tailwind:* `hover:bg-black`, `hover:border-black`.

### 1.3. Colores de Texto (Typography Colors)
- **Primary Text (Headers, Titles):** `#2b2b2d`
  - *Uso:* Encabezados principales, títulos de productos, texto destacado de alta jerarquía.
- **Secondary Text (Body, Description):** `#777777` o `#7a7a7a`
  - *Uso:* Descripciones de productos, subtítulos, textos secundarios de lectura prolongada.
- **Muted Text / Labels:** `#999999` o `#4b5966`
  - *Uso:* Etiquetas secundarias, conteos de comentarios, fechas o categorías.

### 1.4. Fondos y Contenedores
- **Main Background:** `#ffffff` (Blanco puro)
- **Secondary Background (Cards, Inputs):** `#f7f7f8` o `#fafafa`
  - *Uso:* Fondo de botones circulares, secciones de cantidad, paneles deshabilitados.

### 1.5. Estados y Feedback
- **Warning / Star Ratings:** `#f5885f` (Naranja/Coral)
  - *Uso:* Estrellas de valoración de productos.
- **Danger / Badges:** `bg-red-500` (Rojo Tailwind estándar)
  - *Uso:* Contadores numéricos flotantes (ej. cantidad de items en el carrito en el navbar).

### 1.6. Bordes y Separadores
- **Standard Border:** `#e9e9e9`
  - *Uso:* Bordes de tarjetas de productos, inputs, selectores de cantidad, divisores de secciones y menús desplegables.
  - *Clase Tailwind:* `border-[#e9e9e9]`.

---

## 2. Tipografía (Typography System)

El proyecto utiliza dos fuentes principales importadas localmente en `styles.css`.

### 2.1. Poppins
- **Familia:** `'Poppins', sans-serif`
- **Uso:** Títulos de productos, encabezados, precios (tanto `.new-price` como `.old-price`) y contadores numéricos.
- **Pesos Disponibles:** 100 (Thin) a 900 (Black).
- **Estilo:** Moderno, geométrico y con gran legibilidad para elementos cortos o numéricos.
- **Uso en código:** Clase `.font-Poppins` o variable `--font-poppins`.

### 2.2. Manrope
- **Familia:** `'Manrope', sans-serif`
- **Uso:** Texto de botones principales (`.cr-button`), descripciones largas de productos, cuerpo de texto general y elementos de formulario.
- **Pesos Disponibles:** 200 (ExtraLight) a 800 (ExtraBold).
- **Estilo:** Humanista, altamente legible en pantallas y con excelente renderizado para bloques de texto.
- **Uso en código:** Clase `.font-Manrope` o variable `--font-manrope`.

### 2.3. Iconografía
- **Librería:** [Remix Icon](https://remixicon.com/)
- **Uso:** Todos los iconos del sistema (ej. `ri-shopping-bag-line`, `ri-star-fill`, `ri-heart-line`, `ri-user-3-line`).
- **Importación:** `@import 'remixicon/fonts/remixicon.css';` en `styles.css`.

---

## 3. Bordes, Sombras y Formas (Borders, Shadows & Shapes)

### 3.1. Radio de Borde (Border Radius)
- **Standard Rounded (Cards, Inputs, Images):** `rounded-[5px]`
  - *Uso:* Tarjetas de producto, contenedores de imágenes, inputs de formulario, botones estándar y menús desplegables.
- **Circular Rounded:** `rounded-[100%]` (o `rounded-full` en Tailwind v4)
  - *Uso:* Botones flotantes, iconos de favoritos (wishlist) en tarjetas y contadores de carrito.

### 3.2. Estilo de Borde
- Bordes de elementos contenedores siempre definidos como: `border border-solid border-[#e9e9e9]`.

---

## 4. Patrones de Interacción y Animaciones

### 4.1. Transiciones Universales
- Todos los cambios de estado (color, opacidad, visibilidad) deben usar transiciones suaves:
  - `@apply transition-all duration-300 ease-in-out;`

### 4.2. Patrones de Botones
- **Botón Primario (`.cr-button`):**
  - **Fondo:** `#64b496` con texto blanco (`text-white`) y borde `#64b496`.
  - **Hover:** Fondo negro (`hover:bg-black`), borde negro (`hover:border-black`).
  - **Animación:** Transición de color suave (300ms).
- **Botón Flotante / Wishlist (en detalle de producto):**
  - **Fondo:** Blanco, borde `#e9e9e9`, texto/icono `#2b2b2d`.
  - **Hover:** Fondo `#64b496`, texto/icono blanco (`text-white`).

### 4.3. Tarjeta de Producto (`.cr-product-card`)
- Al hacer hover sobre la tarjeta:
  - Mostrar controles laterales (Wishlist, Quick View) mediante animación de opacidad y desplazamiento horizontal:
    - Oculto por defecto: `opacity-0 right-[-40px]`
    - Visible en hover: `opacity-100 right-[12px]` con transición de 400ms (`duration-[0.4s]`).

---

## 5. Diseño y Estructura (Layout & Grid System)

- **Contenedor Principal (`.cr-container`):**
  - Centraliza el ancho del layout responsivo:
    - Pantallas >= 1200px: Max-width 1140px.
    - Pantallas >= 1400px: Max-width 1320px.
    - Pantallas >= 1600px: Max-width 1500px.
    - Márgenes: Automáticos a los lados (`mx-auto`).
- **Sistema de Fila/Columna:**
  - Fila: `.cr-row` -> `@apply flex flex-wrap w-full;`
  - Columna: `.cr-col` -> `@apply w-full px-[12px];`
