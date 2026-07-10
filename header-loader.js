// [header-loader.js] 메인과 서브 페이지 구분 없이 헤더를 꽂아주는 치트키 파일
document.addEventListener("DOMContentLoaded", function() {
    // 1. 공통 CSS와 상단 고정 강제 스타일을 head에 주입
    if (!document.querySelector('link[href="style.css"]')) {
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = 'style.css';
        document.head.appendChild(styleLink);
    }

    const inlineStyle = document.createElement('style');
    inlineStyle.textContent = `
        .main-header {
            position: fixed !important;
            top: 0; left: 0; width: 100%;
            display: grid !important;
            grid-template-columns: 80px 1fr 80px !important;
            padding: 10px 20px;
            background-color: #ffffff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
            align-items: start;
            gap: 15px;
            z-index: 9999;
            box-sizing: border-box;
        }
        .header-date { font-size: 0.75rem; color: #a0aec0; padding-top: 6px; white-space: nowrap; }
        .header-center { text-align: center; width: 100%; min-width: 0; }
        .header-center h1 { font-size: 1.5rem; color: #1a1a1a; margin-bottom: 8px; font-weight: 700; }
        .nav-slider-wrapper { width: 100%; display: flex; align-items: center; position: relative; padding: 0 25px; box-sizing: border-box;}
        .slide-btn { position: absolute; top: 50%; transform: translateY(-50%); width: 24px; height: 24px; background: transparent; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10; opacity: 0.4; }
        .slide-btn:hover { opacity: 1; }
        .slide-btn svg { width: 18px; height: 18px; fill: none; stroke: #1a1a1a; stroke-width: 2; }
        .slide-btn.left { left: 0px; } .slide-btn.right { right: 0px; }
        .nav-links { display: flex; align-items: center; overflow-x: auto; white-space: nowrap; padding: 4px 0; scroll-behavior: smooth; scroll-snap-type: x mandatory; scrollbar-width: none; width: 100%; }
        .nav-links::-webkit-scrollbar { display: none; }
        .menu-item-group { display: flex; align-items: center; justify-content: center; scroll-snap-align: start; width: 11%; min-width: 95px; max-width: 130px; flex-shrink: 0; }
        .nav-links a { text-decoration: none; color: #4a5568; font-size: 0.92rem; font-weight: 500; text-align: center; display: block; width: 100%; padding: 0 4px; }
        .menu-item-group::after { content: '•'; color: #e2e8f0; font-size: 0.7rem; margin-left: auto; }
        .menu-item-group:last-child::after { content: ''; }
        .header-right { display: flex; flex-direction: column; align-items: flex-end; white-space: nowrap; }
        .profile-section { display: flex; flex-direction: column; align-items: center; padding-top: 2px; }
        .profile-img { width: 46px; height: 46px; border-radius: 50%; background-color: #ddd; object-fit: cover; margin-bottom: 5px; border: 1px solid #edf2f7; }
        .profile-name { font-size: 0.8rem; color: #4a5568; font-weight: 600; }
        .profile-link-wrapper { text-decoration: none; display: block; cursor: pointer; transition: all 0.2s; }
        .profile-link-wrapper:hover { opacity: 0.85; transform: scale(1.03); }
        
        /* [중요] 헤더가 fixed 되면서 본문 콘텐츠(대시보드 등)가 파고드는 현상 방지 마진 */
        body > main, .dashboard-container {
            margin-top: 110px !important;
            box-sizing: border-box;
        }
    `;
    document.head.appendChild(inlineStyle);

    // 2. HTML 구조 생성 및 최상단 삽입
    const headerHtml = `
    <header class="main-header">
        <div class="header-date" id="current-date"></div>
        <div class="header-center">
            <a href="/Main/main_p.html" style="text-decoration: none; color: inherit;"><h1>House Link</h1></a>
            <div class="nav-slider-wrapper">
                <button class="slide-btn left" id="slide-left"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                <nav class="nav-links" id="nav-links">
                    <div class="menu-item-group"><a href="calendar.html">캘린더</a></div>
                    <div class="menu-item-group"><a href="#diary">다이어리</a></div>
                    <div class="menu-item-group"><a href="#travel">여행 기록</a></div>
                    <div class="menu-item-group"><a href="#account">가계부</a></div>
                    <div class="menu-item-group"><a href="#fridge">냉장고 관리</a></div>
                    <div class="menu-item-group"><a href="#todo">To-Do List</a></div>
                    <div class="menu-item-group"><a href="#monthly-goal">이달의 목표</a></div>
                    <div class="menu-item-group"><a href="#yearly-goal">올해의 목표</a></div>
                    <div class="menu-item-group" style="scroll-snap-align: end;"><a href="#bucket">개인 버킷리스트</a></div>
                </nav>
                <button class="slide-btn right" id="slide-right"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
            </div>
        </div>
        <div class="header-right">
            <a href="/Profile/profile.html" class="profile-link-wrapper">
                <div class="profile-section">
                    <img class="profile-img" src="https://via.placeholder.com/46" alt="프로필 사진">
                    <span class="profile-name">홍길동 님</span>
                </div>
            </a>
        </div>
    </header>
    `;
   
    document.body.insertAdjacentHTML('afterbegin', headerHtml);

    // 3. 오늘 날짜 및 가로 슬라이더 기능 연결
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const weekMap = ['일', '월', '화', '수', '목', '금', '토'];
        dateElement.innerText = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')} (${weekMap[today.getDay()]})`;
    }

    const navLinks = document.getElementById('nav-links');
    const slideRight = document.getElementById('slide-right');
    const slideLeft = document.getElementById('slide-left');
    if (navLinks && slideRight && slideLeft) {
        slideRight.addEventListener('click', () => { navLinks.scrollLeft += 110; });
        slideLeft.addEventListener('click', () => { navLinks.scrollLeft -= 110; });
    }
});