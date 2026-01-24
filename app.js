// Data Initialization
const DEFAULT_CHECKLIST = {
    '월': {
        '오픈': ['머신 전원 확인', '그라인더 세팅', '우유 재고 확인', '쇼케이스 세팅'],
        '화장실': ['세면대 물기 제거', '변기 청소 상태 확인', '핸드타월/휴지 채우기', '바닥 물기 제거'],
        '발주': [
            '☕ 커피 원두', '에스프레소 원두', '디카페인 원두', '싱글오리진 원두',
            '🥛 우유 · 대체유', '일반 우유', '저지방 우유', '두유', '오트밀크', '아몬드밀크',
            '🍯 시럽 · 소스', '바닐라 시럽', '카라멜 시럽', '헤이즐넛 시럽', '초콜릿 소스', '화이트초콜릿 소스',
            '🍵 티 · 분말', '녹차 파우더', '말차 파우더', '초코 파우더', '밀크티 베이스', '허브티 티백', '홍차 티백',
            '❄️ 기타 음료 재료', '얼음', '정수 생수', '탄산수', '레몬 농축액', '자몽 농축액',
            '🍰 베이커리 · 디저트 재료', '크림치즈', '생크림', '버터', '냉동 베이커리(크로와상 등)',
            '🍓 토핑 · 부재료', '휘핑크림', '코코아 파우더', '시나몬 파우더', '초콜릿 칩', '드라이 과일',
            '🧂 소모품 · 부자재', '컵(테이크아웃)', '컵뚜껑', '홀더', '스트로우', '냅킨', '젓는 막대',
            '🧼 위생 · 관리용', '행주', '키친타월', '세제', '소독용 알코올', '고무장갑'
        ],
        '오후/청소': ['제빙기 청소', '테이블 닦기', '바닥 물청소'],
        '마감': ['커피 머신 마감 청소', '포스 정산', '주방 쓰레기 배출']
    }
};

// Fill empty days
['화', '수', '목', '금', '토', '일'].forEach(day => {
    DEFAULT_CHECKLIST[day] = JSON.parse(JSON.stringify(DEFAULT_CHECKLIST['월']));
});

const DEFAULT_RECIPES = [
    { id: 1, name: "아이스 바닐라 라떼", category: "커피", ingredients: ["원두 2샷", "오트밀크 200ml", "바닐라 시럽 3펌프"], steps: ["얼음 채우기", "우유 붓기", "샷 붓기", "잘 젓기"] },
    { id: 2, name: "카페 라떼 (HOT)", category: "커피", ingredients: ["에스프레소 2샷", "스팀 우유 280ml"], steps: ["샷 추출", "우유 스팀 (65도)", "푸어링"] },
    { id: 3, name: "아메리카노 (ICE)", category: "커피", ingredients: ["정수 250ml", "에스프레소 2샷", "얼음 가득"], steps: ["잔에 물 붓기", "얼음 채우기", "샷 붓기"] },
    { id: 4, name: "대추생강차", category: "한방", ingredients: ["대추생강청 80g", "뜨거운 물 250ml"], steps: ["청 넣기", "물 붓고 젓기", "고명 올리기"] },
    { id: 5, name: "쌍화차", category: "한방", ingredients: ["쌍화 베이스 100ml", "뜨거운 물 150ml"], steps: ["베이스+물 데우기", "견과류 듬뿍", "노른자 옵션"] },
    { id: 6, name: "콜드브루 아인슈페너", category: "커피", ingredients: ["콜드브루 60ml", "물 120ml", "크림 60ml"], steps: ["베이스 만들기", "얼음", "크림 올리기"] }
];

