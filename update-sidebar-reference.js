const fs = require('fs');
const path = require('path');

// 처리할 HTML 파일 목록
const htmlFiles = fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.html') && !file.includes('test') && !file.includes('sidebar'));

let successCount = 0;
let errorCount = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  try {
    // 파일 읽기
    let content = fs.readFileSync(filePath, 'utf8');
    
    // sidebar-menu.js를 sidebar-menu-simple.js로 변경
    content = content.replace(/sidebar-menu\.js/g, 'sidebar-menu-simple.js');
    
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