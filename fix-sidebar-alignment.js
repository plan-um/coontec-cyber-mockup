const fs = require('fs');
const path = require('path');

// 모든 HTML 파일 목록
const htmlFiles = [
  '1-1_login.html',
  '1-2_reset-password.html',
  '1-3_sso-eclass.html',
  '1-4_sso-krdaon.html',
  '1-5_signup.html',
  '2-1_dashboard.html',
  '3-1_announcement.html',
  '3-2_announcement-create.html',
  '4-1_projects.html',
  '5-1_test-scan.html',
  '5-2_test-scan-setup.html',
  '5-3_test-scan-execute.html',
  '5-4_test-scan-result.html',
  '5-6_test-scan-report.html',
  '6-1_test-load.html',
  '6-2_test-load-setup.html',
  '6-3_test-load-execute.html',
  '6-4_test-load-result.html',
  '6-6_test-load-report.html',
  '7-1_license-manage.html',
  '7-2_license-issue.html',
  '7-3_license-renew.html',
  '7-4_license-history.html',
  '7-5_license-request.html',
  '7-6_license-approve.html',
  '7-7_license-assign.html',
  '7-9_license-offline.html',
  '8-1_data-test.html',
  '8-2_data-query.html',
  '8-4_data-edit.html',
  '8-5_backup-recovery.html',
  '8-6_backup-execute.html',
  '8-7_recovery-execute.html',
  '9-1_report-generate.html',
  '9-6_report-output.html',
  '9-7_report-history.html',
  '9-8_report-search.html',
  '9-9_report-version.html',
  '9-10_report-private.html',
  '9-11_report-private-manage.html',
  '9-12_report-private-output.html',
  '10-1_users-manage.html',
  '10-2_users-register.html',
  '10-3_users-detail.html',
  '10-4_permission-manage.html',
  '10-7_customers-manage.html',
  '10-8_customers-register.html',
  '10-9_customers-detail.html',
  '11-1_system-settings.html',
  '11-7_integration-manage.html',
  '11-10_tools-manage.html',
  '12-1_audit-log.html',
  '12-7_operation-log.html',
  '12-8_log-archive.html',
  '13-1_notifications.html',
  '14-1_user-guide.html',
  '14-4_faq.html',
  '14-5_faq-manage.html'
];

// 정렬 수정 스타일
const alignmentFix = `
    /* 사이드바 텍스트 정렬 수정 */
    aside button {
      text-align: left !important;
    }
    
    aside a {
      text-align: left !important;
    }
    
    aside .flex {
      justify-content: flex-start !important;
    }
    
    aside .items-center {
      align-items: center !important;
    }
    
    /* 가운데 정렬 제거 */
    aside .text-center {
      text-align: left !important;
    }`;

let successCount = 0;
let failCount = 0;

console.log('사이드바 텍스트 정렬 수정 시작...');
console.log('='.repeat(50));

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠ ${file} 파일이 존재하지 않습니다.`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // </style> 태그 직전에 정렬 수정 스타일 추가
    if (content.includes('</style>')) {
      // 이미 수정된 경우 건너뛰기
      if (content.includes('/* 사이드바 텍스트 정렬 수정 */')) {
        console.log(`  ○ ${file} 이미 수정됨`);
        return;
      }
      
      // 첫 번째 </style> 태그 앞에 스타일 추가
      content = content.replace('</style>', alignmentFix + '\n  </style>');
      
      fs.writeFileSync(filePath, content);
      console.log(`  ✓ ${file} 수정 완료`);
      successCount++;
    } else {
      console.log(`  ✗ ${file} - <style> 태그를 찾을 수 없습니다.`);
      failCount++;
    }
  } catch (error) {
    console.log(`  ✗ ${file} - 오류: ${error.message}`);
    failCount++;
  }
});

console.log('\n' + '='.repeat(50));
console.log(`완료: 성공 ${successCount}개, 실패 ${failCount}개`);