const STAFF_EDUCATION = [
    "01. \"안녕하세요, 오늘도 편안한 하루 되세요.\" - 우리의 인사는 고객의 긴장을 해소하는 첫걸음입니다.",
    "02. 고객의 눈을 맞추며 주문을 받으세요. 눈맞춤은 신뢰의 시작입니다.",
    "03. \"오늘 소화는 어떠신가요?\" - 우리 카페만의 특색 있는 안부 인사가 브랜드가 됩니다.",
    "04. 메뉴 추천 시 고객의 기호뿐 아니라 '오늘의 컨디션'을 먼저 물어봐 주세요.",
    "05. 바쁜 순간일수록 말씨는 더 부드럽게, 행동은 더 신속하게 합니다.",
    "06. 고객의 불만은 우리가 개선해야 할 '보약'과 같습니다. 경청이 우선입니다.",
    "07. \"천천히 드시고 편안히 쉬다 가세요.\" - 회전율보다 중요한 것은 고객의 경험입니다.",
    "08. 단골 고객의 메뉴 취향을 기억하는 것, 그것이 가장 강력한 마케팅입니다.",
    "09. 음료를 내어드릴 때 컵의 손잡이 방향을 고객 쪽으로 향하게 하세요. 작은 배려가 큰 차이를 만듭니다.",
    "10. \"따뜻한 차 한 잔으로 속을 보호하세요.\" - 메뉴의 효능을 한마디 덧붙이면 전문성이 느껴집니다."
];

// App State
let state = {
    currentPage: 'dashboard',
    activeBranch: localStorage.getItem('cafe_active_branch') || '여의도점',
    activeDay: new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(new Date()),
    checklist: JSON.parse(localStorage.getItem('cafe_checklist')) || DEFAULT_CHECKLIST,
    completedTasks: JSON.parse(localStorage.getItem('cafe_completed_tasks')) || {},
    recipes: JSON.parse(localStorage.getItem('cafe_recipes')) || DEFAULT_RECIPES,
    staffEducation: JSON.parse(localStorage.getItem('cafe_staff_education')) || STAFF_EDUCATION,
    orderNotes: JSON.parse(localStorage.getItem('cafe_order_notes')) || {}
};

// Elements
const mainView = document.getElementById('main-view');
const pageTitle = document.getElementById('page-title');
const navItems = document.querySelectorAll('.nav-item');

function init() {
    updateTime();
    setInterval(updateTime, 1000);
    setPage('dashboard');
}

function updateTime() {
    const now = new Date();
    const timeEl = document.getElementById('current-time');
    if (timeEl) timeEl.textContent = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}

