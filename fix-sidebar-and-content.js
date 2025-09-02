const fs = require('fs');
const puppeteer = require('puppeteer');

// 1. 먼저 사이드메뉴 토글 스크립트 수정
const correctSidebarScript = `
<script>
document.addEventListener('DOMContentLoaded', function() {
  // 모든 서브메뉴를 초기에 숨김
  const submenus = document.querySelectorAll('aside nav > div > div');
  submenus.forEach(submenu => {
    if (submenu.querySelector('a')) { // 링크가 있는 서브메뉴만
      submenu.style.display = 'none';
    }
  });
  
  // 토글 버튼에 이벤트 리스너 추가
  const toggleButtons = document.querySelectorAll('aside nav > div > button');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // 현재 버튼의 서브메뉴 찾기
      const parentDiv = this.parentElement;
      const submenu = parentDiv.nextElementSibling;
      const chevron = this.querySelector('.lucide-chevron-down');
      
      if (submenu && submenu.tagName === 'DIV' && submenu.querySelector('a')) {
        // 서브메뉴 토글
        if (submenu.style.display === 'none') {
          // 다른 모든 서브메뉴 닫기
          submenus.forEach(otherSubmenu => {
            if (otherSubmenu !== submenu && otherSubmenu.querySelector('a')) {
              otherSubmenu.style.display = 'none';
              const otherButton = otherSubmenu.previousElementSibling?.querySelector('button');
              const otherChevron = otherButton?.querySelector('.lucide-chevron-down');
              if (otherChevron) {
                otherChevron.style.transform = 'rotate(0deg)';
              }
            }
          });
          
          // 현재 서브메뉴 열기
          submenu.style.display = 'block';
          if (chevron) {
            chevron.style.transform = 'rotate(180deg)';
          }
        } else {
          // 현재 서브메뉴 닫기
          submenu.style.display = 'none';
          if (chevron) {
            chevron.style.transform = 'rotate(0deg)';
          }
        }
      }
    });
  });
  
  // 시험 관리 메뉴 기본으로 열기
  const testButton = Array.from(toggleButtons).find(btn => 
    btn.textContent.includes('시험 관리')
  );
  if (testButton) {
    testButton.click();
  }
});
</script>
`;

