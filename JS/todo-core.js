// [/todo-core.js] 메인 페이지와 투두 페이지의 데이터를 하나로 묶어주는 연동 엔진

// 1. 로컬 스토리지에서 기존 투두 데이터 가져오기 (없으면 기본 샘플 생성)
function getTodoData() {
    const savedData = localStorage.getItem('houseLinkTodos');
    if (savedData) {
        return JSON.parse(savedData);
    }
    
    // 최초 실행 시 보여줄 기본 세련된 샘플 데이터
    const defaultData = [
        { id: 1, text: "자동차 에어컨 필터 셀프 교체하기", type: "me", checked: false },
        { id: 2, text: "7월 정기 지출 통장 잔액 확인", type: "me", checked: true },
        { id: 3, text: "주말 마트에서 삼겹살이랑 여름 수박 장보기", type: "family", checked: false },
        { id: 4, text: "베란다 하수구 거름망 분리 세척 청소", type: "family", checked: false }
    ];
    saveTodoData(defaultData);
    return defaultData;
}

// 2. 로컬 스토리지에 투두 데이터 저장하기
function saveTodoData(data) {
    localStorage.setItem('houseLinkTodos', JSON.stringify(data));
}

// 3. 새로운 할 일 추가 기능
function addTodoItem(text, type) {
    const todos = getTodoData();
    const newTodo = {
        id: Date.now(), // 고유 ID 생성
        text: text,
        type: type,
        checked: false
    };
    todos.unshift(newTodo); // 맨 앞에 추가
    saveTodoData(todos);
    return newTodo;
}

// 4. 할 일 상태 토글 (체크/언체크) 기능
function toggleTodoItem(id) {
    const todos = getTodoData();
    const target = todos.find(item => item.id == id);
    if (target) {
        target.checked = !target.checked;
        saveTodoData(todos);
    }
}

// 5. 할 일 삭제 기능
function deleteTodoItem(id) {
    let todos = getTodoData();
    todos = todos.filter(item => item.id != id);
    saveTodoData(todos);
}