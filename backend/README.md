
**Muslces backend**  
*Fejlesztői dokkumentáció*

## Fejlesztői környezet
A backend futtatásához a következők kellenek  
Windows rendszeren:

- [Postgres 15.1 vagy újabb](https://www.postgresql.org/download/)
- [Node js 18.16.0](https://nodejs.org/en/download)
- Nest js `npm install -g @nestjs/cli`
- Prisma client `npm install @prisma/client`
- Node env `npm install -g win-node-env`

Linux:
- [Postgres 15.1 vagy újabb](https://www.postgresql.org/download/)
- [Node js 18.16.0](https://nodejs.org/en/download)
- Nest js `npm install -g @nestjs/cli`
- Prisma client `npm install @prisma/client`

## Futtatás
Az adatbázis beállításához létre kell hozni egy egy új schemat **musclesdb** néven. A **.dev.env** fáljban lehet átírni az adatbázishoz szükséges felhasználó nevet és jelszót ami alapértelmezetten postgres, *Ezen alkalmazás adatbázis jelszava: pwd felhasználó neve: postgres*

Az egyszerűbb megoldás érdekében érdemes [dockert](https://www.docker.com/products/docker-desktop/) telepíteni és lefuttatni a következő parancsot:
```bash  
docker run --name postgresdb -p 5432:5432 -e POSTGRES_PASSWORD=pwd -d postgres
```  

Az adatbázis beállítása után a backend mappában az adatbázis schema integrálásához az `npm run push:dev` parancsot lehet használni, ezután alap adatok feltöltése érdekében az `npm run seed:dev` parancsokat kell lefuttatni.  
Ezek után már futtatható is az alkalmazás az `npm run start:dev` paranccsal.

A production mode google cloud VM instances modera van elkészítve. Githubon ssh kulcsot kell beállítani és minden egyes push után ami a main brachre történt az alkalmazás autómatikusan lebuildel és elérhetővé válik bárki számára a backend összes route-ja.

## Feljlesztéshez szükséges adatok
Az alkalmazás elindítása után megtekinthetőek a route-ok a [http://localhost:3000/api](http://localhost:3000/api) útvonalon.  
Vagy a jelenlegi [Linked](http://34.22.242.178:3000/api)

A teljesen működő alkalmazás megtekinthető a [http://34.22.242.178:3000/](http://34.22.242.178:3000/)

## Frontend backend összekapcsolás
A frontend buildelése után az dist mappában található fáljokat és mappákat a client mappába kell másolni és ezáltal egybe lehet futtatni a backendet és frontendet is.

## File struktúra

Néhány hasznos mappa a fejlesztés során.

```markdown
├── src
│   ├── MVC
├── cleint
│   ├── React build
├── prisma
│   ├── Adatbázis model
│   ├── Seed file
│   ├── Alap étel adatok CSV formátumban
├── images
│   ├── default
│   │   ├── Két alap profilkép 
│   ├── Profileképek
└── .gitignore
```

## Hasznos dokkumentációk
[Nestjs](https://docs.nestjs.com/)  
[Prisma](https://www.prisma.io/)  
[Docker](https://docs.docker.com/)
