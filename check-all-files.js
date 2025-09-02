const fs = require('fs');
const path = require('path');

// 모든 HTML 파일 가져오기
const htmlFiles = fs.readdirSync('.')
  .filter(f => f.endsWith('.html'))
  .sort();

console.log('🔍 모든 HTML 파일 검사 중...\n');
console.log('='.repeat(60));

const problematicFiles = [];
const fixedFiles = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // 문제 증상 확인
  const hasNextjsFontError = content.includes('/__nextjs_font/') || content.includes('../media/');
  const hasNoTailwindCDN = !content.includes('cdn.tailwindcss.com');
  const hasNextjsScripts = content.includes('/_next/static/chunks/');
  const isTooLarge = content.length > 100000; // 100KB 이상
  
  if (hasNextjsFontError || hasNoTailwindCDN || hasNextjsScripts || isTooLarge) {
    problematicFiles.push({
      file: file,
      issues: {
        nextjsFont: hasNextjsFontError,
        noTailwind: hasNoTailwindCDN,
        nextjsScripts: hasNextjsScripts,
        tooLarge: isTooLarge,
        size: (content.length / 1024).toFixed(1) + 'KB'
      }
    });
  } else {
    fixedFiles.push(file);
  }
});

console.log('\n✅ 정상 파일들:');
fixedFiles.forEach(file => {
  console.log(`  ✓ ${file}`);
});

if (problematicFiles.length > 0) {
  console.log('\n❌ 문제가 있는 파일들:');
  console.log('='.repeat(60));
  
  problematicFiles.forEach(({ file, issues }) => {
    console.log(`\n📁 ${file} (${issues.size})`);
    if (issues.nextjsFont) console.log('  ❌ Next.js 폰트 참조 오류');
    if (issues.noTailwind) console.log('  ❌ Tailwind CDN 누락');
    if (issues.nextjsScripts) console.log('  ❌ Next.js 스크립트 포함');
    if (issues.tooLarge) console.log('  ⚠️ 파일 크기 과다');
  });
  
  console.log('\n해결 방법:');
  console.log('1. Next.js 서버에서 다시 생성');
  console.log('2. 불필요한 스크립트 제거');
  console.log('3. Tailwind CDN 추가');
} else {
  console.log('\n✅ 모든 파일이 정상입니다!');
}

console.log(`\n총 ${htmlFiles.length}개 파일 중:`);
console.log(`  ✅ 정상: ${fixedFiles.length}개`);
console.log(`  ❌ 문제: ${problematicFiles.length}개`);