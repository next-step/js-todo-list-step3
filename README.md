# 🚀 세번째 미션 - Todo List for Team!

이번 미션은 팀을 위한 TodoList를 작성하는 미션입니다. 여러개의 컴포넌트의 상태값을 관리해야하는데요. TodoList가 1개 존재할 때보다 훨씬 더 고려할 것이 많습니다 😀

## 기록하기

### 2020 10 12 Layout component 만들기
- jsx 처럼 -> X
- createElement 모듈 생성
- dom 을 만들때 fragment 를 적극적으로 사용해보기

### 2020 10 21 
- 주어진 환경에 충실하자
- InnerHTML, outerHTML 에 대한 이해가 더 필요함을 알게 되었다.
- 라우팅을 할 때, 서버가 존재하고 존재하지 않고의 차이점을 느끼게 되었다.
    - 서버가 없는 이 환경의 경우
    - html 파일을 모두 만들어주거나
    - 해시로 라우팅을 해야한다.
    
### 2020 10 22
- container 와 template 의 분리의 필요성
- Component Child 만들기

### 2020 10 24
팀을 새로 추가하고, 팀 목록을 전체 로드 할까? 아니면 만들어진 팀을 state 에 추가를 할까? 
후자를 선택하였다. 그 이유는, 사용자 입장에서 다른 멤버의 todo 의 내용을 수정하다가 갑자기 사용자를 추가했을 경우, 수정하던 내용이 사라지기 때문이다.
최신이 아닌 멤버의 정보를 수정하려는 행위를 하는 경우, 서버에서 에러번호를 줄 것이기 때문에 프론트에서 그에 따른 뒷처리를 하는것이 더 적절하다는 생각이 들었다.

팀 추가 api 호출 -> 새로 추가된 팀에 대한 정보를 서버에서 리턴받는다.... -> state 에 추가

하지만 유저 관점이 내가 생각하는 것이 맞는지도 모르겠고, 설계 관점에서도 무엇이 더 선호 되는지 잘 모르겠다.
그냥 통째로 해버리는게 편하고 더 안정적이긴한데...

- 이벤트 위임에 대한 고민
kanban 에는 todoInput 이 매우 많다.
로직상의 문제만 없다면 최상위의 dom 에다가 모든 이벤트를 때려박아도 성능에 상관없다고  한다..?

- 더 고민을 확장하기 보다는 주어진 서버의 값에서 해낼 수 있는 action 을 하는 방향으로 구현을 해 보아야 겠다는 생각이 들더라고요! 서버의 리턴값으로 다음에는 무슨일을 할 수 있을까 생각을 해보면 저만의 답이 나올것같습니다

- 이거써보자 저거써보자 가 아니라, 이거 저거를 알아둔 다음, 개발을 하면서,, 어 필요할 것 같다? 라고 느낄 때 도입하는 것이 좋을 것 같다!! 오늘 깨달음 state 업데이트하면서.. 리덕스를 쓰게될 날이 올것같은 느낌? 앞으로의 다른 개발을 할때도 이것을 생각하면서 무리하게 무엇을 하려고 하는 것은 피해야 겠다.

- 한참을 고민을했다.. 결론은 obseverable 으로 등록하는 함수에는 props 를 넘기면 안된다는것...!!!!!!!!!!!!!!!!
    - observer 를 고려하면서 컴포넌트를 만들어야 하는 에러사항이 있다..  . !!!!!!!!!
    - template -> observer 가능, container 불가능? /.. 흠 반대가 맞나??... 흠

- 주요 생각을 정리를 해보고 있는데, 아... 이런거를 블랙커피스터디 회고에서 말을 하면 좋은것이구나!! 
나중에 블로그에 과정을 정리해볼려고 하는데.. 상세하게 어떻게 코드를 바꿨는지 기억할 자신은없다.. 느낌만 기억하자 ㅠ

