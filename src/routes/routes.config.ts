
/*------------------------------  Config ------------------------------------------*/
export interface INavMenuOptions {
  label: string;
  key: string;
  path: string;
  permission: string[];
  children?: INavMenuOptions[]
}

export const routerPaths = {
    home: { path: "/", label: "Inicio de sesión" },
    register: { path: "/registrarse", label: "Registro de usuario" },
    admin: {
        path: "/dashboard", label: "Inicio", children: {
            details: { path: "detalles", label: "Detalles" },
            products: { path: "productos", label: "Productos" },
            users: { path: 'users', label: 'Usuarios', children: [
                { path: 'new-user', label: 'Crear usuario'}
            ] }
        },
        
    },
    
}

export const adminRoutes = routerPaths.admin.children

/*------------------------------  Functions ------------------------------------------*/
/**
 * Function that recursively return INavMenuOptions[]
 * options for aside navBar
 * @param children 
 * @returns 
 */
export const getMenuOptions = (children = adminRoutes) => {
    const adminRouteEntries = Object.entries(children)

    const menuOptions: INavMenuOptions[] = adminRouteEntries.map((routeEntry) => {
        const [Key, Value] = routeEntry as any
        let children;

        if(Value.children) {
            children = getMenuOptions(Value.children)
        }

        return ({
            key: Key,
            label: Value.label,
            path: Value.path,
            permission: Value.permission,
            children: children
        })

    })
    
    return menuOptions
}