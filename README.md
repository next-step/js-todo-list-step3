# 🚀 세번째 미션 - Todo List for Team!

이번 미션은 팀을 위한 TodoList를 작성하는 미션입니다. 여러개의 컴포넌트의 상태값을 관리해야하는데요. TodoList가 1개 존재할 때보다 훨씬 더 고려할 것이 많습니다 😀

## 🎯 index.html 팀 페이지 요구사항

- [ ] 1. 팀 추가하기
- [ ] 2. 팀 리스트 불러와서 화면에 보여주기

## 🎯 kanban.html 팀의 투두리스트 페이지 요구사항

- [ ] 1. 팀에 멤버 추가하기
- [ ] 2. 팀원별 todoList 불러오기
- [ ] 3. 팀원별 todoItem 추가하기
- [ ] 4. 팀원별 todoItem 삭제하기
- [ ] 5. 팀원별 todoItem complete하기
- [ ] 6. 팀원별 todoItem contents 내용 수정하기
- [ ] 7. todoItem의 우선 순위 정하기 (defulat값:0, 1순위:1, 2순위: 2)
- [ ] 8. todoList의 우측 하단의 `전체 삭제`버튼을 누르면 해당 유저의 아이템을 전체 삭제하기


## 🎯🎯 kanban.html 심화 요구사항
- [ ] 1. todoItem의 우선 순위에 따라 정렬하기


## 📝 API
### 팀 추가

| api | method | uri |
|---|---|---|
|팀 추가|POST|/api/teams|

```json
{
 requestBody: {
   "name": "string"
 },
 response: {
   "_id": "string",
   "name": "string",
   "members": [...]
  }
}
```

### 팀 불러오기

| api | method | uri |
|---|---|---|
|팀 불러오기|GET|/api/teams/${itemId}|

```json
{
 response: {
   "_id": "string",
   "name": "string",
   "members": [...]
  }
}
```

### 팀 리스트 불러오기

| api | method | uri |
|---|---|---|
|팀 불러오기|GET|/api/teams|
```json
{
 response: [
  {
   "_id": "string",
   "name": "string",
   "members": [...]
  }
  ...
 ]
}
```

### 팀 삭제

| api | method | uri |
|---|---|---|
|팀 불러오기|DELETE|/api/teams/${teamId}|

```json
{
 response: {}
}
```

