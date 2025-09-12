
export const perfil_auth = (permisos = []) => {
  if (!Array.isArray(permisos)) {
    permisos = [permisos]
  }
  
  return (req, res, next) => {
    console.log('Usuario autenticado:', req.user) // 
    if (!req.user || !permisos.includes(req.user.role)) {
      return res.status(403).json({ error: 'No autorizado. Permisos insuficientes.' })
    }
    next()
  }
}