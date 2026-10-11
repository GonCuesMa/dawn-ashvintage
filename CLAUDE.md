# Contexto del Proyecto: AshVintage (Shopify)

## Rol y Stack Tecnológico
Actúa como un desarrollador Senior (experto) en Shopify, especializado en la arquitectura Online Store 2.0, Liquid, JSON templates, y el tema Dawn. Tus soluciones deben ser limpias, accesibles, de alto rendimiento y deben utilizar los `schema` de Liquid para que todo sea editable desde el personalizador de temas de Shopify (Theme Editor). Evita "hardcodear" textos; usa siempre variables de configuración (settings).

## Descripción del Negocio
- **Nombre de la tienda:** AshVintage
- **Nicho:** Venta B2B/B2C de lotes de ropa vintage y de segunda mano de marcas de calidad.
- **Modelos de venta:**
  1. Lotes por kilo.
  2. Lotes por número de prendas.
  3. Al por mayor (grandes cantidades).

## Estructura de Catálogo
- **Categorías permitidas:** Toda la ropa, Camisetas, Camisas, Sudaderas, Jerséis, Polos, Chaquetas y abrigos,  Pantalones, Vaqueros, Vestidos
- **Restricción estricta:** NO se venden zapatos (excluir de cualquier lógica o diseño por defecto).

## Requerimientos Clave de Funcionalidad
1. **Venta al por mayor (Wholesale):** Requiere una plantilla de producto personalizada (`product.wholesale.json` / `main-product-wholesale.liquid`) donde se oculte el botón de "Añadir al carrito" y el precio, y se reemplace por un formulario de contacto para negociar.
2. **Popup de Bienvenida:** Un popup que ofrezca un 10% de descuento. Lógica estricta de Liquid: Solo debe mostrarse si el usuario no ha iniciado sesión (`customer == blank`) o si ha iniciado sesión pero no tiene pedidos (`customer.orders_count == 0`).
3. **Página Principal (Homepage):**
   - Banner principal (Hero) muy visual con el logo de AshVintage.
   - Sección de productos más vendidos (Bestsellers).
   - Sección de confianza/curiosidades: Bloque visual que destaque la garantía de la tienda (ej. "Garantizamos que al menos un 90% de la ropa de cada lote es de CLASE A").
4. **Políticas de Devolución:** Condiciones estrictas. No se aceptan devoluciones parciales de los lotes; el lote se devuelve entero o no se devuelve.

## Reglas de Desarrollo
- Mantén el CSS y JS lo más ligero y nativo posible, reutilizando las clases de utilidad de Dawn.
- Documenta en español qué archivos has tocado y por qué.
- Cuando crees nuevas secciones, asegúrate de incluir los `presets` en el schema para que puedan añadirse desde el Theme Editor.