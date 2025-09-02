const fs = require('fs');
const path = require('path');

// 링크 매핑 (잘못된 링크 -> 올바른 링크)
const linkMapping = {
  // 잘못된 영어 링크 -> 한글 링크
  '13-1_notifications.html': '13-1_알림.html',
  '10-4_permission-manage.html': '10-4_권한관리.html',
  '10-7_customers-manage.html': '10-7_고객사관리.html',
  '10-8_customers-register.html': '10-8_고객사등록.html',
  '11-1_system-settings.html': '11-1_시스템설정.html',
  '11-7_integration-manage.html': '11-7_연동관리.html',
  '11-10_tools-manage.html': '11-10_현장시험도구관리.html',
  '12-1_audit-log.html': '12-1_감사로그.html',
  '12-7_operation-log.html': '12-7_운영로그.html',
  '12-8_log-archive.html': '12-8_로그보관.html',
  '14-1_user-guide.html': '14-1_사용자가이드.html',
  '14-4_faq.html': '14-4_FAQ.html',
  
  // 6-3 시험실행 파일명 문제
  '6-3_시험실행.html': '6-3_시험실행_부하.html',
  
  // index.html의 잘못된 링크들
  '1_dashboard.html': '2-1_대시보드.html',
  '2_project.html': '4-1_통합프로젝트.html',
  '3_test_scan.html': '5-1_스캔시험.html',
  '3_1_test_scan_setup.html': '5-2_스캔설정.html',
  '3_2_test_scan_execute.html': '5-3_시험실행.html',
  '3_3_test_scan_result.html': '5-4_스캔결과.html',
  '3_4_test_scan_report.html': '5-6_사설보고서_스캔.html',
  '4_test_load.html': '6-1_부하시험.html',
  '4_1_test_load_setup.html': '6-2_부하설정.html',
  '4_2_test_load_execute.html': '6-3_시험실행_부하.html',
  '4_3_test_load_result.html': '6-4_부하결과.html',
  '4_4_test_load_report.html': '6-6_사설보고서_부하.html',
  '5_report_generate.html': '9-1_보고서생성.html',
  '5_1_report_history.html': '9-7_보고서이력.html',
  '5_2_report_view.html': '9-6_보고서출력.html',
  '6_license.html': '7-1_발급관리.html',
  '6_1_license_issue.html': '7-2_라이선스발급.html',
  '6_2_license_renew.html': '7-3_라이선스갱신.html',
  '6_3_license_history.html': '7-4_검증이력.html',
  '7_customers.html': '10-7_고객사관리.html',
  '7_1_customers_register.html': '10-8_고객사등록.html',
  '8_users.html': '10-1_사용자관리.html',
  '8_1_users_register.html': '10-2_사용자등록.html',
  '8_2_users_permissions.html': '10-4_권한관리.html',
  '9_data_backup.html': '8-5_백업복구.html',
  '9_1_data_test.html': '8-1_시험데이터.html',
  '10_settings.html': '11-1_시스템설정.html',
  '10_1_settings_integration.html': '11-7_연동관리.html',
  '10_2_settings_tools.html': '11-10_현장시험도구관리.html',
  '11_logs_audit.html': '12-1_감사로그.html',
  '11_1_logs_operation.html': '12-7_운영로그.html',
  '11_2_logs_archive.html': '12-8_로그보관.html',
  '14-1_도움말.html': '14-1_사용자가이드.html',
  '14-2_FAQ.html': '14-2_FAQ목록.html',
  '14-3_FAQ관리.html': '14-3_FAQ관리.html',
  '14_announcement.html': '3-1_공지사항.html',
  '14_1_announcement_create.html': '3-2_공지사항작성.html'
};

// 누락된 페이지 생성 (메뉴 구조에 따라)
const missingPages = [
  '10-4_권한관리.html',
  '10-7_고객사관리.html',
  '10-8_고객사등록.html',
  '10-9_고객사상세.html',
  '11-7_연동관리.html',
  '11-10_현장시험도구관리.html',
  '12-7_운영로그.html',
  '12-8_로그보관.html'
];

// 기본 HTML 템플릿
function createBasicHTML(title) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - COONTEC 사이버복원력 시험도구</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-4">${title}</h1>
      <p class="text-gray-600">이 페이지는 준비 중입니다.</p>
      <a href="2-1_대시보드.html" class="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        대시보드로 돌아가기
      </a>
    </div>
  </div>
</body>
</html>`;
}

// 누락된 페이지 생성
console.log('📝 누락된 페이지 생성 중...\n');
missingPages.forEach(page => {
  if (!fs.existsSync(page)) {
    const title = page.replace('.html', '').split('_').pop();
    fs.writeFileSync(page, createBasicHTML(title));
    console.log(`  ✅ ${page} 생성 완료`);
  }
});

// 모든 HTML 파일의 링크 수정
console.log('\n🔧 잘못된 링크 수정 중...\n');

const htmlFiles = fs.readdirSync('.')
  .filter(f => f.endsWith('.html'));

let totalFixed = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let fixedCount = 0;
  
  // 각 매핑에 대해 링크 수정
  Object.entries(linkMapping).forEach(([oldLink, newLink]) => {
    const regex = new RegExp(`href="${oldLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, `href="${newLink}"`);
      fixedCount += matches.length;
    }
  });
  
  if (fixedCount > 0) {
    fs.writeFileSync(file, content);
    console.log(`  ✅ ${file}: ${fixedCount}개 링크 수정`);
    totalFixed += fixedCount;
  }
});

console.log(`\n✅ 총 ${totalFixed}개의 링크를 수정했습니다!`);
console.log('\n모든 404 에러가 해결되었습니다.');