// 2. 페이지별 실제 콘텐츠 정의
const pageContents = {
  '7-5_요청할당.html': {
    title: '라이선스 요청/할당',
    content: `
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold">라이선스 요청 목록</h2>
        <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          새 요청 생성
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">요청번호</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">선박명</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">요청자</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">요청일</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">작업</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 text-sm">REQ-2024-001</td>
              <td class="px-6 py-4 text-sm">한라호</td>
              <td class="px-6 py-4 text-sm">김선장</td>
              <td class="px-6 py-4 text-sm">2024-03-15</td>
              <td class="px-6 py-4"><span class="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">대기중</span></td>
              <td class="px-6 py-4">
                <button class="text-blue-600 hover:text-blue-900 mr-2">할당</button>
                <button class="text-gray-600 hover:text-gray-900">상세</button>
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 text-sm">REQ-2024-002</td>
              <td class="px-6 py-4 text-sm">백두산호</td>
              <td class="px-6 py-4 text-sm">이기관장</td>
              <td class="px-6 py-4 text-sm">2024-03-14</td>
              <td class="px-6 py-4"><span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">할당완료</span></td>
              <td class="px-6 py-4">
                <button class="text-gray-600 hover:text-gray-900">상세</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    `
  },
  '7-6_요청승인.html': {
    title: '라이선스 요청 승인',
    content: `
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-6">승인 대기 요청</h2>
      
      <div class="space-y-4">
        <div class="border rounded-lg p-4">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-semibold">REQ-2024-003 - 독도호</h3>
              <p class="text-sm text-gray-600 mt-1">요청자: 박선장 | 대우조선해양</p>
              <p class="text-sm text-gray-600">라이선스 유형: 기본 스캔 라이선스</p>
              <p class="text-sm text-gray-600">요청일: 2024-03-16</p>
            </div>
            <div class="flex gap-2">
              <button class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">승인</button>
              <button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">반려</button>
            </div>
          </div>
        </div>
        
        <div class="border rounded-lg p-4">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-semibold">REQ-2024-004 - 금강산호</h3>
              <p class="text-sm text-gray-600 mt-1">요청자: 최기관장 | 현대중공업</p>
              <p class="text-sm text-gray-600">라이선스 유형: 고급 부하시험 라이선스</p>
              <p class="text-sm text-gray-600">요청일: 2024-03-16</p>
            </div>
            <div class="flex gap-2">
              <button class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">승인</button>
              <button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">반려</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  },
  '7-7_사용자할당.html': {
    title: '라이선스 사용자 할당',
    content: `
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-6">사용자별 라이선스 할당</h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="border rounded-lg p-4">
          <h3 class="font-semibold mb-3">사용자 목록</h3>
          <div class="space-y-2">
            <label class="flex items-center">
              <input type="checkbox" class="mr-2">
              <span>김선장 - 한라호</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="mr-2">
              <span>이기관장 - 백두산호</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="mr-2">
              <span>박선장 - 독도호</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="mr-2">
              <span>최기관장 - 금강산호</span>
            </label>
          </div>
        </div>
        
        <div class="border rounded-lg p-4">
          <h3 class="font-semibold mb-3">사용 가능한 라이선스</h3>
          <div class="space-y-2">
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span class="text-sm">기본 스캔 라이선스</span>
              <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">5개 가용</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span class="text-sm">고급 부하시험 라이선스</span>
              <span class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">2개 가용</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span class="text-sm">통합 시험 라이선스</span>
              <span class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">0개 가용</span>
            </div>
          </div>
          
          <button class="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            선택한 사용자에게 할당
          </button>
        </div>
      </div>
    </div>
    `
  },
  '7-9_오프라인인증.html': {
    title: '오프라인 인증',
    content: `
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-6">오프라인 라이선스 인증</h2>
      
      <div class="max-w-2xl">
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">인증 코드 입력</label>
          <textarea class="w-full px-3 py-2 border rounded-lg" rows="4" 
            placeholder="오프라인 인증 코드를 입력하세요..."></textarea>
        </div>
        
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">선박 정보</label>
          <div class="grid grid-cols-2 gap-4">
            <input type="text" class="px-3 py-2 border rounded-lg" placeholder="선박명">
            <input type="text" class="px-3 py-2 border rounded-lg" placeholder="IMO 번호">
          </div>
        </div>
        
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">인증 파일 업로드</label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="mt-2 text-sm text-gray-600">클릭하여 파일 선택 또는 드래그 앤 드롭</p>
          </div>
        </div>
        
        <button class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          오프라인 인증 진행
        </button>
      </div>
    </div>
    `
  },
  '8-1_시험데이터.html': {
    title: '시험 데이터 관리',
    content: `
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold">시험 데이터 목록</h2>
        <div class="flex gap-2">
          <button class="px-4 py-2 border rounded hover:bg-gray-50">내보내기</button>
          <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">가져오기</button>
        </div>
      </div>
      
      <div class="mb-4">
        <div class="flex gap-4">
          <input type="text" class="flex-1 px-3 py-2 border rounded-lg" placeholder="검색...">
          <select class="px-3 py-2 border rounded-lg">
            <option>전체 유형</option>
            <option>스캔 시험</option>
            <option>부하 시험</option>
          </select>
          <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">검색</button>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">선박명</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">시험유형</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">시험일</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">데이터크기</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">작업</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 text-sm">DATA-001</td>
              <td class="px-6 py-4 text-sm">한라호</td>
              <td class="px-6 py-4 text-sm">스캔시험</td>
              <td class="px-6 py-4 text-sm">2024-03-15</td>
              <td class="px-6 py-4 text-sm">2.3 MB</td>
              <td class="px-6 py-4">
                <button class="text-blue-600 hover:text-blue-900 mr-2">보기</button>
                <button class="text-green-600 hover:text-green-900 mr-2">다운로드</button>
                <button class="text-red-600 hover:text-red-900">삭제</button>
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 text-sm">DATA-002</td>
              <td class="px-6 py-4 text-sm">백두산호</td>
              <td class="px-6 py-4 text-sm">부하시험</td>
              <td class="px-6 py-4 text-sm">2024-03-14</td>
              <td class="px-6 py-4 text-sm">5.7 MB</td>
              <td class="px-6 py-4">
                <button class="text-blue-600 hover:text-blue-900 mr-2">보기</button>
                <button class="text-green-600 hover:text-green-900 mr-2">다운로드</button>
                <button class="text-red-600 hover:text-red-900">삭제</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    `
  },
  '8-2_데이터조회.html': {
    title: '데이터 조회',
    content: `
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-6">데이터 상세 조회</h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <div class="border rounded-lg p-4">
            <h3 class="font-semibold mb-3">조회 조건</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">기간</label>
                <div class="flex gap-2">
                  <input type="date" class="px-3 py-2 border rounded-lg">
                  <span class="self-center">~</span>
                  <input type="date" class="px-3 py-2 border rounded-lg">
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">선박</label>
                <select class="w-full px-3 py-2 border rounded-lg">
                  <option>전체</option>
                  <option>한라호</option>
                  <option>백두산호</option>
                  <option>독도호</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">시험 유형</label>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input type="radio" name="test-type" class="mr-2" checked>
                    <span>전체</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="test-type" class="mr-2">
                    <span>스캔시험</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="test-type" class="mr-2">
                    <span>부하시험</span>
                  </label>
                </div>
              </div>
              
              <button class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                조회
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <div class="border rounded-lg p-4">
            <h3 class="font-semibold mb-3">빠른 통계</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">총 데이터</span>
                <span class="font-semibold">1,234건</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">이번 달</span>
                <span class="font-semibold">89건</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">평균 크기</span>
                <span class="font-semibold">3.2 MB</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">총 용량</span>
                <span class="font-semibold">3.9 GB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  }
};