window.setPage = (page) => {
    state.currentPage = page;

    // Nav Active Style
    navItems.forEach(item => item.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (activeNav) activeNav.classList.add('active');

    // Page Title
    const titles = {
        'dashboard': '오늘의 현황',
        'checklist': '체크리스트',
        'order': '재료 발주',
        'recipes': '레시피 북',
        'editor': '관리 및 설정'
    };
    pageTitle.textContent = titles[page];

    renderPageCheck();
};

function renderPageCheck() {
    mainView.innerHTML = '';
    switch (state.currentPage) {
        case 'dashboard': renderMobileDashboard(); break;
        case 'checklist': renderMobileChecklist(); break;
        case 'order': renderMobileOrder(); break;
        case 'recipes': renderMobileRecipes(); break;
        case 'editor': renderMobileEditor(); break;
    }
}

// ------ RENDERING FUNCTIONS (Mobile Optimized) ------

function renderMobileDashboard() {
    const today = new Date().toISOString().split('T')[0];
    const day = state.activeDay;
    const chores = state.checklist[day] || {};

    let total = 0, done = 0;
    Object.entries(chores).forEach(([cat, tasks]) => {
        if (cat === '발주') return;
        tasks.forEach(t => {
            total++;
            if (state.completedTasks[`${state.activeBranch}-${today}-${day}-${cat}-${t}`]) done++;
        });
    });

    const percent = total > 0 ? Math.round((done / total) * 100) : 0;

    // Staff Education Random
    const eduList = (state.staffEducation && state.staffEducation.length > 0) ? state.staffEducation : STAFF_EDUCATION;
    let r1 = Math.floor(Math.random() * eduList.length);
    let r2 = Math.floor(Math.random() * eduList.length);
    if (eduList.length > 1) {
        while (r1 === r2) r2 = Math.floor(Math.random() * eduList.length);
    }

    mainView.innerHTML = `
        <div style="display:flex; gap:10px; margin-bottom:20px;">
            <button class="day-btn ${state.activeBranch === '여의도점' ? 'active' : ''}" onclick="changeBranch('여의도점')">여의도점</button>
            <button class="day-btn ${state.activeBranch === '가양점' ? 'active' : ''}" onclick="changeBranch('가양점')">가양점</button>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-title">📉 오늘 달성률</span></div>
            <div style="text-align:center; padding:10px 0;">
                <h1 style="font-size:3rem; color:var(--primary); margin-bottom:10px;">${percent}%</h1>
                <div style="width:100%; background:#eee; height:12px; border-radius:10px; overflow:hidden;">
                    <div style="width:${percent}%; background:var(--primary); height:100%;"></div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-title">📝 미완료 업무</span></div>
            ${(() => {
            const uncompleted = [];
            Object.entries(chores).forEach(([cat, tasks]) => {
                if (cat === '발주') return;
                tasks.forEach(t => {
                    if (!state.completedTasks[`${state.activeBranch}-${today}-${day}-${cat}-${t}`]) uncompleted.push(t);
                });
            });

            if (uncompleted.length === 0) return '<p style="color:var(--primary); font-weight:bold;">🎉 모든 업무 완료!</p>';
            const show = uncompleted.slice(0, 5);
            return `<ul style="padding-left:20px; font-size:0.9rem; color:#555;">${show.map(t => `<li>${t}</li>`).join('')}${uncompleted.length > 5 ? `<li>외 ${uncompleted.length - 5}개...</li>` : ''}</ul>`;
        })()}
        </div>

        <div class="card">
            <div class="card-header"><span class="card-title">📦 오늘의 발주</span></div>
            ${(() => {
            const orderItems = state.checklist[day]['발주'] || [];
            const checked = orderItems.filter(item => state.completedTasks[`${state.activeBranch}-${today}-${day}-발주-${item}`]);
            if (checked.length === 0) return '<p style="color:#999; font-size:0.9rem;">발주 체크된 항목이 없습니다.</p>';
            return `<ul style="padding-left:20px; font-size:0.9rem; color:#555;">${checked.map(i => `<li>${i}</li>`).join('')}</ul>`;
        })()}
        </div>

        <div class="card">
            <div class="card-header"><span class="card-title">📢 소화 게시판</span></div>
            <div style="font-size:0.95rem; line-height:1.6; color:#444;">
                <p style="margin-bottom:15px;"><strong>[우리 같이 1]</strong><br>${eduList[r1].replace(/^\d+\.\s*/, '')}</p>
                <p><strong>[우리 같이 2]</strong><br>${eduList[r2].replace(/^\d+\.\s*/, '')}</p>
            </div>
        </div>
    `;
}

function renderMobileChecklist() {
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    let html = `
        <div style="display:flex; overflow-x:auto; gap:5px; padding-bottom:15px; margin-bottom:10px;">
            ${days.map(d => `<button class="day-btn ${state.activeDay === d ? 'active' : ''}" style="min-width:50px;" onclick="changeDay('${d}')">${d}</button>`).join('')}
        </div>
    `;

    const tasks = state.checklist[state.activeDay] || {};
    const today = new Date().toISOString().split('T')[0];
    let hasContent = false;

    Object.entries(tasks).forEach(([cat, items]) => {
        if (cat === '발주') return;
        hasContent = true;
        html += `<div class="card"><h3 style="margin-bottom:10px; color:var(--primary); font-size:1.1rem;">${cat}</h3>`;
        items.forEach(item => {
            const id = `${state.activeBranch}-${today}-${state.activeDay}-${cat}-${item}`;
            const isChecked = state.completedTasks[id];
            html += `
                <div class="task-item" onclick="toggleTask('${id}')">
                    <input type="checkbox" class="task-checkbox" ${isChecked ? 'checked' : ''} style="pointer-events:none;">
                    <span class="task-text ${isChecked ? 'checked' : ''}">${item}</span>
                </div>
            `;
        });
        html += `</div>`;
    });

    if (!hasContent) html += `<div class="card"><p>등록된 체크리스트가 없습니다.</p></div>`;
    mainView.innerHTML = html;
}

function renderMobileOrder() {
    const today = new Date().toISOString().split('T')[0];
    const orderList = state.checklist[state.activeDay]['발주'] || [];

    let html = `
        <div class="card">
            <div class="card-header">
                <span class="card-title">🛒 발주 체크리스트 (${state.activeDay}요일)</span>
                <button class="btn btn-primary" onclick="copyOrderText()" style="font-size:0.8rem;">📋 복사하기</button>
            </div>
            <textarea id="order-preview" style="width:100%; height:100px; padding:10px; border:1px solid #ddd; border-radius:8px; font-size:0.85rem; margin-bottom:15px; background:#f9f9f9;" readonly></textarea>
            
            <div style="max-height:400px; overflow-y:auto;">
    `;

    orderList.forEach(item => {
        const id = `${state.activeBranch}-${today}-${state.activeDay}-발주-${item}`;
        const isChecked = state.completedTasks[id];
        const noteId = `${state.activeBranch}-${today}-${item}-note`;
        const noteVal = state.orderNotes && state.orderNotes[noteId] ? state.orderNotes[noteId] : '';

        html += `
            <div class="task-item" style="flex-wrap:wrap;">
                <div style="display:flex; align-items:center; width:100%; margin-bottom:5px;" onclick="toggleTask('${id}', true)">
                    <input type="checkbox" class="task-checkbox" ${isChecked ? 'checked' : ''} style="pointer-events:none;">
                    <span class="task-text ${isChecked ? 'checked' : ''}" style="font-weight:500;">${item}</span>
                </div>
                ${isChecked ? `
                    <input type="text" placeholder="수량/비고 입력" value="${noteVal}" 
                        style="width:100%; padding:8px; border:1px solid #eee; border-radius:5px; font-size:0.9rem; margin-left:34px;"
                        oninput="saveOrderNote('${noteId}', this.value)"
                    >
                ` : ''}
            </div>
        `;
    });

    html += `</div></div>`;
    mainView.innerHTML = html;
    setTimeout(updateOrderPreview, 0); // Wait for DOM
}

function renderMobileRecipes() {
    let html = `<div class="card"><h3 style="margin-bottom:10px;">☕ 레시피 북</h3>`;

    if (!state.recipes || state.recipes.length === 0) {
        html += `<p>등록된 레시피가 없습니다.</p></div>`;
        mainView.innerHTML = html;
        return;
    }

    html += `<ul style="list-style:none;">`;
    state.recipes.forEach(r => {
        html += `
            <li style="border-bottom:1px solid #eee; padding:15px 0;">
                <div style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="toggleRecipeDetail(${r.id})">
                    <span style="font-weight:bold; font-size:1.05rem;">${r.name}</span>
                    <span style="font-size:0.8rem; background:#f0f0f0; padding:2px 6px; border-radius:4px;">${r.category}</span>
                </div>
                <div id="recipe-detail-${r.id}" class="hidden" style="margin-top:10px; padding:10px; background:#f9f9f9; border-radius:8px; font-size:0.9rem;">
                    <p><strong>재료:</strong> ${Array.isArray(r.ingredients) ? r.ingredients.join(', ') : r.ingredients}</p>
                    <p style="margin-top:5px;"><strong>순서:</strong></p>
                    <ol style="padding-left:20px; margin-top:5px;">
                        ${Array.isArray(r.steps) ? r.steps.map(s => `<li>${s}</li>`).join('') : `<li>${r.steps}</li>`}
                    </ol>
                    ${r.tips ? `<p style="margin-top:8px; color:#d81b60;">💡 ${r.tips}</p>` : ''}
                </div>
            </li>
        `;
    });
    html += `</ul></div>`;
    mainView.innerHTML = html;
}

function renderMobileEditor() {
    mainView.innerHTML = `
        <div class="card">
            <h3 style="margin-bottom:15px;">🛠️ 관리 메뉴</h3>
            <p style="font-size:0.9rem; color:#666; margin-bottom:20px;">모바일에서는 간단한 초기화 및 확인만 가능합니다. 상세 편집은 PC 버전을 이용해 주세요.</p>
            
            <button class="btn" style="width:100%; background:#eee; color:#333; margin-bottom:10px;" onclick="if(confirm('모든 데이터를 초기화하시겠습니까?')) { localStorage.clear(); location.reload(); }">⚠️ 데이터 전체 초기화 (문제 해결용)</button>
            
            <div style="margin-top:20px; padding-top:20px; border-top:1px solid #eee;">
                <h4>📢 게시판 메시지 확인</h4>
                <div style="max-height:200px; overflow-y:auto; background:#f5f5f5; padding:10px; margin-top:10px; font-size:0.85rem;">
                    ${(state.staffEducation || STAFF_EDUCATION).join('<br><br>')}
                </div>
            </div>
        </div>
    `;
}

// ------ LOGIC FUNCTIONS ------

window.changeBranch = (b) => {
    state.activeBranch = b;
    localStorage.setItem('cafe_active_branch', b);
    renderPageCheck();
};

window.changeDay = (d) => {
    state.activeDay = d;
    renderPageCheck();
};

window.toggleTask = (id, isOrder = false) => {
    if (state.completedTasks[id]) delete state.completedTasks[id];
    else state.completedTasks[id] = true;
    localStorage.setItem('cafe_completed_tasks', JSON.stringify(state.completedTasks));

    if (isOrder) {
        renderMobileOrder();
    } else {
        renderPageCheck();
    }
};

window.toggleRecipeDetail = (id) => {
    const el = document.getElementById(`recipe-detail-${id}`);
    if (el) el.classList.toggle('hidden');
};

window.saveOrderNote = (id, val) => {
    if (!state.orderNotes) state.orderNotes = {};
    state.orderNotes[id] = val;
    localStorage.setItem('cafe_order_notes', JSON.stringify(state.orderNotes));
    updateOrderPreview();
};

window.copyOrderText = () => {
    const text = document.getElementById('order-preview').value;
    navigator.clipboard.writeText(text).then(() => {
        alert('발주 내용이 복사되었습니다! 카톡 등에 붙여넣기 하세요.');
    }).catch(err => {
        alert('복사 실패. 텍스트를 길게 눌러서 직접 복사해주세요.');
    });
};

function updateOrderPreview() {
    if (state.currentPage !== 'order') return;
    const today = new Date().toISOString().split('T')[0];
    const items = state.checklist[state.activeDay]['발주'] || [];
    const checked = items.filter(i => state.completedTasks[`${state.activeBranch}-${today}-${state.activeDay}-발주-${i}`]);

    let text = `[발주 요청서 - ${state.activeBranch}]\n날짜: ${today}\n\n`;
    if (checked.length === 0) text += "발주할 내역이 없습니다.";
    else {
        checked.forEach(i => {
            const noteId = `${state.activeBranch}-${today}-${i}-note`;
            const note = state.orderNotes && state.orderNotes[noteId] ? ` (${state.orderNotes[noteId]})` : '';
            text += `- ${i}${note}\n`;
        });
    }

    const previewEl = document.getElementById('order-preview');
    if (previewEl) previewEl.value = text;
}

window.closeModal = () => {
    document.getElementById('modal-overlay').classList.add('hidden');
};

init();
