const fs = require('fs');
const path = require('path');

// 처리할 HTML 파일 목록
const htmlFiles = [
  '2-1_대시보드.html',
  '3-1_공지사항.html',
  '3-2_공지사항작성.html',
  '4-1_통합프로젝트.html',
  '4-3_프로젝트상세.html',
  '4-4_관리영역.html',
  '4-5_토폴로지.html',
  '5-1_스캔시험.html',
  '5-2_스캔설정.html',
  '5-3_시험실행.html',
  '5-4_스캔결과.html',
  '5-6_사설보고서_스캔.html',
  '6-1_부하시험.html',
  '6-2_부하설정.html',
  '6-3_시험실행_부하.html',
  '6-4_부하결과.html',
  '6-6_사설보고서_부하.html',
  '7-1_발급관리.html',
  '7-2_라이선스발급.html',
  '7-3_라이선스갱신.html',
  '7-4_검증이력.html',
  '7-5_요청할당.html',
  '7-6_요청승인.html',
  '7-7_사용자할당.html',
  '7-9_오프라인인증.html',
  '8-1_시험데이터.html',
  '8-2_데이터조회.html',
  '8-4_데이터편집.html',
  '8-5_백업복구.html',
  '8-6_백업실행.html',
  '8-7_복구실행.html',
  '9-1_보고서생성.html',
  '9-6_보고서출력.html',
  '9-7_보고서이력.html',
  '9-8_보고서검색.html',
  '9-9_버전관리.html',
  '9-10_사설보고서.html',
  '9-11_사설보고서관리.html',
  '9-12_사설보고서출력.html',
  '10-1_사용자관리.html',
  '10-2_사용자등록.html',
  '10-3_사용자상세.html',
  '10-4_권한관리.html',
  '10-7_고객사관리.html',
  '10-8_고객사등록.html',
  '10-9_고객사상세.html',
  '11-1_시스템설정.html',
  '11-7_연동관리.html',
  '11-10_현장시험도구관리.html',
  '12-1_감사로그.html',
  '12-7_운영로그.html',
  '12-8_로그보관.html',
  '13-1_알림.html',
  '14-1_사용자가이드.html',
  '14-4_FAQ.html'
];

// 사이드바 메뉴 스크립트 참조 추가
const sidebarScriptTag = '<script src="sidebar-menu.js"></script>';

// 기존 스크립트 제거 정규식
const oldScriptPattern = /<script>\s*document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/g;

let successCount = 0;
let errorCount = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  try {
    // 파일 존재 확인
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  파일 없음: ${file}`);
      return;
    }
    
    // 파일 읽기
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 기존 사이드바 관련 스크립트 제거
    content = content.replace(oldScriptPattern, '');
    
    // sidebar-menu.js 스크립트 태그가 없으면 추가
    if (!content.includes('sidebar-menu.js')) {
      // </body> 태그 바로 앞에 스크립트 추가
      content = content.replace('</body>', `${sidebarScriptTag}\n</body>`);
    }
    
    // 파일 저장
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ 업데이트 완료: ${file}`);
    successCount++;
    
  } catch (error) {
    console.error(`❌ 오류 발생 (${file}):`, error.message);
    errorCount++;
  }
});

console.log(`\n📊 처리 완료: 성공 ${successCount}개, 오류 ${errorCount}개`);

// 7-5 이후 페이지들 확인 및 수정
console.log('\n📝 7-5 이후 페이지 콘텐츠 확인 중...');

const checkPages = [
  '7-5_요청할당.html',
  '7-6_요청승인.html',
  '7-7_사용자할당.html',
  '7-9_오프라인인증.html',
  '8-1_시험데이터.html',
  '8-2_데이터조회.html',
  '8-4_데이터편집.html',
  '8-5_백업복구.html',
  '8-6_백업실행.html',
  '8-7_복구실행.html'
];

checkPages.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // main 태그 내 콘텐츠 확인
      const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/);
      if (mainMatch) {
        const mainContent = mainMatch[1];
        // 콘텐츠가 너무 짧거나 비어있는지 확인
        const cleanContent = mainContent.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        if (cleanContent.length < 100) {
          console.log(`⚠️  콘텐츠 부족: ${file} (${cleanContent.length}자)`);
        }
      } else {
        console.log(`❌ main 태그 없음: ${file}`);
      }
    }
  } catch (error) {
    console.error(`❌ 확인 오류 (${file}):`, error.message);
  }
});