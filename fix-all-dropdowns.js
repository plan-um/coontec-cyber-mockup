const fs = require('fs');
const path = require('path');

// Tailwind CSS CDN과 필요한 스타일 추가
const tailwindCDN = `
<script src="https://cdn.tailwindcss.com"></script>
<style>
  /* Custom styles for radio buttons */
  .radio-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }
  .radio-item {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    background: white;
  }
  .radio-item:hover {
    background-color: #f9fafb;
    border-color: #3b82f6;
  }
  .radio-item input[type="radio"] {
    margin-right: 0.5rem;
  }
  .radio-item.selected {
    background-color: #eff6ff;
    border-color: #3b82f6;
  }
  
  /* Primary colors */
  .text-primary-600 { color: #2563eb; }
  .bg-primary-600 { background-color: #2563eb; }
  .hover\\:text-primary-600:hover { color: #2563eb; }
  .hover\\:bg-primary-700:hover { background-color: #1d4ed8; }
  .focus\\:ring-primary-500:focus { --tw-ring-color: #3b82f6; }
  
  /* Fix for missing styles */
  .bg-blue-600 { background-color: #2563eb; }
  .hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
  .text-white { color: white; }
  .rounded-lg { border-radius: 0.5rem; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
</style>
`;

function fixDropdowns(filePath) {
  console.log(`처리 중: ${path.basename(filePath)}`);
  
  let html = fs.readFileSync(filePath, 'utf8');
  let changesMade = false;
  
  // 1. Tailwind CDN 추가 (head 태그 안에)
  if (!html.includes('cdn.tailwindcss.com')) {
    html = html.replace('</head>', tailwindCDN + '</head>');
    changesMade = true;
  }
  
  // 2. 프로젝트 선택 드롭다운 (5-2에서 이미 처리했지만 재확인)
  if (html.includes('<option value="" selected="">프로젝트를 선택하세요</option>')) {
    // 프로젝트 드롭다운은 3개 항목만 있으므로 그대로 유지
    console.log(`  - 프로젝트 드롭다운 유지 (3개 항목)`);
  }
  
  // 3. 기간 선택 드롭다운 (8-1, 8-2 등)
  if (html.includes('오늘</option>') && html.includes('최근 7일</option>')) {
    const periodRadio = `<div class="radio-group">
      <label class="radio-item">
        <input type="radio" name="period" value="today" checked>
        <span>오늘</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="period" value="7days">
        <span>최근 7일</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="period" value="30days">
        <span>최근 30일</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="period" value="90days">
        <span>최근 90일</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="period" value="custom">
        <span>직접 설정</span>
      </label>
    </div>`;
    
    html = html.replace(
      /<select[^>]*>[\s\S]*?<option[^>]*>오늘<\/option>[\s\S]*?<option[^>]*>직접 설정<\/option>[\s\S]*?<\/select>/g,
      periodRadio
    );
    changesMade = true;
    console.log(`  ✓ 기간 선택 드롭다운을 라디오 버튼으로 변경`);
  }
  
  // 4. 백업 주기 드롭다운 (8-6)
  if (html.includes('매일</option>') && html.includes('매주</option>') && html.includes('매월</option>')) {
    const backupRadio = `<div class="radio-group">
      <label class="radio-item">
        <input type="radio" name="backup_cycle" value="daily" checked>
        <span>매일</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="backup_cycle" value="weekly">
        <span>매주</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="backup_cycle" value="monthly">
        <span>매월</span>
      </label>
    </div>`;
    
    html = html.replace(
      /<select[^>]*>[\s\S]*?<option[^>]*>매일<\/option>[\s\S]*?<option[^>]*>매주<\/option>[\s\S]*?<option[^>]*>매월<\/option>[\s\S]*?<\/select>/g,
      backupRadio
    );
    changesMade = true;
    console.log(`  ✓ 백업 주기 드롭다운을 라디오 버튼으로 변경`);
  }
  
  // 5. 보고서 형식 드롭다운 (9-7, 9-8 등)
  if (html.includes('PDF</option>') && html.includes('Excel</option>')) {
    const formatRadio = `<div class="radio-group">
      <label class="radio-item">
        <input type="radio" name="format" value="all" checked>
        <span>전체</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="format" value="pdf">
        <span>PDF</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="format" value="excel">
        <span>Excel</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="format" value="word">
        <span>Word</span>
      </label>
    </div>`;
    
    html = html.replace(
      /<select[^>]*>[\s\S]*?<option[^>]*>전체<\/option>[\s\S]*?<option[^>]*>PDF<\/option>[\s\S]*?<option[^>]*>Excel<\/option>[\s\S]*?<option[^>]*>Word<\/option>[\s\S]*?<\/select>/g,
      formatRadio
    );
    changesMade = true;
    console.log(`  ✓ 보고서 형식 드롭다운을 라디오 버튼으로 변경`);
  }
  
  // 6. 상태 드롭다운 (9-7, 9-8 등)
  if (html.includes('생성 완료</option>') && html.includes('생성 중</option>')) {
    const statusRadio = `<div class="radio-group">
      <label class="radio-item">
        <input type="radio" name="status" value="all" checked>
        <span>전체</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="status" value="completed">
        <span>생성 완료</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="status" value="generating">
        <span>생성 중</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="status" value="failed">
        <span>실패</span>
      </label>
    </div>`;
    
    html = html.replace(
      /<select[^>]*>[\s\S]*?<option[^>]*>전체<\/option>[\s\S]*?<option[^>]*>생성 완료<\/option>[\s\S]*?<option[^>]*>생성 중<\/option>[\s\S]*?<option[^>]*>실패<\/option>[\s\S]*?<\/select>/g,
      statusRadio
    );
    changesMade = true;
    console.log(`  ✓ 상태 드롭다운을 라디오 버튼으로 변경`);
  }
  
  // 7. 알림 유형 드롭다운 (13-1)
  if (html.includes('시스템 알림</option>') && html.includes('보안 알림</option>')) {
    const notifyRadio = `<div class="radio-group">
      <label class="radio-item">
        <input type="radio" name="notify_type" value="all" checked>
        <span>전체</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="notify_type" value="system">
        <span>시스템 알림</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="notify_type" value="security">
        <span>보안 알림</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="notify_type" value="test">
        <span>시험 알림</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="notify_type" value="report">
        <span>보고서 알림</span>
      </label>
    </div>`;
    
    html = html.replace(
      /<select[^>]*>[\s\S]*?<option[^>]*>전체<\/option>[\s\S]*?<option[^>]*>시스템 알림<\/option>[\s\S]*?<option[^>]*>보안 알림<\/option>[\s\S]*?<option[^>]*>시험 알림<\/option>[\s\S]*?<option[^>]*>보고서 알림<\/option>[\s\S]*?<\/select>/g,
      notifyRadio
    );
    changesMade = true;
    console.log(`  ✓ 알림 유형 드롭다운을 라디오 버튼으로 변경`);
  }
  
  // 8. 언어 선택 드롭다운 (11-1)
  if (html.includes('한국어</option>') && html.includes('English</option>')) {
    const langRadio = `<div class="radio-group">
      <label class="radio-item">
        <input type="radio" name="language" value="ko" checked>
        <span>한국어</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="language" value="en">
        <span>English</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="language" value="zh">
        <span>中文</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="language" value="ja">
        <span>日本語</span>
      </label>
    </div>`;
    
    html = html.replace(
      /<select[^>]*>[\s\S]*?<option[^>]*value="ko"[^>]*>한국어<\/option>[\s\S]*?<option[^>]*>English<\/option>[\s\S]*?<option[^>]*>中文<\/option>[\s\S]*?<option[^>]*>日本語<\/option>[\s\S]*?<\/select>/g,
      langRadio
    );
    changesMade = true;
    console.log(`  ✓ 언어 선택 드롭다운을 라디오 버튼으로 변경`);
  }
  
  // 9. 타임존 드롭다운은 많은 항목이 있으므로 유지
  if (html.includes('Asia/Seoul')) {
    console.log(`  - 타임존 드롭다운 유지 (10개 이상 항목)`);
  }
  
  if (changesMade) {
    fs.writeFileSync(filePath, html);
    console.log(`  ✓ ${path.basename(filePath)} 수정 완료`);
  } else {
    console.log(`  - 변경 사항 없음`);
  }
}

// 모든 HTML 파일 처리
const htmlFiles = [
  '5-2_스캔설정.html',
  '11-1_시스템설정.html',
  '9-9_버전관리.html',
  '9-8_보고서검색.html',
  '9-7_보고서이력.html',
  '8-6_백업실행.html',
  '8-2_데이터조회.html',
  '8-1_시험데이터.html',
  '13-1_알림.html',
  '1-5_회원가입.html',
  '1-4_KR-DAON_SSO.html'
];

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fixDropdowns(file);
  }
});

console.log('\n✅ 모든 드롭다운 수정 완료!');