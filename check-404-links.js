const fs = require('fs');
const path = require('path');

// 모든 HTML 파일 가져오기
const htmlFiles = fs.readdirSync('.')
  .filter(f => f.endsWith('.html'))
  .sort();

console.log('📋 HTML 파일 목록 및 링크 확인\n');
console.log('='.repeat(60));

const brokenLinks = [];
const allLinks = new Set();

// 각 HTML 파일의 링크 확인
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // href 링크 추출
  const linkMatches = content.matchAll(/href="([^"]+\.html)"/g);
  
  for (const match of linkMatches) {
    const link = match[1];
    allLinks.add(link);
    
    // 링크된 파일이 존재하는지 확인
    if (!fs.existsSync(link)) {
      brokenLinks.push({
        file: file,
        link: link
      });
    }
  }
});

// 결과 출력
console.log('\n📁 존재하는 HTML 파일들:');
htmlFiles.forEach(file => {
  console.log(`  ✅ ${file}`);
});

console.log(`\n총 ${htmlFiles.length}개 파일\n`);

// 고유 링크 목록
console.log('🔗 참조되는 모든 링크:');
const sortedLinks = Array.from(allLinks).sort();
sortedLinks.forEach(link => {
  const exists = fs.existsSync(link);
  console.log(`  ${exists ? '✅' : '❌'} ${link}`);
});

// 깨진 링크 보고
if (brokenLinks.length > 0) {
  console.log('\n❌ 404 에러가 발생할 링크들:');
  console.log('='.repeat(60));
  
  const groupedLinks = {};
  brokenLinks.forEach(({ file, link }) => {
    if (!groupedLinks[link]) {
      groupedLinks[link] = [];
    }
    groupedLinks[link].push(file);
  });
  
  Object.entries(groupedLinks).forEach(([link, files]) => {
    console.log(`\n🔴 ${link}`);
    console.log('   참조하는 파일들:');
    files.forEach(file => {
      console.log(`   - ${file}`);
    });
  });
  
  console.log('\n해결 방법:');
  console.log('1. 누락된 페이지 생성');
  console.log('2. 잘못된 링크 수정');
} else {
  console.log('\n✅ 모든 링크가 정상적으로 작동합니다!');
}

// 누락된 필수 페이지 확인
const requiredPages = [
  '2-1_대시보드.html',
  '4-1_통합프로젝트.html',
  '5-1_스캔시험.html',
  '5-2_스캔설정.html',
  '5-3_시험실행.html',
  '5-4_스캔결과.html',
  '13-1_알림.html',
  '3-1_공지사항.html'
];

console.log('\n📌 필수 페이지 확인:');
requiredPages.forEach(page => {
  const exists = fs.existsSync(page);
  console.log(`  ${exists ? '✅' : '❌'} ${page}`);
});