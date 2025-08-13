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
];

let successCount = 0;
let failCount = 0;

console.log('사이드바 가운데 정렬 문제 수정 시작...');
console.log('='.repeat(50));

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠ ${file} 파일이 존재하지 않습니다.`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. text-center 클래스 정의를 text-align: left로 변경
    content = content.replace(
      /\.text-center\s*{\s*text-align:\s*center;\s*}/g,
      '.text-center { text-align: left; }'
    );
    
    // 2. 사이드바 관련 추가 스타일 강화 (기존 스타일이 없는 경우에만 추가)
    if (!content.includes('/* 사이드바 가운데 정렬 완전 제거 */')) {
      const strongerAlignmentFix = `
    /* 사이드바 가운데 정렬 완전 제거 */
    aside * {
      text-align: left !important;
    }
    
    aside button,
    aside a,
    aside span,
    aside div {
      text-align: left !important;
      justify-content: flex-start !important;
    }
    
    aside .flex {
      justify-content: flex-start !important;
    }
    
    aside .justify-center {
      justify-content: flex-start !important;
    }
    
    aside .justify-between {
      justify-content: space-between !important;
    }
    
    aside .items-center {
      align-items: center !important;
    }
    
    /* 사이드바 내부의 모든 text-center 클래스 무효화 */
    aside .text-center {
      text-align: left !important;
    }
    
    /* 사이드바 버튼과 링크 내부 정렬 */
    aside button > div,
    aside a > div {
      justify-content: flex-start !important;
      text-align: left !important;
    }
    
    /* 사이드바 메뉴 아이템 간격 조정 */
    aside .gap-3 {
      gap: 0.75rem !important;
    }
    
    aside .gap-2 {
      gap: 0.5rem !important;
    }`;
      
      // </style> 태그 직전에 스타일 추가
      if (content.includes('</style>')) {
        content = content.replace('</style>', strongerAlignmentFix + '\n  </style>');
      }
    }
    
    // 3. 사이드바 HTML 내의 text-center 클래스 제거
    // aside 태그 내용 찾기
    const asideRegex = /<aside[^>]*>([\s\S]*?)<\/aside>/;
    const asideMatch = content.match(asideRegex);
    
    if (asideMatch) {
      let asideContent = asideMatch[0];
      // aside 내부의 text-center 클래스 제거
      asideContent = asideContent.replace(/\btext-center\b/g, 'text-left');
      // aside 내부의 justify-center를 justify-start로 변경
      asideContent = asideContent.replace(/\bjustify-center\b/g, 'justify-start');
      
      content = content.replace(asideMatch[0], asideContent);
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`  ✓ ${file} 수정 완료`);
    successCount++;
    
  } catch (error) {
    console.log(`  ✗ ${file} - 오류: ${error.message}`);
    failCount++;
  }
});

console.log('\n' + '='.repeat(50));
console.log(`완료: 성공 ${successCount}개, 실패 ${failCount}개`);