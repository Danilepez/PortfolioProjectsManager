# 📁 Portfolio Projects Manager

Un administrador de proyectos moderno y elegante construido con Next.js, Material-UI y MongoDB para organizar, editar y presentar tus proyectos de forma profesional.

## ✨ Características

- 🎨 **Interfaz moderna** con Material-UI y animaciones Framer Motion
- 📱 **Diseño responsivo** optimizado para todos los dispositivos  
- 🔍 **Búsqueda y filtrado** por tecnologías
- 🗄️ **Base de datos MongoDB** para persistencia
- ⚡ **Optimización automática** con Next.js

## 🚀 Demo

Visita la aplicación en vivo: [Portfolio Projects Manager](https://portfolio-projects-manager.vercel.app/)

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI**: Material-UI (MUI) v5, Framer Motion
- **Backend**: Next.js API Routes
- **Base de datos**: MongoDB con Mongoose
- **Despliegue**: Vercel

## 📋 Requisitos previos

- Node.js 18+ 
- npm, yarn, pnpm o bun
- Cuenta de MongoDB Atlas

## ⚙️ Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/Danilepez/PortfolioProjectsManager.git
cd PortfolioProjectsManager
```

2. **Instala las dependencias**
```bash
npm install
# o
yarn install
# o  
pnpm install
# o
bun install
```

3. **Configura las variables de entorno**

Crea un archivo `.env.local` basado en `example.env`:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/portfolio
```

4. **Ejecuta el servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o  
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.tsx       # Navegación principal
│   │   ├── Footer.tsx       # Pie de página
│   │   └── ProjectForm.tsx  # Formulario de proyectos
│   ├── projects/            # Páginas de proyectos
│   │   ├── page.tsx         # Lista de proyectos
│   │   ├── new/page.tsx     # Crear proyecto
│   │   └── [id]/edit/page.tsx # Editar proyecto
│   ├── api/                 # API Routes
│   ├── providers.tsx        # Proveedores de contexto
│   └── page.tsx            # Página principal
├── lib/
│   ├── dbConnect.ts        # Conexión a MongoDB
│   └── api.ts              # Cliente API
├── models/                 # Modelos de Mongoose
├── styles/
│   └── theme.ts           # Configuración del tema MUI
└── types/                 # Definiciones TypeScript
```

## 🎨 Características de la UI

- **Tema personalizado** con colores primarios y secundarios definidos [1](#0-0) 
- **Navegación sticky** con enlaces a Inicio y Proyectos [2](#0-1) 
- **Animaciones suaves** con Framer Motion para transiciones
- **Cards interactivas** con efectos hover y sombras
- **Footer dinámico** con año actual automático [3](#0-2) 

## 🔧 Funcionalidades principales

### Gestión de proyectos
- ✅ Crear nuevos proyectos con formulario validado [4](#0-3) 
- ✅ Listar proyectos con búsqueda y filtros [5](#0-4) 
- ✅ Editar proyectos existentes
- ✅ Eliminar proyectos con confirmación [6](#0-5) 

### Base de datos
- 🔄 Conexión optimizada con cache para MongoDB [7](#0-6) 
- 🛡️ Validación de variables de entorno [8](#0-7) 

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard
3. Despliega automáticamente

### Variables de entorno para producción

```env
MONGODB_URI=tu_mongodb_uri_produccion
```

## 📚 Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción  
npm run start    # Servidor de producción
npm run lint     # Linter ESLint
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request


## 👨‍💻 Autor

**Daniel López** - [@Danilepez](https://github.com/Danilepez)

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) por el framework
- [Material-UI](https://mui.com/) por los componentes
- [Vercel](https://vercel.com/) por el hosting
- [MongoDB](https://www.mongodb.com/) por la base de datos

---

⭐ ¡No olvides dar una estrella si este proyecto te fue útil!
```

## Notes

Este README está basado en la estructura real de tu repositorio Portfolio Projects Manager.  Incluye todas las características principales que identifiqué en el código: la interfaz con Material-UI, la gestión de proyectos, la conexión a MongoDB.  El README actual es muy básico y solo contiene la plantilla por defecto de Next.js, por lo que esta versión proporciona una documentación mucho más completa y profesional. [9](#0-8) 

Wiki pages you might want to explore:
- [User Interface (Danilepez/PortfolioProjectsManager)](/wiki/Danilepez/PortfolioProjectsManager#4)
- [Environment & Deployment (Danilepez/PortfolioProjectsManager)](/wiki/Danilepez/PortfolioProjectsManager#5.3)
