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
  }
  .radio-item {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
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
</style>
`;

function fixStylesAndDropdowns(filePath) {
  console.log(`처리 중: ${filePath}`);
  
  let html = fs.readFileSync(filePath, 'utf8');
  
  // 1. Tailwind CDN 추가 (head 태그 안에)
  if (!html.includes('cdn.tailwindcss.com')) {
    html = html.replace('</head>', tailwindCDN + '</head>');
  }
  
  // 2. select 드롭다운을 라디오 버튼으로 변경
  
  // 프로젝트 선택 드롭다운
  html = html.replace(
    /<select required="" class="[^"]*"[^>]*>[\s\S]*?<option value="" selected="">프로젝트를 선택하세요<\/option>[\s\S]*?<option value="PRJ-2024-001">PRJ-2024-001[^<]*<\/option>[\s\S]*?<option value="PRJ-2024-002">PRJ-2024-002[^<]*<\/option>[\s\S]*?<option value="PRJ-2024-003">PRJ-2024-003[^<]*<\/option>[\s\S]*?<\/select>/g,
    `<div class="radio-group">
      <label class="radio-item">
        <input type="radio" name="project" value="PRJ-2024-001" required>
        <span>PRJ-2024-001 - 한라호 (IMO: 9876543)</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="project" value="PRJ-2024-002">
        <span>PRJ-2024-002 - 백두산호 (IMO: 9876544)</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="project" value="PRJ-2024-003">
        <span>PRJ-2024-003 - 독도호 (IMO: 9876545)</span>
      </label>
    </div>`
  );
  
  // 스캔 방식 드롭다운
  html = html.replace(
    /<select class="[^"]*"[^>]*>[\s\S]*?<option value="전체스캔" selected="">전체 스캔<\/option>[\s\S]*?<option value="빠른스캔">빠른 스캔<\/option>[\s\S]*?<option value="포트스캔">포트 스캔<\/option>[\s\S]*?<option value="취약점스캔">취약점 스캔<\/option>[\s\S]*?<\/select>/g,
    `<div class="radio-group">
      <label class="radio-item">
        <input type="radio" name="scan_type" value="전체스캔" checked>
        <span>전체 스캔</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="scan_type" value="빠른스캔">
        <span>빠른 스캔</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="scan_type" value="포트스캔">
        <span>포트 스캔</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="scan_type" value="취약점스캔">
        <span>취약점 스캔</span>
      </label>
    </div>`
  );
  
  // 스캔 깊이 드롭다운
  html = html.replace(
    /<select class="[^"]*"[^>]*>[\s\S]*?<option value="얕음">기본 수준<\/option>[\s\S]*?<option value="표준" selected="">표준 수준<\/option>[\s\S]*?<option value="깊음">정밀 수준<\/option>[\s\S]*?<\/select>/g,
    `<div class="radio-group">
      <label class="radio-item">
        <input type="radio" name="scan_depth" value="얕음">
        <span>기본 수준</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="scan_depth" value="표준" checked>
        <span>표준 수준</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="scan_depth" value="깊음">
        <span>정밀 수준</span>
      </label>
    </div>`
  );
  
  // 작업 속도 드롭다운
  html = html.replace(
    /<select class="[^"]*"[^>]*>[\s\S]*?<option value="slow">낮음 \(안정적\)<\/option>[\s\S]*?<option value="normal" selected="">보통<\/option>[\s\S]*?<option value="fast">높음<\/option>[\s\S]*?<option value="insane">최고<\/option>[\s\S]*?<\/select>/g,
    `<div class="radio-group">
      <label class="radio-item">
        <input type="radio" name="scan_speed" value="slow">
        <span>낮음 (안정적)</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="scan_speed" value="normal" checked>
        <span>보통</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="scan_speed" value="fast">
        <span>높음</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="scan_speed" value="insane">
        <span>최고</span>
      </label>
    </div>`
  );
  
  // 취약점 데이터베이스 드롭다운
  html = html.replace(
    /<select class="[^"]*"[^>]*>[\s\S]*?<option value="최신" selected="">최신 버전 \(2024\.03\)<\/option>[\s\S]*?<option value="안정">안정 버전 \(2024\.01\)<\/option>[\s\S]*?<option value="이전">이전 버전 \(2023\.12\)<\/option>[\s\S]*?<\/select>/g,
    `<div class="radio-group">
      <label class="radio-item">
        <input type="radio" name="vuln_db" value="최신" checked>
        <span>최신 버전 (2024.03)</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="vuln_db" value="안정">
        <span>안정 버전 (2024.01)</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="vuln_db" value="이전">
        <span>이전 버전 (2023.12)</span>
      </label>
    </div>`
  );
  
  // 반복 주기 드롭다운 (5-3 페이지)
  html = html.replace(
    /<select class="[^"]*"[^>]*>[\s\S]*?<option>없음<\/option>[\s\S]*?<option>매일<\/option>[\s\S]*?<option>매주<\/option>[\s\S]*?<option>매월<\/option>[\s\S]*?<\/select>/g,
    `<div class="radio-group">
      <label class="radio-item">
        <input type="radio" name="repeat_cycle" value="none" checked>
        <span>없음</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="repeat_cycle" value="daily">
        <span>매일</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="repeat_cycle" value="weekly">
        <span>매주</span>
      </label>
      <label class="radio-item">
        <input type="radio" name="repeat_cycle" value="monthly">
        <span>매월</span>
      </label>
    </div>`
  );
  
  fs.writeFileSync(filePath, html);
  console.log(`✓ ${path.basename(filePath)} 수정 완료`);
}

// 5-2, 5-3 페이지 수정
['5-2_스캔설정.html', '5-3_시험실행.html'].forEach(file => {
  if (fs.existsSync(file)) {
    fixStylesAndDropdowns(file);
  }
});

console.log('\n스타일 및 드롭다운 수정 완료!');