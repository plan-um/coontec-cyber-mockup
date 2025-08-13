const fs = require('fs');
const path = require('path');

// 메뉴구조도에서 '페이지'로 분류된 항목들만 (스토리보드 번호 기준)
const validPages = [
  '1-1_로그인',
  '1-2_비밀번호재설정',
  '1-3_e-class_SSO',
  '1-4_KR-DAON_SSO',
  '1-5_회원가입',
  '2-1_대시보드',
  '3-1_공지사항',
  '3-2_공지사항작성',
  '4-1_통합프로젝트',
  '4-3_프로젝트상세',
  '4-4_관리영역',
  '4-5_토폴로지',
  '5-1_스캔시험',
  '5-2_스캔설정',
  '5-3_시험실행',
  '5-4_스캔결과',
  '5-6_사설보고서_스캔',
  '6-1_부하시험',
  '6-2_부하설정',
  '6-3_시험실행_부하', // 구분을 위해 부하 추가
  '6-4_부하결과',
  '6-6_사설보고서_부하',
  '7-1_발급관리',
  '7-2_라이선스발급',
  '7-3_라이선스갱신',
  '7-4_검증이력',
  '7-5_요청할당',
  '7-6_요청승인',
  '7-7_사용자할당',
  '7-9_오프라인인증',
  '8-1_시험데이터',
  '8-2_데이터조회',
  '8-4_데이터편집',
  '8-5_백업복구',
  '8-6_백업실행',
  '8-7_복구실행',
  '9-1_보고서생성',
  '9-6_보고서출력',
  '9-7_보고서이력',
  '9-8_보고서검색',
  '9-9_버전관리',
  '9-10_사설보고서',
  '9-11_사설보고서관리',
  '9-12_사설보고서출력',
  '10-1_사용자관리',
  '10-2_사용자등록',
  '10-3_사용자상세',
  '10-4_권한관리',
  '10-7_고객사관리',
  '10-8_고객사등록',
  '10-9_고객사상세',
  '11-1_시스템설정',
  '11-7_연동관리',
  '11-10_현장시험도구관리',
  '12-1_감사로그',
  '12-7_운영로그',
  '12-8_로그보관',
  '13-1_알림'
];

// 현재 디렉토리의 모든 HTML 파일 확인
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

// 유효한 파일과 삭제할 파일 구분
const filesToKeep = [];
const filesToDelete = [];

htmlFiles.forEach(file => {
  // index.html과 특수 파일들은 유지
  if (file === 'index.html' || file.includes('sidebar') || file.includes('test-')) {
    return;
  }
  
  // 파일명에서 확장자 제거
  const nameWithoutExt = file.replace('.html', '');
  
  // 유효한 페이지 목록에 있는지 확인
  if (validPages.includes(nameWithoutExt)) {
    filesToKeep.push(file);
  } else {
    // 6-3 시험실행 파일 특별 처리
    if (nameWithoutExt === '6-3_시험실행') {
      // 6-3_시험실행_부하.html로 이름 변경
      fs.renameSync(file, '6-3_시험실행_부하.html');
      console.log(`✓ 파일명 변경: ${file} → 6-3_시험실행_부하.html`);
    } else {
      filesToDelete.push(file);
    }
  }
});

// 불필요한 파일 삭제
filesToDelete.forEach(file => {
  fs.unlinkSync(file);
  console.log(`✗ 삭제: ${file}`);
});

// 누락된 페이지 확인
const missingPages = [];
validPages.forEach(page => {
  const fileName = `${page}.html`;
  if (!fs.existsSync(fileName)) {
    missingPages.push(fileName);
  }
});

console.log(`\n📊 정리 결과:`);
console.log(`✓ 유지된 파일: ${filesToKeep.length}개`);
console.log(`✗ 삭제된 파일: ${filesToDelete.length}개`);

if (missingPages.length > 0) {
  console.log(`\n⚠️ 누락된 페이지 (생성 필요): ${missingPages.length}개`);
  missingPages.forEach(page => console.log(`  - ${page}`));
}

// 스크립트 파일들도 정리
const scriptsToDelete = [
  'extract-sidebar.js',
  'fix-scan-execute-page.js',
  'fix-sidebar-alignment.js',
  'fix-sidebar-center-align.js',
  'generate-all-pages.js',
  'generate-final-pages.js',
  'generate-html-pages-v2.js',
  'generate-html-pages.js',
  'regenerate-scan-execute.js',
  'update-scan-execute-toss-style.js',
  'fix-all-links-and-rename.js',
  'create-missing-pages.js'
];

scriptsToDelete.forEach(script => {
  if (fs.existsSync(script)) {
    fs.unlinkSync(script);
    console.log(`✗ 스크립트 삭제: ${script}`);
  }
});