const fs = require('fs');

// 5-3_test-scan-execute.html 파일 읽기
let htmlContent = fs.readFileSync('5-3_test-scan-execute.html', 'utf8');

// 토스 스타일 카피라이팅 적용 (격식체 ~합니다 사용)
const replacements = [
  // 제목과 설명
  ['스캔시험 설정', '스캔시험 준비'],
  ['선박 네트워크 취약점 스캔 파라미터를 설정합니다', '어떤 영역을 스캔할지 정합니다'],
  
  // 섹션 헤더
  ['프로젝트 정보', '먼저, 프로젝트를 선택합니다'],
  ['스캔 대상 설정', '스캔할 영역을 정합니다'],
  ['스캔 옵션', '어떻게 스캔할까요?'],
  
  // 레이블
  ['프로젝트 선택', '어떤 프로젝트인가요?'],
  ['프로젝트를 선택하세요', '프로젝트를 골라주세요'],
  ['스캔 대상 Zone', '어느 영역을 점검할까요?'],
  ['IP 범위', 'IP 주소 범위'],
  ['예: 192.168.1.0/24', '192.168.1.0/24 형식으로 써주세요'],
  ['포트 범위', '검사할 포트'],
  ['제외 IP (선택)', '제외할 IP (건너뛸 주소)'],
  ['제외할 IP 주소를 한 줄에 하나씩 입력하세요', '스캔하지 않을 IP를 한 줄에 하나씩 적어주세요'],
  
  // 스캔 옵션
  ['스캔 유형', '스캔 방식'],
  ['전체 스캔', '전체 점검 (꼼꼼하게)'],
  ['빠른 스캔', '빠른 점검 (주요 부분만)'],
  ['포트 스캔만', '포트만 확인'],
  ['취약점 스캔', '취약점 집중 점검'],
  
  ['스캔 깊이', '얼마나 자세히?'],
  ['얕음 (빠름)', '간단히'],
  ['깊음 (정밀)', '아주 자세히'],
  
  ['스캔 속도', '작업 속도'],
  ['느림 (은밀)', '천천히 (조심스럽게)'],
  ['보통', '보통 속도'],
  ['빠름', '빠르게'],
  ['매우 빠름', '최대 속도'],
  
  ['타임아웃 (초)', '대기 시간 (초)'],
  ['병렬 스캔 수', '동시 작업 수'],
  ['취약점 DB', '취약점 데이터베이스'],
  ['최신 (2024.03)', '최신 버전 (2024.03)'],
  ['안정 (2024.01)', '안정 버전 (2024.01)'],
  ['이전 (2023.12)', '이전 버전 (2023.12)'],
  
  // 고급 옵션
  ['고급 옵션', '추가 설정'],
  ['OS 탐지', '운영체제를 확인합니다'],
  ['서비스 버전 탐지', '서비스 버전을 확인합니다'],
  ['스크립트 스캔', '자동 스크립트를 실행합니다'],
  
  // 버튼
  ['설정 저장 및 다음', '스캔 실행'],
  
  // 경고 메시지 - 추가 내용 삽입
  ['class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">', 
   'class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"><div class="flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-circle h-5 w-5 text-yellow-600 flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg><div class="text-sm text-yellow-800"><p class="font-semibold">잠깐, 확인해주세요</p><ul class="mt-1 list-disc list-inside"><li>스캔하기 전에 선박 담당자와 먼저 이야기합니다</li><li>중요한 시스템은 빼거나 약하게 설정합니다</li><li>스캔하는 동안 네트워크가 느려질 수 있습니다</li></ul></div></div>']
];

// 모든 치환 수행
replacements.forEach(([oldText, newText]) => {
  const regex = new RegExp(oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  htmlContent = htmlContent.replace(regex, newText);
});

// 경고 메시지가 제대로 추가되지 않았다면 직접 찾아서 추가
if (!htmlContent.includes('잠깐, 확인해주세요')) {
  // 폼 종료 태그 직전에 경고 메시지 추가
  const warningHtml = `
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div class="flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-circle h-5 w-5 text-yellow-600 flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <div class="text-sm text-yellow-800">
              <p class="font-semibold">잠깐, 확인해주세요</p>
              <ul class="mt-1 list-disc list-inside">
                <li>스캔하기 전에 선박 담당자와 먼저 이야기합니다</li>
                <li>중요한 시스템은 빼거나 약하게 설정합니다</li>
                <li>스캔하는 동안 네트워크가 느려질 수 있습니다</li>
              </ul>
            </div>
          </div>
        </div>`;
  
  // 버튼 섹션 직전에 경고 메시지 추가
  htmlContent = htmlContent.replace(
    '<div class="flex justify-end gap-2">',
    warningHtml + '\n        <div class="flex justify-end gap-2">'
  );
}

// 파일 저장
fs.writeFileSync('5-3_test-scan-execute.html', htmlContent);
console.log('✓ 5-3_test-scan-execute.html 토스 스타일 카피라이팅 적용 완료');