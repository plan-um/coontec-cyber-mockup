const fs = require('fs');
const path = require('path');

// 인덱스에 등록된 웹 페이지들
const webPages = [
    "1-1_로그인.html", "1-2_비밀번호재설정.html", "1-3_e-class_SSO.html", "1-4_KR-DAON_SSO.html", "1-5_회원가입.html",
    "2-1_메인대시보드(관리자).html", "3-1_공지사항.html", "3-2_공지사항작성.html", "4-1_통합프로젝트.html", "4-4_관리영역.html",
    "5-1_스캔시험.html", "5-2_스캔설정.html", "5-3_시험실행_스캔.html", "5-4_스캔결과.html", "6-1_부하시험.html",
    "6-2_부하설정.html", "6-3_시험실행_부하.html", "6-4_부하결과.html", "7-1_발급관리.html", "7-2_라이선스발급.html",
    "7-3_라이선스갱신.html", "7-4_검증이력.html", "7-5_요청할당.html", "7-6_요청승인.html", "7-7_사용자할당.html",
    "9-1_보고서생성.html", "9-6_보고서출력.html", "9-7_보고서이력.html", "9-8_보고서조회.html", "9-9_보고서이력_버전관리.html",
    "10-1_사용자관리.html", "10-2_사용자등록.html", "10-3_사용자상세.html", "10-4_권한관리.html", "10-7_고객사관리.html",
    "10-8_고객사등록.html", "10-9_고객사상세.html", "11-1_시스템설정.html", "11-7_연동관리.html", "12-1_감사로그.html",
    "12-7_운영로그.html", "12-8_로그보관.html", "13-1_알림.html", "14-1_사용자가이드.html", "14-4_FAQ.html", "14-5_FAQ관리.html"
];

// 인덱스에 등록된 앱 페이지들
const appPages = [
    "Coontec_Cyber_App/1-1_로그인.html", "Coontec_Cyber_App/2-1_메인대시보드.html", "Coontec_Cyber_App/4-2_프로젝트생성.html",
    "Coontec_Cyber_App/4-3_프로젝트상세.html", "Coontec_Cyber_App/4-4_네트워크존.html", "Coontec_Cyber_App/4-6_선박목록.html",
    "Coontec_Cyber_App/5-2_시험설정.html", "Coontec_Cyber_App/5-3_시험실행.html", "Coontec_Cyber_App/5-4_시험결과.html",
    "Coontec_Cyber_App/6-2_시험설정.html", "Coontec_Cyber_App/6-3_시험실행.html", "Coontec_Cyber_App/6-4_시험결과.html",
    "Coontec_Cyber_App/6-6_사설보고서.html", "Coontec_Cyber_App/7-8_라이선스관리.html", "Coontec_Cyber_App/7-9_오프라인인증.html",
    "Coontec_Cyber_App/8-1_시험데이터.html", "Coontec_Cyber_App/8-2_데이터조회.html", "Coontec_Cyber_App/8-3_데이터분석.html",
    "Coontec_Cyber_App/8-4_데이터수정.html", "Coontec_Cyber_App/8-5_백업복구.html", "Coontec_Cyber_App/8-6_백업실행.html",
    "Coontec_Cyber_App/8-7_복구실행.html", "Coontec_Cyber_App/9-1_보고서생성.html", "Coontec_Cyber_App/9-2_프로젝트보고서.html",
    "Coontec_Cyber_App/9-3_시험보고서.html", "Coontec_Cyber_App/9-10_사설보고서.html", "Coontec_Cyber_App/9-11_보고서관리.html",
    "Coontec_Cyber_App/9-12_보고서출력.html", "Coontec_Cyber_App/10-10_사용자관리.html", "Coontec_Cyber_App/11-10_현장시험도구관리.html",
    "Coontec_Cyber_App/11-11_버전관리.html", "Coontec_Cyber_App/11-12_업데이트관리.html", "Coontec_Cyber_App/14-1_사용자가이드.html"
];

console.log('=== 파일 존재 여부 확인 ===\n');

let missingFiles = [];
let totalFiles = 0;
let existingFiles = 0;

// 웹 페이지 확인
console.log('📋 웹 페이지 확인:');
webPages.forEach(file => {
    totalFiles++;
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
        existingFiles++;
    } else {
        console.log(`❌ ${file} - 파일 없음`);
        missingFiles.push(file);
    }
});

console.log('\n📱 앱 페이지 확인:');
appPages.forEach(file => {
    totalFiles++;
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
        existingFiles++;
    } else {
        console.log(`❌ ${file} - 파일 없음`);
        missingFiles.push(file);
    }
});

console.log('\n=== 요약 ===');
console.log(`전체 파일: ${totalFiles}개`);
console.log(`존재하는 파일: ${existingFiles}개`);
console.log(`누락된 파일: ${missingFiles.length}개`);

if (missingFiles.length > 0) {
    console.log('\n🚨 누락된 파일 목록:');
    missingFiles.forEach(file => console.log(`  - ${file}`));
} else {
    console.log('\n🎉 모든 파일이 존재합니다!');
}