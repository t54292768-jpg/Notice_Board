// [/bucket-core.js] 개인 버킷리스트 데이터를 관리하는 연동 엔진

// 1. 기존 데이터 가져오기 (없으면 세련된 기본 샘플 주입)
function getBucketData() {
    const savedData = localStorage.getItem('houseLinkBuckets');
    if (savedData) return JSON.parse(savedData);
    
    // 초기 기본 샘플 세팅
    const defaultData = [
        { id: 1, text: "가족들과 함께 스위스 인터라켄에서 패러글라이딩 하기", checked: false },
        { id: 2, text: "나만의 홈카페 공간 인테리어 완성하고 친구들 초대하기", checked: true },
        { id: 3, text: "한 달 동안 매일 30분씩 독서하고 서평 기록 남기기", checked: false }
    ];
    saveBucketData(defaultData);
    return defaultData;
}

// 2. 데이터 저장하기
function saveBucketData(data) {
    localStorage.setItem('houseLinkBuckets', JSON.stringify(data));
}

// 3. 버킷리스트 아이템 추가하기
function addBucketItem(text) {
    const buckets = getBucketData();
    const newItem = {
        id: Date.now(),
        text: text,
        checked: false
    };
    buckets.unshift(newItem); // 최신 목표가 맨 위로
    saveBucketData(buckets);
    return newItem;
}

// 4. 달성 상태 토글 (체크/언체크)
function toggleBucketItem(id) {
    const buckets = getBucketData();
    const target = buckets.find(item => item.id == id);
    if (target) {
        target.checked = !target.checked;
        saveBucketData(buckets);
    }
}

// 5. 버킷리스트 아이템 삭제하기
function deleteBucketItem(id) {
    let buckets = getBucketData();
    buckets = buckets.filter(item => item.id != id);
    saveBucketData(buckets);
}