# 🚀 세번째 미션 - Todo List for Team!

이번 미션은 팀을 위한 TodoList를 작성하는 미션입니다. 여러개의 컴포넌트의 상태값을 관리해야하는데요. TodoList가 1개 존재할 때보다 훨씬 더 고려할 것이 많습니다 😀

## 🎯 index.html 팀 페이지 요구사항

- [X] 1. 팀 추가하기
- [X] 2. 팀 리스트 불러와서 화면에 보여주기

## 🎯 kanban.html 팀의 투두리스트 페이지 요구사항

- [X] 1. 팀에 멤버 추가하기
- [X] 2. 팀원별 todoList 불러오기
- [X] 3. 팀원별 todoItem 추가하기
- [X] 4. 팀원별 todoItem 삭제하기
- [X] 5. 팀원별 todoItem complete하기
- [X] 6. 팀원별 todoItem contents 내용 수정하기
- [X] 7. todoItem의 우선 순위 정하기 (defulat값:0, 1순위:1, 2순위: 2)
- [X] 8. todoList의 우측 하단의 `전체 삭제`버튼을 누르면 해당 유저의 아이템을 전체 삭제하기


## 🎯🎯 kanban.html 심화 요구사항
- [X] 1. todoItem의 우선 순위에 따라 정렬하기


<br/><br/>

## 📝 구조
```
├── index.html
├── js
│   ├── index.js
│   ├── Components
│   │   ├── Team
│   │   │   ├── TeamApp.js // 메인 페이지 팀 목록 관리 최상위 컴포넌트
│   │   │   ├── TeamList.js // 팀 목록 관리 컴포넌트
│   │   ├── Todo
│   │   │   ├── TodoApp.js // kanban 페이지의 특정 팀의 팀원들의 TodoList와 타이틀을 관리하는 컴포넌트
│   │   │   ├── TeamTitle.js // 팀 타이틀을 관리하는 컴포넌트
│   │   │   ├── TodoInput.js // Todo를 입력하는 부분을 관리하는 컴포넌트
│   │   │   └── TodoList.js // TodoList 를 관리하는 컴포넌트
│   │   │   └── TodoFooter.js // TodoList의 Footer를 관리하는 컴포넌트
│   ├── utils
│   │   ├── functionalJS.js // 함수형자바스크립트 코드정리 파일
│   │   ├── util.js // 자주사용하는 유틸성 함수를 모아놓은 파일
│   ├── data
│   │   └── constant.js // api주소등 상수값들을 관리하는 파일
│   ├── factory
│   │   ├── todo
│   │   │   └── TodoListFactory // TodoList를 생성해주는 Factory
│   │   ├── AbstTodoListFactory.js // TodoList를 생성해주는 Factory 추상 클래스
│   ├── observer
│   │   ├── Observer.js // Subject역할로부터 상태변화를 notify받는 역할
│   │   ├── Pipe.js // 컴포넌트간에 이벤트 pub/sub을 위한 파이프라인 파일
│   │   ├── Subject.js // // 관찰되는 대상을 나타내며 Observer 역할을 등록및 삭제하는 역할
│   ├── apiclient
│   │   ├── HttpClient.js //rest api를 호출하는 기본적인 client파일
│   │   ├── HttpClientAdapter.js // HttpClient 파일에 추가기능을 
│   │   ├── TeamHttpClient.js // todolist App에서 실제로 사용되는 path들 통해 데이터를 송수신하는 파일
│   ├── service
│   │   ├── TeamService.js // todoListApp의 팀원들의 상태관리 서비스로직 모음 파일
│   
└── css
```

## 📝 시도한 부분
2주차 미션에서 모든 페이지를 상시 렌더링하는 부분에서 특정 부분만 수정되면 될 것 같을때 해당 부분만 부분 렌더링하고 
상태변경에 따른 전파범위를 한정짓고 싶어서 Pipe 클래스를 만들어서 특정이벤트에 대해서는 특정 컴포넌트의 특정 부분에서만 받아서 전체가아닌 범위적용이 되도록 시도해봤습니다.


## 📝 개선 사항
- 2주차 코드와 혼용된부분이 많아 리팩토링요소 및 불필요한 코드들이 많고 추상화 및 모듈화가 부족합니다.
- 함수형 메소드들 적용
