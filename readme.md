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
cd frontend 

create .env
DATABASE_URL="postgresql://root:root@localhost:5432/speedcodegame?schema=public"

npm i
npx prisma migrate dev

create new questions by entering /create-question
```