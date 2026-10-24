# Acceso a Zzaay desde la red local

## Enlaces y servidor

- Equipo de desarrollo: [http://127.0.0.1:5174/](http://127.0.0.1:5174/).
- Otro equipo de la red: [http://192.168.101.4:5174/](http://192.168.101.4:5174/).
- Servidor iniciado: Vite 8.3.5, escucha IPv4 `0.0.0.0:5174`, puerto estricto. Se deja ejecutándose.

La aplicación es la de esta carpeta, `SUBLIMACION Y DISEÑO ZZAAY`. El servidor se reinició después de comprobar que el proceso anterior correspondía a ese mismo proyecto y puerto. El proyecto vecino no se modifica.

## Único ajuste de configuración

En `package.json`, el script `dev` cambia a:

```text
vite --host 0.0.0.0 --port 5174 --strictPort
```

El arranque habitual sigue siendo `npm run dev`. `vite.config.ts`, la configuración de preview y los valores de HMR, CORS y hosts permitidos conservan sus valores anteriores. Las direcciones IP se admiten por defecto en Vite; no hace falta abrir CORS ni permitir cualquier hostname. [Opciones oficiales del servidor de Vite](https://vite.dev/config/server-options).

No se ejecuta build, instalación ni despliegue para este ajuste. No se configura redirección de puertos, DNS, túnel ni servicio de alojamiento. Los componentes, estilos, textos, navegación, formularios y recursos de la página conservan sus bytes: SHA-256 de **111 archivos de `src/`, `public/` e `index.html` sin cambios**. README y este documento describen el acceso; las comprobaciones quedan en `.qa/lan-access/`, excluida del control de versiones.

## Red detectada

| Dato | Valor observado |
| --- | --- |
| Adaptador físico activo | Ethernet, Realtek PCIe GbE Family Controller |
| IPv4 | `192.168.101.4` |
| Máscara | `255.255.255.0`, prefijo `/24` |
| Subred | `192.168.101.0/24` |
| Puerta de enlace | `192.168.101.1` |
| Asignación | DHCP; la IP puede cambiar al renovar la conexión |
| Perfil de Windows | Público |

El equipo informa Ethernet, aunque la descripción inicial mencionaba Wi-Fi. Se selecciona la interfaz física con ruta de salida y se descarta la dirección del adaptador virtual Tailscale.

## Firewall

Se comprueba que el firewall de Windows continúa habilitado. Las reglas existentes de «Node.js JavaScript Runtime» permiten TCP y UDP entrante para `D:\node js\node.exe` en el perfil público; ese es el ejecutable del servidor verificado. No se crean, desactivan ni modifican reglas, perfiles de red o servicios.

La lectura global de filtros de puertos mediante `Get-NetFirewallPortFilter` devolvió acceso denegado; se consultó la regla existente por `netsh` sin elevar permisos. Las pruebas desde el propio equipo no certifican el paso de una conexión entrante desde otro dispositivo.

## Comprobaciones realizadas

1. `Get-NetTCPConnection` confirma escucha `0.0.0.0:5174`.
2. `Test-NetConnection 192.168.101.4 -Port 5174` confirma conexión TCP desde el equipo de desarrollo.
3. Chromium abre las dos direcciones y obtiene HTTP 200, el mismo título y el hero esperado, sin errores de JavaScript.
4. Las peticiones a cliente Vite, módulo principal, logotipo y MP4 móvil responden HTTP 200 con el tipo de contenido correspondiente por ambas direcciones.
5. Se comprueba WebSocket directo en ambas direcciones y una actualización HMR simultánea, sin recargar ni perder el estado de las páginas de prueba. Para ello se importa un CSS temporal de `.qa/` con una variable sin efecto visual; se cambia únicamente ese archivo y se elimina al terminar. No se toca ningún archivo de contenido de la web.
6. Se comparan los hashes de los 111 archivos protegidos: ninguno cambia.

Comandos principales de inspección y operación:

```powershell
Get-NetIPConfiguration
Get-NetAdapter
Get-NetConnectionProfile
Get-NetRoute -AddressFamily IPv4 -DestinationPrefix '0.0.0.0/0'
Get-NetFirewallProfile
Get-NetFirewallRule -Enabled True -Direction Inbound
netsh advfirewall firewall show rule name="Node.js JavaScript Runtime" verbose
Get-NetTCPConnection -LocalPort 5174 -State Listen
Test-NetConnection -ComputerName 192.168.101.4 -Port 5174
npm run dev
node .qa/lan-access/verify.mjs
node .qa/lan-access/check-preservation.mjs after
```

## Prueba pendiente desde la segunda computadora

En la otra computadora, abrir **http://192.168.101.4:5174/**. Mantener el servidor de desarrollo encendido en la principal para recibir cambios en tiempo real.

Todavía no se conocen la IPv4, máscara y puerta de enlace de la segunda computadora; compartir conexión a internet no confirma que ambos equipos estén en la misma subred. Si no carga, ejecutar `ipconfig` en ella y comunicar esos tres datos del adaptador activo, junto con el error del navegador.

Con esos datos se podrá distinguir otra subred, aislamiento entre clientes, red de invitados o bloqueo de entrada. Si se confirma que el repetidor crea una red separada, habría que revisar su modo punto de acceso/puente o el enrutamiento entre redes según el modelo. No se modifica el módem, repetidor o firewall sin autorización. No se afirma acceso desde la segunda computadora hasta que se pruebe allí.