### 2020 10 25
- 이벤트 핸들러를 분리했다 안했다 작업을 여러번 했었다.
    - 1과 2 모두 결국에는 분리한 상태로 미션을 마무리 했었다.
    - 3의 시작은 각 컴포넌트에 이벤트 핸들러를 가지고 있었다. 음 근데 생각을 해보면 이벤트를 어떤 돔에다가 또 옮겨서 실험을 해볼 경우도 있을 것 같다. 그래서 핸들러를 분리하는 것이 더 편리하지 않을까 생각이 든다.
    - 1차 적으로 컴포넌트에서 핸들러를 모두 떼어내고, 핸들러의 호출 규칙과, 핸들러를 분리하는 함수를 만들어야 겠다.
    - 핸들러로 나눈다기에 비대해진 condition... 어쩌면 다른 이름이 어울릴것 같다.
    ```javascript
      dom.addEventListener('keypress', (event) => {
        const { key, target: { value, dataset } } = event;
        const condition = !(
          value?.length
          && dataset?.component === 'todoInput'
          && key === 'Enter'
        );
    
        eventHandler(
          condition,
          () => addTodoItemHandler(teamId, event),
        );
      });
    ```
    - condition 을 굳이 분리를 할 필요가 없다는 피드백
  
### 2020 10 27
- dom 을 obj 로 저장해보면 뭔가 달라지지 않을까? 

### 2020 10 29
- edit 을 하는 todo 의 id 를 저장해두는 배열을 만들지 않고, 단순히 스타일의 toggle 만으로 디스플레이 전환 (edit , view 모드 ) 를 해 보았다. 이 경우
todo 가 업데이트 되었을 때, (todoitem 별 render 가 아닌, 렌더 옵저버의 최상위 userTodo 에서 아래로 props 로 내려주는형식) 
최상위의 컴포넌트가 바뀌었을 떄 하위 컴포넌트의 dom 이 모두 재렌더링 된다. 이부분에 대해서는 여러가지로 더 생각해보고 나중에 해결해 보아야 겠다.

- team dispatch 와 핸들러부분의 중복 코드를 간소화하면 더 좋을 것같다.
- 2 미션에서 todo 를 변경하는 작업들 (우선순위, 컨텐츠, 완료토글) 은 엄청 힘들었던 것 같은데, 3에서 설계작업을 다해두니깐 엄청 간단하게 뚝딱 잘 완성되는 기분이다.
- 렌더링을 더 체계적으로 할 수 있는 설계가 필요할 것 같다.
- todo input 후 focus 가 풀리는 버그 해결 필요
- dom 을 obj 으로 관리하면 이벤트 핸들러 설계에도 도움이 될 것 같다. 
- 프로젝트를 계속하면서 느낀점, 지식의 한계점... 이제 여러 프레임워크를 사용해서 개발을 할 때가 됐구나, 너무 그냥저냥 공부만 한것 같다. 이제 사용을 하면서 공부를 해야 될 것 같다.
- dom obj 에 많은 정보들을 넣으면..? 당장의 코딩은 편리해 질 것 같은데 안정성의 문제는 없나? 나중에 또 불편해질 일이 생길까? 
- 뭔가 하면할수록 리덕스가 필요한 느낌 불변성 관리가 필요해짐
- closest 가 잘 안잡히고 있다 ㅡ.ㅡ;;;


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

## step3 에서 공부해 보고 싶은것 
1. 상태관리에 subscribe 를 직접하지 않아도, 상태를 사용함으로써 최초 한번 subscribe 를 할 수 있는 행위
2. 컴포넌트 내 state 와, 전역 state 를 관리하는 방법에 대한 공부. 
3. 효율적인 렌더링을 위한 props diff 계산법이나 알고리즘
4. 가상 DOM 라이브러리 snabbdom 등을 조합
4. Flux 아키텍처 안티 패턴 
  - Q: 하위 component 마다 props 로 내려받은 item id 로 store 에서 필요한 값 탐색
  - 컴포넌트 재활용이 힘들다. 
  - 다수의 하위 컴포넌트들이 계산을 하면서 컴포넌트의 개수에 따라 연산이 중복되기에 탐색시간이 N배 증가하게 됩니다.
  - Q: 데이터를 obj 으로 만들면 탐색시간이 덜 걸릴 것 같음
     - 탐색 시간은 데이터 타입보다는 데이터를 어디에서 어떻게 다룰까가 초점입니다!
     
