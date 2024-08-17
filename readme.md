# Speed Code Game

```
enter name (waiting room)
game host start

---loop---
loading screen
show q (loading bar)
show q & ide (timer)
show answer and score
show rank
---loop back---

show rank 
```

```
setup local db
cd backend

create .env
DATABASE_URL="postgresql://root:root@localhost:5432/speedcodegame?schema=public"

docker compose up -d
npm i
npx prisma migrate dev
```