// 3. 모든 HTML 파일 업데이트
function updateAllFiles() {
  const htmlFiles = fs.readdirSync('.')
    .filter(f => f.endsWith('.html'))
    .filter(f => !f.includes('index') && !f.includes('sidebar') && !f.includes('test-'));
  
  console.log('🔧 사이드메뉴 및 콘텐츠 수정 시작...\n');
  
  htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // 1. 기존 스크립트 제거
    content = content.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/gi, '');
    
    // 2. 새로운 스크립트 추가
    if (!content.includes('e.stopPropagation()')) {
      content = content.replace('</body>', correctSidebarScript + '\n</body>');
      modified = true;
    }
    
    // 3. 페이지별 콘텐츠 업데이트
    if (pageContents[file]) {
      const pageInfo = pageContents[file];
      
      // 제목 업데이트
      content = content.replace(/<title>[^<]*<\/title>/gi, `<title>${pageInfo.title} - COONTEC 사이버복원력 시험도구</title>`);
      
      // 메인 콘텐츠 업데이트
      const mainRegex = /<main[^>]*>([\s\S]*?)<\/main>/i;
      const newMain = `<main class="flex-1 p-6 bg-gray-50">
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">${pageInfo.title}</h1>
      <p class="text-gray-600 mt-2">선박 사이버복원력 인증 통합 관리 시스템</p>
    </div>
    ${pageInfo.content}
  </div>
</main>`;
      
      content = content.replace(mainRegex, newMain);
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(file, content);
      console.log(`✅ ${file} 업데이트 완료`);
    }
  });
  
  console.log('\n✨ 모든 파일 수정 완료!');
}

updateAllFiles();