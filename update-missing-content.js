const fs = require('fs');
const path = require('path');

// 업데이트할 페이지들과 콘텐츠
const pageUpdates = {
  '9-10_사설보고서.html': {
    title: '사설보고서',
    subtitle: '사설 시험 보고서 관리',
    content: `
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold">사설 보고서 목록</h2>
                <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm">
                  새 보고서 생성
                </button>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">보고서 번호</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">선박명</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">시험 유형</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">작성일</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">작업</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm">PRP-2024-0315</td>
                    <td class="px-6 py-4 text-sm font-medium">한라호</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">스캔시험</span>
                    </td>
                    <td class="px-6 py-4 text-sm">2024-03-15</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">완료</span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">
                        <button class="text-primary-600 hover:text-primary-700 text-sm">조회</button>
                        <button class="text-gray-600 hover:text-gray-700 text-sm">다운로드</button>
                      </div>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm">PRP-2024-0314</td>
                    <td class="px-6 py-4 text-sm font-medium">백두산호</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">부하시험</span>
                    </td>
                    <td class="px-6 py-4 text-sm">2024-03-14</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">작성중</span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">
                        <button class="text-primary-600 hover:text-primary-700 text-sm">편집</button>
                        <button class="text-gray-600 hover:text-gray-700 text-sm">삭제</button>
                      </div>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm">PRP-2024-0313</td>
                    <td class="px-6 py-4 text-sm font-medium">독도호</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">종합시험</span>
                    </td>
                    <td class="px-6 py-4 text-sm">2024-03-13</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">검토중</span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">
                        <button class="text-primary-600 hover:text-primary-700 text-sm">조회</button>
                        <button class="text-gray-600 hover:text-gray-700 text-sm">승인</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4">보고서 템플릿</h3>
            <div class="space-y-3">
              <button class="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm text-left">
                스캔시험 보고서
              </button>
              <button class="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm text-left">
                부하시험 보고서
              </button>
              <button class="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm text-left">
                종합시험 보고서
              </button>
              <button class="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm text-left">
                사용자 정의 템플릿
              </button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4">보고서 통계</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">완료</span>
                <span class="text-2xl font-bold text-green-600">24</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">작성중</span>
                <span class="text-2xl font-bold text-yellow-600">5</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">검토중</span>
                <span class="text-2xl font-bold text-blue-600">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  '12-1_감사로그.html': {
    title: '감사 로그',
    subtitle: '시스템 감사 로그 조회',
    content: `
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">감사 로그</h2>
            <div class="flex items-center gap-3">
              <input type="date" class="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <span class="text-gray-500">~</span>
              <input type="date" class="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <select class="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option>전체 유형</option>
                <option>로그인</option>
                <option>데이터 접근</option>
                <option>설정 변경</option>
                <option>권한 변경</option>
              </select>
              <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm">
                조회
              </button>
              <button class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                내보내기
              </button>
            </div>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">시간</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">사용자</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP 주소</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">활동 유형</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상세 내용</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">결과</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm">2024-03-17 10:45:23</td>
                <td class="px-6 py-4 text-sm font-medium">김관리자</td>
                <td class="px-6 py-4 text-sm font-mono text-xs">192.168.1.105</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">로그인</span>
                </td>
                <td class="px-6 py-4 text-sm">시스템 관리자 로그인</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">성공</span>
                </td>
              </tr>
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm">2024-03-17 10:42:15</td>
                <td class="px-6 py-4 text-sm font-medium">이검사관</td>
                <td class="px-6 py-4 text-sm font-mono text-xs">192.168.1.220</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">데이터 접근</span>
                </td>
                <td class="px-6 py-4 text-sm">한라호 스캔 결과 조회</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">성공</span>
                </td>
              </tr>
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm">2024-03-17 10:38:45</td>
                <td class="px-6 py-4 text-sm font-medium">박엔지니어</td>
                <td class="px-6 py-4 text-sm font-mono text-xs">192.168.1.185</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">설정 변경</span>
                </td>
                <td class="px-6 py-4 text-sm">백업 주기 변경 (매일 → 매주)</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">성공</span>
                </td>
              </tr>
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm">2024-03-17 10:35:12</td>
                <td class="px-6 py-4 text-sm font-medium">최관리자</td>
                <td class="px-6 py-4 text-sm font-mono text-xs">192.168.1.105</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">권한 변경</span>
                </td>
                <td class="px-6 py-4 text-sm">사용자 '홍길동' 권한 승격</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">성공</span>
                </td>
              </tr>
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm">2024-03-17 10:30:55</td>
                <td class="px-6 py-4 text-sm font-medium">unknown</td>
                <td class="px-6 py-4 text-sm font-mono text-xs">203.247.50.123</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">로그인 시도</span>
                </td>
                <td class="px-6 py-4 text-sm">잘못된 비밀번호 입력 (3회)</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">실패</span>
                </td>
              </tr>
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm">2024-03-17 10:28:33</td>
                <td class="px-6 py-4 text-sm font-medium">시스템</td>
                <td class="px-6 py-4 text-sm font-mono text-xs">127.0.0.1</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">시스템</span>
                </td>
                <td class="px-6 py-4 text-sm">자동 백업 시작</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">성공</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="p-4 border-t">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">총 1,234개 항목</span>
            <div class="flex items-center gap-2">
              <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">이전</button>
              <button class="px-3 py-1 bg-primary-600 text-white rounded text-sm">1</button>
              <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">2</button>
              <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">3</button>
              <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">다음</button>
            </div>
          </div>
        </div>
      </div>
    `
  },
  '12-7_운영로그.html': {
    title: '운영 로그',
    subtitle: '시스템 운영 로그 관리',
    content: `
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div class="lg:col-span-3">
          <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold">운영 로그</h2>
                <div class="flex items-center gap-3">
                  <select class="px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>전체 레벨</option>
                    <option>ERROR</option>
                    <option>WARN</option>
                    <option>INFO</option>
                    <option>DEBUG</option>
                  </select>
                  <input type="text" placeholder="검색..." 
                         class="px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm">
                    필터
                  </button>
                </div>
              </div>
            </div>
            
            <div class="p-6">
              <div class="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-xs overflow-x-auto h-96 overflow-y-auto">
                <pre>[2024-03-17 10:45:23.456] [INFO] Application started successfully
[2024-03-17 10:45:24.123] [INFO] Database connection established
[2024-03-17 10:45:24.567] [INFO] Loading configuration from /etc/coontec/config.yml
[2024-03-17 10:45:25.234] [INFO] Starting HTTP server on port 3000
[2024-03-17 10:45:25.789] [INFO] Server listening on http://0.0.0.0:3000
[2024-03-17 10:45:30.123] [INFO] User authentication successful: kim@coontec.com
[2024-03-17 10:45:35.456] [INFO] Starting scan test for vessel: Halla-ho
[2024-03-17 10:45:36.789] [DEBUG] Initializing network scanner module
[2024-03-17 10:45:37.012] [DEBUG] Discovering hosts in subnet 192.168.1.0/24
[2024-03-17 10:45:45.345] [INFO] Found 45 active hosts
[2024-03-17 10:45:50.678] [WARN] High CPU usage detected: 85%
[2024-03-17 10:45:55.901] [INFO] Starting vulnerability scan
[2024-03-17 10:46:10.234] [ERROR] Failed to connect to host 192.168.1.105: Connection timeout
[2024-03-17 10:46:10.567] [ERROR] Stack trace:
    at Scanner.connect (/app/scanner.js:145:15)
    at async Scanner.scan (/app/scanner.js:78:9)
    at async TestRunner.run (/app/test-runner.js:234:12)
[2024-03-17 10:46:11.890] [INFO] Retrying connection to 192.168.1.105
[2024-03-17 10:46:12.123] [INFO] Connection successful on retry
[2024-03-17 10:46:15.456] [INFO] Scan completed: 15 vulnerabilities found
[2024-03-17 10:46:20.789] [INFO] Generating report for scan ID: SCAN-2024-0317-001
[2024-03-17 10:46:25.012] [INFO] Report generated successfully
[2024-03-17 10:46:30.345] [INFO] Backup process initiated
[2024-03-17 10:46:35.678] [DEBUG] Backing up database...
[2024-03-17 10:46:40.901] [DEBUG] Backing up test data...
[2024-03-17 10:46:45.234] [INFO] Backup completed successfully
[2024-03-17 10:46:50.567] [WARN] Low disk space warning: 15% remaining
[2024-03-17 10:46:55.890] [INFO] Cleaning up temporary files
[2024-03-17 10:47:00.123] [INFO] Cleanup completed, freed 2.3 GB</pre>
              </div>
            </div>
            
            <div class="p-4 border-t">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <button class="px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                    로그 지우기
                  </button>
                  <button class="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50">
                    다운로드
                  </button>
                </div>
                <div class="text-sm text-gray-600">
                  자동 새로고침: <span class="font-medium">5초</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4">로그 레벨 통계</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span class="text-sm">ERROR</span>
                </div>
                <span class="font-medium">23</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span class="text-sm">WARN</span>
                </div>
                <span class="font-medium">45</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span class="text-sm">INFO</span>
                </div>
                <span class="font-medium">892</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span class="text-sm">DEBUG</span>
                </div>
                <span class="font-medium">1,543</span>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4">실시간 모니터링</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">CPU 사용률</span>
                <span class="font-medium">42%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-600 h-2 rounded-full" style="width: 42%"></div>
              </div>
              
              <div class="flex justify-between items-center mt-4">
                <span class="text-sm text-gray-600">메모리 사용률</span>
                <span class="font-medium">68%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-yellow-600 h-2 rounded-full" style="width: 68%"></div>
              </div>
              
              <div class="flex justify-between items-center mt-4">
                <span class="text-sm text-gray-600">디스크 사용률</span>
                <span class="font-medium">85%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-red-600 h-2 rounded-full" style="width: 85%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  '14-1_사용자가이드.html': {
    title: '사용자 가이드',
    subtitle: '시스템 사용 안내',
    content: `
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div class="lg:col-span-3">
          <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b">
              <h2 class="text-lg font-semibold">사용자 가이드</h2>
            </div>
            <div class="p-6">
              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3">시작하기</h3>
                  <div class="space-y-4">
                    <div class="border-l-4 border-primary-600 pl-4">
                      <h4 class="font-medium mb-2">1. 시스템 로그인</h4>
                      <p class="text-sm text-gray-600">
                        COONTEC 사이버복원력 시험도구에 접속하려면 발급받은 계정 정보로 로그인하세요.
                        SSO(Single Sign-On)를 지원하는 경우 해당 버튼을 클릭하여 로그인할 수 있습니다.
                      </p>
                    </div>
                    
                    <div class="border-l-4 border-primary-600 pl-4">
                      <h4 class="font-medium mb-2">2. 프로젝트 생성</h4>
                      <p class="text-sm text-gray-600">
                        새로운 선박의 사이버복원력 시험을 시작하려면 프로젝트를 생성해야 합니다.
                        프로젝트 관리 메뉴에서 '새 프로젝트' 버튼을 클릭하고 선박 정보를 입력하세요.
                      </p>
                    </div>
                    
                    <div class="border-l-4 border-primary-600 pl-4">
                      <h4 class="font-medium mb-2">3. 시험 설정</h4>
                      <p class="text-sm text-gray-600">
                        스캔시험 또는 부하시험을 선택하고 시험 범위와 파라미터를 설정합니다.
                        템플릿을 사용하면 빠르게 설정을 완료할 수 있습니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">주요 기능</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="border rounded-lg p-4">
                      <h4 class="font-medium mb-2 flex items-center gap-2">
                        <svg class="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        스캔시험
                      </h4>
                      <p class="text-sm text-gray-600">
                        네트워크 취약점 스캔, 포트 스캔, 서비스 탐지 등을 수행합니다.
                      </p>
                    </div>
                    
                    <div class="border rounded-lg p-4">
                      <h4 class="font-medium mb-2 flex items-center gap-2">
                        <svg class="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        부하시험
                      </h4>
                      <p class="text-sm text-gray-600">
                        시스템 성능 테스트, 스트레스 테스트, 부하 분산 테스트를 진행합니다.
                      </p>
                    </div>
                    
                    <div class="border rounded-lg p-4">
                      <h4 class="font-medium mb-2 flex items-center gap-2">
                        <svg class="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m3-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v7m3-2h6" />
                        </svg>
                        보고서 생성
                      </h4>
                      <p class="text-sm text-gray-600">
                        시험 결과를 바탕으로 상세 보고서를 자동 생성합니다.
                      </p>
                    </div>
                    
                    <div class="border rounded-lg p-4">
                      <h4 class="font-medium mb-2 flex items-center gap-2">
                        <svg class="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        라이선스 관리
                      </h4>
                      <p class="text-sm text-gray-600">
                        라이선스 발급, 갱신, 사용자 할당을 관리합니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3">FAQ</h3>
                  <div class="space-y-3">
                    <details class="border rounded-lg p-4">
                      <summary class="font-medium cursor-pointer">시험 실행 중 오류가 발생했어요</summary>
                      <p class="mt-3 text-sm text-gray-600">
                        네트워크 연결 상태를 확인하고, 대상 시스템의 방화벽 설정을 검토하세요.
                        문제가 지속되면 운영 로그를 확인하여 상세 오류 내용을 파악할 수 있습니다.
                      </p>
                    </details>
                    
                    <details class="border rounded-lg p-4">
                      <summary class="font-medium cursor-pointer">보고서를 PDF로 내보낼 수 있나요?</summary>
                      <p class="mt-3 text-sm text-gray-600">
                        네, 가능합니다. 보고서 상세 페이지에서 '내보내기' 버튼을 클릭하고
                        PDF 형식을 선택하면 다운로드할 수 있습니다.
                      </p>
                    </details>
                    
                    <details class="border rounded-lg p-4">
                      <summary class="font-medium cursor-pointer">라이선스가 만료되면 어떻게 되나요?</summary>
                      <p class="mt-3 text-sm text-gray-600">
                        라이선스가 만료되면 새로운 시험을 시작할 수 없습니다.
                        기존 데이터는 조회 가능하며, 라이선스 갱신 후 모든 기능을 사용할 수 있습니다.
                      </p>
                    </details>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4">빠른 링크</h3>
            <div class="space-y-3">
              <a href="#" class="flex items-center gap-2 text-primary-600 hover:text-primary-700">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span class="text-sm">사용자 매뉴얼 (PDF)</span>
              </a>
              <a href="#" class="flex items-center gap-2 text-primary-600 hover:text-primary-700">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span class="text-sm">비디오 튜토리얼</span>
              </a>
              <a href="#" class="flex items-center gap-2 text-primary-600 hover:text-primary-700">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm">자주 묻는 질문</span>
              </a>
              <a href="#" class="flex items-center gap-2 text-primary-600 hover:text-primary-700">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="text-sm">기술 지원 문의</span>
              </a>
            </div>
          </div>

          <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-medium text-blue-900 mb-2">도움이 필요하신가요?</h4>
            <p class="text-sm text-blue-700 mb-3">
              기술 지원팀이 도와드리겠습니다.
            </p>
            <div class="space-y-2 text-sm">
              <div class="flex items-center gap-2">
                <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>02-1234-5678</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@coontec.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  '14-4_FAQ.html': {
    title: 'FAQ',
    subtitle: '자주 묻는 질문',
    content: `
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold">자주 묻는 질문</h2>
              <div class="flex items-center gap-3">
                <input type="text" placeholder="질문 검색..." 
                       class="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <select class="px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>전체 카테고리</option>
                  <option>시스템 사용</option>
                  <option>시험 관련</option>
                  <option>라이선스</option>
                  <option>기술 문제</option>
                </select>
              </div>
            </div>
          </div>
          
          <div class="p-6">
            <div class="space-y-4">
              <div class="border rounded-lg">
                <details class="group">
                  <summary class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                    <div class="flex items-start gap-3">
                      <span class="flex-shrink-0 text-primary-600 font-medium">Q</span>
                      <span class="font-medium">COONTEC 사이버복원력 시험도구는 어떤 시스템인가요?</span>
                    </div>
                    <svg class="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div class="px-4 pb-4">
                    <div class="flex items-start gap-3 pt-2">
                      <span class="flex-shrink-0 text-green-600 font-medium">A</span>
                      <div class="text-gray-600">
                        <p>COONTEC 사이버복원력 시험도구는 선박의 사이버 보안 복원력을 평가하고 인증하기 위한 통합 관리 시스템입니다.</p>
                        <p class="mt-2">주요 기능으로는:</p>
                        <ul class="list-disc list-inside mt-2 space-y-1">
                          <li>네트워크 취약점 스캔 및 분석</li>
                          <li>시스템 부하 테스트 및 성능 평가</li>
                          <li>자동화된 보고서 생성</li>
                          <li>라이선스 관리 및 사용자 인증</li>
                          <li>실시간 모니터링 및 알림</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </details>
              </div>

              <div class="border rounded-lg">
                <details class="group">
                  <summary class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                    <div class="flex items-start gap-3">
                      <span class="flex-shrink-0 text-primary-600 font-medium">Q</span>
                      <span class="font-medium">스캔시험과 부하시험의 차이점은 무엇인가요?</span>
                    </div>
                    <svg class="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div class="px-4 pb-4">
                    <div class="flex items-start gap-3 pt-2">
                      <span class="flex-shrink-0 text-green-600 font-medium">A</span>
                      <div class="text-gray-600">
                        <p><strong>스캔시험:</strong></p>
                        <ul class="list-disc list-inside mt-2 space-y-1">
                          <li>네트워크 및 시스템의 보안 취약점을 탐지</li>
                          <li>포트 스캔, 서비스 탐지, 취약점 분석 수행</li>
                          <li>CVE 데이터베이스 기반 취약점 매칭</li>
                        </ul>
                        <p class="mt-3"><strong>부하시험:</strong></p>
                        <ul class="list-disc list-inside mt-2 space-y-1">
                          <li>시스템의 성능과 안정성을 평가</li>
                          <li>동시 사용자 처리 능력 테스트</li>
                          <li>스트레스 상황에서의 시스템 반응 분석</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </details>
              </div>

              <div class="border rounded-lg">
                <details class="group">
                  <summary class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                    <div class="flex items-start gap-3">
                      <span class="flex-shrink-0 text-primary-600 font-medium">Q</span>
                      <span class="font-medium">라이선스는 어떻게 발급받을 수 있나요?</span>
                    </div>
                    <svg class="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div class="px-4 pb-4">
                    <div class="flex items-start gap-3 pt-2">
                      <span class="flex-shrink-0 text-green-600 font-medium">A</span>
                      <div class="text-gray-600">
                        <p>라이선스 발급 절차:</p>
                        <ol class="list-decimal list-inside mt-2 space-y-2">
                          <li>라이선스 메뉴에서 '라이선스 발급' 선택</li>
                          <li>필요한 라이선스 유형 선택 (Standard/Enterprise/Premium)</li>
                          <li>선박 정보 및 사용자 정보 입력</li>
                          <li>결제 정보 확인 및 승인</li>
                          <li>라이선스 키 발급 및 활성화</li>
                        </ol>
                        <p class="mt-3">오프라인 환경의 경우 '오프라인 인증' 기능을 사용할 수 있습니다.</p>
                      </div>
                    </div>
                  </div>
                </details>
              </div>

              <div class="border rounded-lg">
                <details class="group">
                  <summary class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                    <div class="flex items-start gap-3">
                      <span class="flex-shrink-0 text-primary-600 font-medium">Q</span>
                      <span class="font-medium">시험 중 오류가 발생하면 어떻게 해야 하나요?</span>
                    </div>
                    <svg class="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div class="px-4 pb-4">
                    <div class="flex items-start gap-3 pt-2">
                      <span class="flex-shrink-0 text-green-600 font-medium">A</span>
                      <div class="text-gray-600">
                        <p>시험 중 오류 발생 시 다음 단계를 따라주세요:</p>
                        <ol class="list-decimal list-inside mt-2 space-y-2">
                          <li>운영 로그에서 상세 오류 메시지 확인</li>
                          <li>네트워크 연결 상태 점검</li>
                          <li>대상 시스템의 방화벽 설정 확인</li>
                          <li>시험 설정 파라미터 재검토</li>
                          <li>문제 지속 시 기술 지원팀 문의 (support@coontec.com)</li>
                        </ol>
                        <p class="mt-3">시험 데이터는 자동 저장되므로 중단된 지점부터 재개할 수 있습니다.</p>
                      </div>
                    </div>
                  </div>
                </details>
              </div>

              <div class="border rounded-lg">
                <details class="group">
                  <summary class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                    <div class="flex items-start gap-3">
                      <span class="flex-shrink-0 text-primary-600 font-medium">Q</span>
                      <span class="font-medium">보고서를 커스터마이징할 수 있나요?</span>
                    </div>
                    <svg class="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div class="px-4 pb-4">
                    <div class="flex items-start gap-3 pt-2">
                      <span class="flex-shrink-0 text-green-600 font-medium">A</span>
                      <div class="text-gray-600">
                        <p>네, 보고서는 다양한 방식으로 커스터마이징 가능합니다:</p>
                        <ul class="list-disc list-inside mt-2 space-y-1">
                          <li>템플릿 선택 및 수정</li>
                          <li>로고 및 회사 정보 추가</li>
                          <li>섹션별 포함/제외 설정</li>
                          <li>차트 및 그래프 스타일 변경</li>
                          <li>다국어 지원 (한국어/영어)</li>
                        </ul>
                        <p class="mt-3">사설 보고서 기능을 통해 완전히 맞춤형 보고서도 작성할 수 있습니다.</p>
                      </div>
                    </div>
                  </div>
                </details>
              </div>

              <div class="border rounded-lg">
                <details class="group">
                  <summary class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                    <div class="flex items-start gap-3">
                      <span class="flex-shrink-0 text-primary-600 font-medium">Q</span>
                      <span class="font-medium">데이터 백업은 어떻게 하나요?</span>
                    </div>
                    <svg class="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div class="px-4 pb-4">
                    <div class="flex items-start gap-3 pt-2">
                      <span class="flex-shrink-0 text-green-600 font-medium">A</span>
                      <div class="text-gray-600">
                        <p>데이터 백업 옵션:</p>
                        <ul class="list-disc list-inside mt-2 space-y-1">
                          <li><strong>자동 백업:</strong> 매일/매주/매월 주기로 자동 실행</li>
                          <li><strong>수동 백업:</strong> 데이터 관리 > 백업/복구에서 즉시 실행</li>
                          <li><strong>선택적 백업:</strong> 특정 프로젝트나 데이터만 선택하여 백업</li>
                        </ul>
                        <p class="mt-3">백업 파일은 암호화되어 안전하게 저장되며, 필요시 특정 시점으로 복구할 수 있습니다.</p>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 bg-gray-50 rounded-lg p-6">
          <h3 class="text-lg font-semibold mb-4">추가 도움이 필요하신가요?</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="#" class="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <svg class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <div>
                <div class="font-medium">사용자 매뉴얼</div>
                <div class="text-sm text-gray-600">상세 가이드 문서</div>
              </div>
            </a>
            
            <a href="#" class="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <svg class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <div class="font-medium">기술 지원</div>
                <div class="text-sm text-gray-600">02-1234-5678</div>
              </div>
            </a>
            
            <a href="#" class="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <svg class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <div class="font-medium">이메일 문의</div>
                <div class="text-sm text-gray-600">support@coontec.com</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    `
  }
};

// 각 파일 업데이트
Object.entries(pageUpdates).forEach(([filename, pageData]) => {
  const filePath = path.join(__dirname, filename);
  
  try {
    // 파일이 존재하는지 확인
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  파일 없음: ${filename} - 새로 생성합니다.`);
    }
    
    // HTML 템플릿 생성
    const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>COONTEC 사이버복원력 시험도구</title>
  <link rel="icon" href="/favicon.ico?favicon.45db1c09.ico" sizes="256x256" type="image/x-icon">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .text-primary-600 { color: #2563eb; }
    .bg-primary-600 { background-color: #2563eb; }
    .hover\\:text-primary-600:hover { color: #2563eb; }
    .hover\\:bg-primary-700:hover { background-color: #1d4ed8; }
    .radio-group { display: flex; flex-wrap: wrap; gap: 0.75rem; }
    .radio-item { display: flex; align-items: center; padding: 0.5rem 1rem; }
  </style>
</head>
<body>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full border-b bg-white">
      <div class="flex h-16 items-center px-4">
        <div class="flex items-center gap-6">
          <button class="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu h-6 w-6">
              <path d="M4 12h16"></path>
              <path d="M4 18h16"></path>
              <path d="M4 6h16"></path>
            </svg>
          </button>
          <a class="flex items-center gap-2" href="2-1_대시보드.html">
            <span class="text-xl font-bold text-primary-600">COONTEC</span>
          </a>
          <nav class="hidden md:flex items-center gap-6">
            <a class="text-sm font-medium hover:text-primary-600" href="2-1_대시보드.html">대시보드</a>
            <a class="text-sm font-medium hover:text-primary-600" href="4-1_통합프로젝트.html">프로젝트 & 시험</a>
          </nav>
        </div>
        <div class="ml-auto flex items-center gap-4">
          <div class="relative">
            <button class="flex items-center gap-1 text-sm hover:text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe h-4 w-4">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                <path d="M2 12h20"></path>
              </svg>
              <span>한국어</span>
            </button>
          </div>
          <a class="relative hover:text-primary-600" href="13-1_알림.html">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell h-5 w-5">
              <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
              <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
            </svg>
            <span class="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </a>
          <div class="relative">
            <button class="flex items-center gap-2 hover:text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user h-5 w-5">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside class="hidden md:flex w-64 flex-col border-r bg-gray-50">
        <!-- 사이드바는 sidebar-menu.js가 동적으로 생성 -->
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6 bg-gray-50">
        <div class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">${pageData.title}</h1>
            <p class="text-gray-600 mt-2">${pageData.subtitle}</p>
          </div>
          ${pageData.content}
        </div>
      </main>
    </div>
  </div>

  <script src="sidebar-menu.js"></script>
</body>
</html>`;
    
    // 파일 저장
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ 업데이트 완료: ${filename}`);
    
  } catch (error) {
    console.error(`❌ 오류 발생 (${filename}):`, error.message);
  }
});

console.log('\n📊 페이지 콘텐츠 업데이트 완료!');