5. 데이터를 부모에서 순수한 props를 하위 컴포넌트 내려주기
    - 계산된 데이터를 다른 하위 컴포넌트에서 재활용할 할 수 있다.
6. 최적화 부분은 탐색시간이나 계산 값을 캐싱한다거나 메모제이션하는 기법을 주로 활용합니다.
7. api 부분을 역할을 더 잘 나누고 통일성 만들어보기. 이름도 잘 지어보기
8. step2 에서 최종적으로 todo 하나의 우선순위를 수정하거나 삭제하는 등 동작을 했을 때, 모든 todoList 를 재렌더링 하는 방법으로 하였지만.
매우 느려졌다. 문제점을 찾아서 해결해야 한다.
9. dom object 를 쓰면서 성능에 대해 신경쓰고 mdn 도 잘 읽어보기

https://meetup.toast.com/posts/158
https://www.youtube.com/watch?time_continue=7&v=o4meZ7MRd5o&feature=emb_title

7. 스텝 2는 id 별로 비공용 todoList 를 쓴다고 가정하고 매번 todoList 를 업데이트 하지 않는것으로 바꾸기

<br/><br/>

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
|GET|/api/teams/${itemId}|

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

<br/><br/>

# ☕️ 코드리뷰 모임 - Black Coffee
<br>

> '훌륭한 의사소통은 블랙커피처럼 자극적이며, 후에 잠들기가 어렵다'. <br> A.M. 린드버그(미국의 작가, 수필가) -

<br>

블랙커피처럼 서로를 자극해주고, 동기부여 해주며, 그 성장과정으로 인해 의미있는 가치를 만들어내고자 하는   
**프론트엔드 코드리뷰 모임** ☕️ **Black Coffee**입니다.

<br>

## ⚙️ Before Started

#### <img alt="Tip" src="https://img.shields.io/static/v1.svg?label=&message=Tip&style=flat-square&color=673ab8"> 로컬에서 서버 띄워서 손쉽게 static resources 변경 및 확인하는 방법

로컬에서 웹서버를 띄워 html, css, js 등을 실시간으로 손쉽게 테스트해 볼 수 있습니다. 이를 위해서는 우선 npm이 설치되어 있어야 합니다. 구글에 `npm install` 이란 키워드로 각자의 운영체제에 맞게끔 npm을 설치해주세요. 이후 아래의 명령어를 통해 실시간으로 웹페이지를 테스트해볼 수 있습니다.

```
npm install -g live-server
```

실행은 아래의 커맨드로 할 수 있습니다.

```
live-server 폴더명
```

<br>

## 👨‍💻 Code Review 👩‍💻
아래 링크들에 있는 리뷰 가이드를 보고, 좋은 코드 리뷰 문화를 만들어 나가려고 합니다.  
- [코드리뷰 가이드1](https://edykim.com/ko/post/code-review-guide/)
- [코드리뷰 가이드2](https://wiki.lucashan.space/code-review/01.intro.html#_1-code%EB%A5%BC-%EB%A6%AC%EB%B7%B0%ED%95%98%EB%8A%94-%EC%82%AC%EB%9E%8C%EB%93%A4%EC%9D%80-%EC%96%B4%EB%96%A4%EA%B2%83%EC%9D%84-%EC%A4%91%EC%A0%90%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%82%B4%ED%8E%B4%EC%95%BC%ED%95%98%EB%8A%94%EA%B0%80)

<br>

## 👏 Contributing
만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요. 

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/next-step/js-todo-list-step3/issues) 에 등록 후 @eastjun에게 dm을 보내주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/next-step/js-todo-list-step3/blob/master/LICENSE) licensed.



