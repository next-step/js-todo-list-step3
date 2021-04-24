<p align="middle" >
  <img width="200px;" src="./src/images/check_list.png"/>
</p>
<h2 align="middle">JS 투두리스트 스텝3</h2>
<p align="middle">팀을 위한 투두리스트</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <a href="https://github.com/next-step/js-todo-list-step3/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/next-step/js-todo-list-step3.svg?style=flat-square&label=license&color=08CE5D"/>
  </a>
</p>

## 🔥 Projects!
<br/>

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


<br/>

## 📝 API
### 팀 추가

| method | uri |
|---|---|
|POST|/api/teams|

```javascript
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

| method | uri |
|---|---|
|GET|/api/teams/${teamId}|

```javascript
{
 response: {
   "_id": "string",
   "name": "string",
   "members": [...]
  }
}
```

### 팀 리스트 불러오기

| method | uri |
|---|---|
|GET|/api/teams|
```javascript
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

| method | uri |
|---|---|
|DELETE|/api/teams/${teamId}|

```javascript
{
 response: {}
}
```

### 팀에 멤버 추가

| method | uri |
|---|---|
|POST|/api/teams/${teamId}/members|

```javascript
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

### 팀원별 TodoList 불러오기

| method | uri |
|---|---|
|GET|/api/teams/${teamId}/members/${memberId}|

```javascript
{
 response: [
  {
    "_id": "string",
   "name": "string",
   "todoList": []
  }
 ]
}
```

### 팀원의 TodoItem 추가하기

| method | uri |
|---|---|
|POST|/api/teams/${teamId}/members/${memberId}/items|

```javascript
{
 requestBody: {
   "contents": "string"
 },
 response: [
   {
   "_id": "string",
   "contents": "string",
   "priority": "string",
   "isCompleted": "boolean",
   }
   ...
 ]
}
```

### 팀원의 TodoItem 삭제하기

| method | uri |
|---|---|
|DELETE|/api/teams/${teamId}/members/${memberId}/items/${itemId}|

```javascript
{
 response: {}
}
```

### 팀원의 TodoItem toggle하기

| method | uri |
|---|---|
|PUT|/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle|


```javascript
{
 response: {
   "_id": "string",
   "contents": "string",
   "priority": "string",
   "isCompleted": "boolean",
   }
}
```

### 팀원의 TodoItem contents 수정하기

| method | uri |
|---|---|
|PUT|/api/teams/${teamId}/members/${memberId}/items/${itemId}|

```javascript
{
 requestBody: {
   "contents": "string"
 },
 response:    {
   "_id": "string",
   "contents": "string",
   "priority": "string",
   "isCompleted": "boolean",
   }
}
```

### 팀원의 TodoItem 우선순위 수정하기

| method | uri |
|---|---|
|PUT|/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority|

```javascript
{
 requestBody: {
   "priority": "FIRST"
 },
 response: {
   "_id": "string",
   "contents": "string",
   "priority": "string",
   "isCompleted": "boolean",
 }
}
```

### 팀원의 TodoItem 전부 삭제

| method | uri |
|---|---|
|DELETE|/api/teams/${teamId}/members/${memberId}/items/|


```javascript
{
 response: {}
}
```

## 📝 License

This project is [MIT](https://github.com/next-step/js-todo-list-step3/blob/main/LICENSE) licensed.


