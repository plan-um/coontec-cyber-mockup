const fs = require('fs');
const path = require('path');

// 페이지별 콘텐츠 정의
const pageContents = {
  '7-5_요청할당.html': {
    title: '라이선스 요청할당',
    subtitle: '라이선스 할당 요청 관리',
    content: `
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold">할당 대기 요청</h2>
                <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm">
                  일괄 할당
                </button>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      <input type="checkbox" class="rounded">
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">요청번호</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">고객사</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">선박명</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">라이선스 유형</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">요청일</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">작업</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                      <input type="checkbox" class="rounded">
                    </td>
                    <td class="px-6 py-4 text-sm">REQ-2024-0315</td>
                    <td class="px-6 py-4 text-sm">현대중공업</td>
                    <td class="px-6 py-4 text-sm">한라호</td>
                    <td class="px-6 py-4 text-sm">
                      <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Enterprise</span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">2024-03-15</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">대기중</span>
                    </td>
                    <td class="px-6 py-4">
                      <button class="text-primary-600 hover:text-primary-700 text-sm">할당</button>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                      <input type="checkbox" class="rounded">
                    </td>
                    <td class="px-6 py-4 text-sm">REQ-2024-0314</td>
                    <td class="px-6 py-4 text-sm">삼성중공업</td>
                    <td class="px-6 py-4 text-sm">백두산호</td>
                    <td class="px-6 py-4 text-sm">
                      <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Standard</span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">2024-03-14</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">대기중</span>
                    </td>
                    <td class="px-6 py-4">
                      <button class="text-primary-600 hover:text-primary-700 text-sm">할당</button>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                      <input type="checkbox" class="rounded">
                    </td>
                    <td class="px-6 py-4 text-sm">REQ-2024-0313</td>
                    <td class="px-6 py-4 text-sm">대우조선해양</td>
                    <td class="px-6 py-4 text-sm">독도호</td>
                    <td class="px-6 py-4 text-sm">
                      <span class="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Premium</span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">2024-03-13</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">검토중</span>
                    </td>
                    <td class="px-6 py-4">
                      <button class="text-primary-600 hover:text-primary-700 text-sm">할당</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4">할당 통계</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">대기중</span>
                <span class="text-2xl font-bold text-yellow-600">12</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">검토중</span>
                <span class="text-2xl font-bold text-blue-600">5</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">할당완료</span>
                <span class="text-2xl font-bold text-green-600">28</span>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4">빠른 작업</h3>
            <div class="space-y-3">
              <button class="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm">
                새 요청 등록
              </button>
              <button class="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                할당 이력 조회
              </button>
              <button class="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                보고서 다운로드
              </button>
            </div>
          </div>
        </div>
      </div>
    `
  },
  '7-6_요청승인.html': {
    title: '라이선스 요청승인',
    subtitle: '라이선스 발급 요청 승인 관리',
    content: `
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">승인 대기 요청</h2>
            <div class="flex items-center gap-3">
              <select class="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option>전체 상태</option>
                <option>대기중</option>
                <option>검토중</option>
                <option>승인완료</option>
                <option>반려</option>
              </select>
              <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm">
                일괄 승인
              </button>
            </div>
          </div>
        </div>
        
        <div class="p-6">
          <div class="space-y-4">
            <div class="border rounded-lg p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="font-semibold">REQ-2024-0315</h3>
                    <span class="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">승인대기</span>
                    <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Enterprise</span>
                  </div>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span class="text-gray-500">고객사:</span>
                      <span class="ml-2 font-medium">현대중공업</span>
                    </div>
                    <div>
                      <span class="text-gray-500">선박명:</span>
                      <span class="ml-2 font-medium">한라호</span>
                    </div>
                    <div>
                      <span class="text-gray-500">IMO:</span>
                      <span class="ml-2 font-medium">9876543</span>
                    </div>
                    <div>
                      <span class="text-gray-500">요청일:</span>
                      <span class="ml-2 font-medium">2024-03-15</span>
                    </div>
                  </div>
                  <div class="mt-3 text-sm text-gray-600">
                    <p>요청 사유: 신규 선박 인증을 위한 Enterprise 라이선스 필요</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button class="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                    승인
                  </button>
                  <button class="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
                    반려
                  </button>
                  <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                    상세
                  </button>
                </div>
              </div>
            </div>

            <div class="border rounded-lg p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="font-semibold">REQ-2024-0314</h3>
                    <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">검토중</span>
                    <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Standard</span>
                  </div>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span class="text-gray-500">고객사:</span>
                      <span class="ml-2 font-medium">삼성중공업</span>
                    </div>
                    <div>
                      <span class="text-gray-500">선박명:</span>
                      <span class="ml-2 font-medium">백두산호</span>
                    </div>
                    <div>
                      <span class="text-gray-500">IMO:</span>
                      <span class="ml-2 font-medium">9876544</span>
                    </div>
                    <div>
                      <span class="text-gray-500">요청일:</span>
                      <span class="ml-2 font-medium">2024-03-14</span>
                    </div>
                  </div>
                  <div class="mt-3 text-sm text-gray-600">
                    <p>요청 사유: 라이선스 갱신 (기존 라이선스 만료 예정)</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button class="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                    승인
                  </button>
                  <button class="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
                    반려
                  </button>
                  <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                    상세
                  </button>
                </div>
              </div>
            </div>

            <div class="border rounded-lg p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="font-semibold">REQ-2024-0313</h3>
                    <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">승인완료</span>
                    <span class="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Premium</span>
                  </div>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span class="text-gray-500">고객사:</span>
                      <span class="ml-2 font-medium">대우조선해양</span>
                    </div>
                    <div>
                      <span class="text-gray-500">선박명:</span>
                      <span class="ml-2 font-medium">독도호</span>
                    </div>
                    <div>
                      <span class="text-gray-500">IMO:</span>
                      <span class="ml-2 font-medium">9876545</span>
                    </div>
                    <div>
                      <span class="text-gray-500">승인일:</span>
                      <span class="ml-2 font-medium">2024-03-13</span>
                    </div>
                  </div>
                  <div class="mt-3 text-sm text-gray-600">
                    <p>승인자: 관리자 / 라이선스 키: PREM-2024-0313-XXXX</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                    상세
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  '7-7_사용자할당.html': {
    title: '라이선스 사용자할당',
    subtitle: '라이선스 사용자 할당 관리',
    content: `
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b">
              <h2 class="text-lg font-semibold">라이선스별 사용자 할당</h2>
            </div>
            <div class="p-6">
              <div class="mb-4">
                <select class="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>라이선스 선택</option>
                  <option>ENT-2024-001 (한라호 - Enterprise)</option>
                  <option>STD-2024-002 (백두산호 - Standard)</option>
                  <option>PRM-2024-003 (독도호 - Premium)</option>
                </select>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="border rounded-lg p-4">
                  <h3 class="font-semibold mb-3">할당 가능 사용자</h3>
                  <div class="space-y-2 max-h-96 overflow-y-auto">
                    <label class="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input type="checkbox" class="mr-3">
                      <div>
                        <div class="font-medium text-sm">김선장</div>
                        <div class="text-xs text-gray-500">captain.kim@company.com</div>
                      </div>
                    </label>
                    <label class="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input type="checkbox" class="mr-3">
                      <div>
                        <div class="font-medium text-sm">이기관장</div>
                        <div class="text-xs text-gray-500">lee.engineer@company.com</div>
                      </div>
                    </label>
                    <label class="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input type="checkbox" class="mr-3">
                      <div>
                        <div class="font-medium text-sm">박검사관</div>
                        <div class="text-xs text-gray-500">park.inspector@company.com</div>
                      </div>
                    </label>
                    <label class="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input type="checkbox" class="mr-3">
                      <div>
                        <div class="font-medium text-sm">최엔지니어</div>
                        <div class="text-xs text-gray-500">choi.engineer@company.com</div>
                      </div>
                    </label>
                    <label class="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input type="checkbox" class="mr-3">
                      <div>
                        <div class="font-medium text-sm">정관리자</div>
                        <div class="text-xs text-gray-500">jung.admin@company.com</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div class="border rounded-lg p-4">
                  <h3 class="font-semibold mb-3">할당된 사용자 (3/10)</h3>
                  <div class="space-y-2 max-h-96 overflow-y-auto">
                    <div class="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <div>
                        <div class="font-medium text-sm">홍길동</div>
                        <div class="text-xs text-gray-500">hong@company.com</div>
                      </div>
                      <button class="text-red-600 hover:text-red-700 text-sm">제거</button>
                    </div>
                    <div class="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <div>
                        <div class="font-medium text-sm">김철수</div>
                        <div class="text-xs text-gray-500">kim@company.com</div>
                      </div>
                      <button class="text-red-600 hover:text-red-700 text-sm">제거</button>
                    </div>
                    <div class="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <div>
                        <div class="font-medium text-sm">이영희</div>
                        <div class="text-xs text-gray-500">lee@company.com</div>
                      </div>
                      <button class="text-red-600 hover:text-red-700 text-sm">제거</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex justify-center gap-3">
                <button class="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                  할당 저장
                </button>
                <button class="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4">라이선스 정보</h3>
            <dl class="space-y-3">
              <div>
                <dt class="text-sm text-gray-500">라이선스 키</dt>
                <dd class="font-medium">ENT-2024-001</dd>
              </div>
              <div>
                <dt class="text-sm text-gray-500">유형</dt>
                <dd class="font-medium">
                  <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Enterprise</span>
                </dd>
              </div>
              <div>
                <dt class="text-sm text-gray-500">최대 사용자</dt>
                <dd class="font-medium">10명</dd>
              </div>
              <div>
                <dt class="text-sm text-gray-500">할당된 사용자</dt>
                <dd class="font-medium text-primary-600">3명</dd>
              </div>
              <div>
                <dt class="text-sm text-gray-500">유효기간</dt>
                <dd class="font-medium">2024-03-15 ~ 2025-03-14</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    `
  },
  '7-9_오프라인인증.html': {
    title: '오프라인 인증',
    subtitle: '오프라인 환경 라이선스 인증',
    content: `
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b">
            <h2 class="text-lg font-semibold">오프라인 인증 프로세스</h2>
          </div>
          <div class="p-6">
            <div class="space-y-6">
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p class="text-sm text-blue-800">
                  오프라인 인증은 인터넷 연결이 없는 선박에서 라이선스를 활성화하기 위한 프로세스입니다.
                </p>
              </div>

              <div class="space-y-4">
                <div class="border rounded-lg p-4">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold mb-2">인증 요청 파일 생성</h3>
                      <p class="text-sm text-gray-600 mb-3">
                        선박의 시스템에서 인증 요청 파일을 생성합니다.
                      </p>
                      <div class="bg-gray-50 rounded p-3">
                        <label class="block text-sm font-medium mb-2">하드웨어 ID</label>
                        <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" 
                               value="HW-A1B2C3D4-E5F6G7H8" readonly>
                      </div>
                      <button class="mt-3 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm">
                        요청 파일 다운로드
                      </button>
                    </div>
                  </div>
                </div>

                <div class="border rounded-lg p-4">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold mb-2">인증 파일 업로드</h3>
                      <p class="text-sm text-gray-600 mb-3">
                        생성된 요청 파일을 온라인 시스템에 업로드합니다.
                      </p>
                      <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p class="mt-2 text-sm text-gray-600">
                          클릭하여 파일 선택 또는 드래그 앤 드롭
                        </p>
                        <input type="file" class="hidden">
                      </div>
                    </div>
                  </div>
                </div>

                <div class="border rounded-lg p-4">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                      3
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold mb-2">활성화 코드 생성</h3>
                      <p class="text-sm text-gray-600 mb-3">
                        시스템이 활성화 코드를 생성합니다.
                      </p>
                      <div class="bg-gray-50 rounded p-3">
                        <label class="block text-sm font-medium mb-2">활성화 코드</label>
                        <div class="flex gap-2">
                          <input type="text" class="flex-1 px-3 py-2 border border-gray-300 rounded-md font-mono" 
                                 value="XXXX-XXXX-XXXX-XXXX" readonly>
                          <button class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm">
                            복사
                          </button>
                        </div>
                      </div>
                      <button class="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
                        활성화 파일 다운로드
                      </button>
                    </div>
                  </div>
                </div>

                <div class="border rounded-lg p-4">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                      4
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold mb-2">선박 시스템 활성화</h3>
                      <p class="text-sm text-gray-600">
                        다운로드한 활성화 파일을 선박 시스템에 적용하여 라이선스를 활성화합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="border-t pt-6">
                <h3 class="font-semibold mb-3">최근 오프라인 인증 이력</h3>
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">선박명</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">하드웨어 ID</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">인증일</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-3 text-sm">한라호</td>
                        <td class="px-4 py-3 text-sm font-mono text-xs">HW-A1B2C3D4</td>
                        <td class="px-4 py-3 text-sm">2024-03-15</td>
                        <td class="px-4 py-3">
                          <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">활성화</span>
                        </td>
                      </tr>
                      <tr>
                        <td class="px-4 py-3 text-sm">백두산호</td>
                        <td class="px-4 py-3 text-sm font-mono text-xs">HW-E5F6G7H8</td>
                        <td class="px-4 py-3 text-sm">2024-03-14</td>
                        <td class="px-4 py-3">
                          <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">활성화</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  '8-1_시험데이터.html': {
    title: '시험데이터 관리',
    subtitle: '시험 데이터 조회 및 관리',
    content: `
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div class="lg:col-span-3">
          <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold">시험 데이터 목록</h2>
                <div class="flex items-center gap-3">
                  <select class="px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>전체 유형</option>
                    <option>스캔시험</option>
                    <option>부하시험</option>
                    <option>침투시험</option>
                  </select>
                  <input type="text" placeholder="검색..." 
                         class="px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm">
                    내보내기
                  </button>
                </div>
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">선박명</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">시험유형</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">시험일</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">데이터크기</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">작업</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm">TD-2024-0315</td>
                    <td class="px-6 py-4 text-sm font-medium">한라호</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">스캔시험</span>
                    </td>
                    <td class="px-6 py-4 text-sm">2024-03-15</td>
                    <td class="px-6 py-4 text-sm">2.3 GB</td>
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
                    <td class="px-6 py-4 text-sm">TD-2024-0314</td>
                    <td class="px-6 py-4 text-sm font-medium">백두산호</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">부하시험</span>
                    </td>
                    <td class="px-6 py-4 text-sm">2024-03-14</td>
                    <td class="px-6 py-4 text-sm">5.7 GB</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">진행중</span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">
                        <button class="text-primary-600 hover:text-primary-700 text-sm">조회</button>
                        <button class="text-gray-600 hover:text-gray-700 text-sm">다운로드</button>
                      </div>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm">TD-2024-0313</td>
                    <td class="px-6 py-4 text-sm font-medium">독도호</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">침투시험</span>
                    </td>
                    <td class="px-6 py-4 text-sm">2024-03-13</td>
                    <td class="px-6 py-4 text-sm">1.8 GB</td>
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
                    <td class="px-6 py-4 text-sm">TD-2024-0312</td>
                    <td class="px-6 py-4 text-sm font-medium">금강산호</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">스캔시험</span>
                    </td>
                    <td class="px-6 py-4 text-sm">2024-03-12</td>
                    <td class="px-6 py-4 text-sm">3.1 GB</td>
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
                </tbody>
              </table>
            </div>
            
            <div class="p-4 border-t">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">총 125개 항목 중 1-10 표시</span>
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
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4">저장소 현황</h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>사용량</span>
                  <span class="font-medium">324.5 GB / 1 TB</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-primary-600 h-2 rounded-full" style="width: 32.45%"></div>
                </div>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">스캔시험</span>
                  <span class="font-medium">125.3 GB</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">부하시험</span>
                  <span class="font-medium">156.7 GB</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">침투시험</span>
                  <span class="font-medium">42.5 GB</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold mb-4">데이터 정리</h3>
            <div class="space-y-3">
              <button class="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm text-left">
                오래된 데이터 보관
              </button>
              <button class="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm text-left">
                중복 데이터 제거
              </button>
              <button class="w-full px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 text-sm text-left">
                휴지통 비우기
              </button>
            </div>
          </div>
        </div>
      </div>
    `
  },
  '8-2_데이터조회.html': {
    title: '데이터 조회',
    subtitle: '시험 데이터 상세 조회',
    content: `
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">데이터 상세 조회</h2>
            <button onclick="window.history.back()" class="text-gray-600 hover:text-gray-800">
              ← 목록으로
            </button>
          </div>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2">
              <div class="space-y-6">
                <div>
                  <h3 class="font-semibold mb-3">기본 정보</h3>
                  <dl class="grid grid-cols-2 gap-4">
                    <div>
                      <dt class="text-sm text-gray-500">데이터 ID</dt>
                      <dd class="font-medium">TD-2024-0315</dd>
                    </div>
                    <div>
                      <dt class="text-sm text-gray-500">선박명</dt>
                      <dd class="font-medium">한라호</dd>
                    </div>
                    <div>
                      <dt class="text-sm text-gray-500">IMO 번호</dt>
                      <dd class="font-medium">9876543</dd>
                    </div>
                    <div>
                      <dt class="text-sm text-gray-500">시험 유형</dt>
                      <dd>
                        <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">스캔시험</span>
                      </dd>
                    </div>
                    <div>
                      <dt class="text-sm text-gray-500">시험일</dt>
                      <dd class="font-medium">2024-03-15 14:30</dd>
                    </div>
                    <div>
                      <dt class="text-sm text-gray-500">데이터 크기</dt>
                      <dd class="font-medium">2.3 GB</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 class="font-semibold mb-3">시험 결과 요약</h3>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <div class="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div class="text-2xl font-bold text-red-600">15</div>
                        <div class="text-sm text-gray-600">Critical</div>
                      </div>
                      <div>
                        <div class="text-2xl font-bold text-orange-600">28</div>
                        <div class="text-sm text-gray-600">High</div>
                      </div>
                      <div>
                        <div class="text-2xl font-bold text-yellow-600">45</div>
                        <div class="text-sm text-gray-600">Medium</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="font-semibold mb-3">데이터 파일 목록</h3>
                  <div class="border rounded-lg overflow-hidden">
                    <table class="w-full">
                      <thead class="bg-gray-50">
                        <tr>
                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">파일명</th>
                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">크기</th>
                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">유형</th>
                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">작업</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200">
                        <tr>
                          <td class="px-4 py-3 text-sm">scan_result_20240315.json</td>
                          <td class="px-4 py-3 text-sm">125 MB</td>
                          <td class="px-4 py-3 text-sm">JSON</td>
                          <td class="px-4 py-3">
                            <button class="text-primary-600 hover:text-primary-700 text-sm">다운로드</button>
                          </td>
                        </tr>
                        <tr>
                          <td class="px-4 py-3 text-sm">vulnerability_report.pdf</td>
                          <td class="px-4 py-3 text-sm">8.5 MB</td>
                          <td class="px-4 py-3 text-sm">PDF</td>
                          <td class="px-4 py-3">
                            <button class="text-primary-600 hover:text-primary-700 text-sm">다운로드</button>
                          </td>
                        </tr>
                        <tr>
                          <td class="px-4 py-3 text-sm">network_scan.pcap</td>
                          <td class="px-4 py-3 text-sm">2.1 GB</td>
                          <td class="px-4 py-3 text-sm">PCAP</td>
                          <td class="px-4 py-3">
                            <button class="text-primary-600 hover:text-primary-700 text-sm">다운로드</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 class="font-semibold mb-3">로그 데이터</h3>
                  <div class="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                    <pre>[2024-03-15 14:30:00] Starting network scan...
[2024-03-15 14:30:15] Discovered 45 active hosts
[2024-03-15 14:31:23] Port scan initiated on 192.168.1.1
[2024-03-15 14:32:45] Vulnerability scan started
[2024-03-15 14:45:12] Found critical vulnerability: CVE-2024-1234
[2024-03-15 15:02:33] Scan completed successfully
[2024-03-15 15:02:34] Generating report...</pre>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-6">
              <div class="bg-white border rounded-lg p-6">
                <h3 class="font-semibold mb-4">작업</h3>
                <div class="space-y-3">
                  <button class="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm">
                    전체 데이터 다운로드
                  </button>
                  <button class="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                    보고서 생성
                  </button>
                  <button class="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                    데이터 편집
                  </button>
                  <button class="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                    공유 링크 생성
                  </button>
                </div>
              </div>

              <div class="bg-white border rounded-lg p-6">
                <h3 class="font-semibold mb-4">메타데이터</h3>
                <dl class="space-y-3 text-sm">
                  <div>
                    <dt class="text-gray-500">생성자</dt>
                    <dd class="font-medium">김검사관</dd>
                  </div>
                  <div>
                    <dt class="text-gray-500">생성일</dt>
                    <dd class="font-medium">2024-03-15 15:03</dd>
                  </div>
                  <div>
                    <dt class="text-gray-500">최종 수정</dt>
                    <dd class="font-medium">2024-03-16 09:15</dd>
                  </div>
                  <div>
                    <dt class="text-gray-500">체크섬</dt>
                    <dd class="font-mono text-xs">SHA256: a1b2c3d4...</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  '8-4_데이터편집.html': {
    title: '데이터 편집',
    subtitle: '시험 데이터 수정 및 편집',
    content: `
      <div class="max-w-6xl mx-auto">
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold">데이터 편집 - TD-2024-0315</h2>
              <div class="flex items-center gap-3">
                <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm">
                  저장
                </button>
                <button class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                  취소
                </button>
              </div>
            </div>
          </div>
          
          <div class="p-6">
            <div class="space-y-6">
              <div>
                <h3 class="font-semibold mb-3">기본 정보 수정</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">선박명</label>
                    <input type="text" value="한라호" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">IMO 번호</label>
                    <input type="text" value="9876543" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">시험 유형</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option selected>스캔시험</option>
                      <option>부하시험</option>
                      <option>침투시험</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">시험일</label>
                    <input type="datetime-local" value="2024-03-15T14:30" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-md">
                  </div>
                </div>
              </div>

              <div>
                <h3 class="font-semibold mb-3">취약점 데이터 편집</h3>
                <div class="border rounded-lg overflow-hidden">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">CVE ID</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">심각도</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">영향 시스템</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">작업</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-3">
                          <input type="text" value="CVE-2024-1234" class="px-2 py-1 border border-gray-300 rounded text-sm">
                        </td>
                        <td class="px-4 py-3">
                          <select class="px-2 py-1 border border-gray-300 rounded text-sm">
                            <option selected>Critical</option>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                          </select>
                        </td>
                        <td class="px-4 py-3">
                          <input type="text" value="Bridge Network" class="px-2 py-1 border border-gray-300 rounded text-sm">
                        </td>
                        <td class="px-4 py-3">
                          <select class="px-2 py-1 border border-gray-300 rounded text-sm">
                            <option selected>미해결</option>
                            <option>해결중</option>
                            <option>해결완료</option>
                          </select>
                        </td>
                        <td class="px-4 py-3">
                          <button class="text-red-600 hover:text-red-700 text-sm">삭제</button>
                        </td>
                      </tr>
                      <tr>
                        <td class="px-4 py-3">
                          <input type="text" value="CVE-2024-5678" class="px-2 py-1 border border-gray-300 rounded text-sm">
                        </td>
                        <td class="px-4 py-3">
                          <select class="px-2 py-1 border border-gray-300 rounded text-sm">
                            <option>Critical</option>
                            <option selected>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                          </select>
                        </td>
                        <td class="px-4 py-3">
                          <input type="text" value="Engine Control" class="px-2 py-1 border border-gray-300 rounded text-sm">
                        </td>
                        <td class="px-4 py-3">
                          <select class="px-2 py-1 border border-gray-300 rounded text-sm">
                            <option>미해결</option>
                            <option selected>해결중</option>
                            <option>해결완료</option>
                          </select>
                        </td>
                        <td class="px-4 py-3">
                          <button class="text-red-600 hover:text-red-700 text-sm">삭제</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="p-3 bg-gray-50 border-t">
                    <button class="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                      + 취약점 추가
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="font-semibold mb-3">메모 및 비고</h3>
                <textarea rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="추가 메모나 비고사항을 입력하세요...">브릿지 네트워크 구간에서 발견된 취약점은 긴급 패치가 필요함. 엔진 제어 시스템은 현재 업데이트 진행 중.</textarea>
              </div>

              <div>
                <h3 class="font-semibold mb-3">첨부 파일</h3>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div class="text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p class="mt-2 text-sm text-gray-600">
                      클릭하여 파일 선택 또는 드래그 앤 드롭
                    </p>
                    <input type="file" multiple class="hidden">
                  </div>
                  <div class="mt-4 space-y-2">
                    <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span class="text-sm">additional_scan_20240316.json</span>
                      <button class="text-red-600 hover:text-red-700 text-sm">제거</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end gap-3 pt-6 border-t">
                <button class="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  미리보기
                </button>
                <button class="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                  변경사항 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  '8-5_백업복구.html': {
    title: '백업/복구 관리',
    subtitle: '시스템 데이터 백업 및 복구',
    content: `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b">
            <h2 class="text-lg font-semibold">백업 관리</h2>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium">다음 자동 백업</span>
                  <span class="text-sm text-blue-700">2024-03-17 02:00</span>
                </div>
                <div class="w-full bg-blue-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full animate-pulse" style="width: 65%"></div>
                </div>
              </div>

              <div>
                <h3 class="font-semibold mb-3">백업 설정</h3>
                <div class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">백업 주기</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>매일</option>
                      <option selected>매주</option>
                      <option>매월</option>
                      <option>수동</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">백업 시간</label>
                    <input type="time" value="02:00" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">백업 위치</label>
                    <input type="text" value="/backup/coontec/" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                  </div>
                  <div>
                    <label class="flex items-center">
                      <input type="checkbox" checked class="mr-2">
                      <span class="text-sm">백업 후 압축</span>
                    </label>
                  </div>
                  <div>
                    <label class="flex items-center">
                      <input type="checkbox" checked class="mr-2">
                      <span class="text-sm">암호화 사용</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="pt-4 border-t">
                <button class="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                  즉시 백업 실행
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b">
            <h2 class="text-lg font-semibold">복구 관리</h2>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div>
                <h3 class="font-semibold mb-3">백업 목록</h3>
                <div class="space-y-2 max-h-64 overflow-y-auto">
                  <div class="border rounded-lg p-3 hover:bg-gray-50">
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-medium text-sm">backup_20240316_0200.tar.gz</div>
                        <div class="text-xs text-gray-500">2024-03-16 02:00 | 15.3 GB</div>
                      </div>
                      <button class="text-primary-600 hover:text-primary-700 text-sm">복구</button>
                    </div>
                  </div>
                  <div class="border rounded-lg p-3 hover:bg-gray-50">
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-medium text-sm">backup_20240309_0200.tar.gz</div>
                        <div class="text-xs text-gray-500">2024-03-09 02:00 | 14.8 GB</div>
                      </div>
                      <button class="text-primary-600 hover:text-primary-700 text-sm">복구</button>
                    </div>
                  </div>
                  <div class="border rounded-lg p-3 hover:bg-gray-50">
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-medium text-sm">backup_20240302_0200.tar.gz</div>
                        <div class="text-xs text-gray-500">2024-03-02 02:00 | 14.2 GB</div>
                      </div>
                      <button class="text-primary-600 hover:text-primary-700 text-sm">복구</button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="font-semibold mb-3">복구 옵션</h3>
                <div class="space-y-3">
                  <label class="flex items-center">
                    <input type="radio" name="restore" value="full" checked class="mr-2">
                    <span class="text-sm">전체 복구</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="restore" value="data" class="mr-2">
                    <span class="text-sm">데이터만 복구</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="restore" value="config" class="mr-2">
                    <span class="text-sm">설정만 복구</span>
                  </label>
                </div>
              </div>

              <div class="pt-4 border-t">
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <svg class="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p class="mt-2 text-sm text-gray-600">백업 파일 업로드</p>
                  <input type="file" class="hidden">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 bg-white rounded-lg shadow">
        <div class="p-6 border-b">
          <h2 class="text-lg font-semibold">백업/복구 이력</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">작업</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">유형</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">파일명</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">크기</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">실행자</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">실행일시</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 text-sm">백업</td>
                <td class="px-6 py-4 text-sm">자동</td>
                <td class="px-6 py-4 text-sm">backup_20240316_0200.tar.gz</td>
                <td class="px-6 py-4 text-sm">15.3 GB</td>
                <td class="px-6 py-4 text-sm">시스템</td>
                <td class="px-6 py-4 text-sm">2024-03-16 02:00</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">성공</span>
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-sm">복구</td>
                <td class="px-6 py-4 text-sm">수동</td>
                <td class="px-6 py-4 text-sm">backup_20240309_0200.tar.gz</td>
                <td class="px-6 py-4 text-sm">14.8 GB</td>
                <td class="px-6 py-4 text-sm">관리자</td>
                <td class="px-6 py-4 text-sm">2024-03-15 10:30</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">성공</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  },
  '8-6_백업실행.html': {
    title: '백업 실행',
    subtitle: '시스템 백업 진행',
    content: `
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b">
            <h2 class="text-lg font-semibold">백업 실행 중</h2>
          </div>
          <div class="p-6">
            <div class="space-y-6">
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-semibold">백업 진행 상황</h3>
                  <span class="text-2xl font-bold text-blue-600">73%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div class="bg-blue-600 h-4 rounded-full transition-all duration-500" style="width: 73%"></div>
                </div>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-gray-600">예상 완료 시간:</span>
                    <span class="ml-2 font-medium">약 15분</span>
                  </div>
                  <div>
                    <span class="text-gray-600">처리된 데이터:</span>
                    <span class="ml-2 font-medium">11.2 GB / 15.3 GB</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="font-semibold mb-3">백업 항목</h3>
                <div class="space-y-2">
                  <div class="flex items-center justify-between p-3 bg-green-50 rounded">
                    <div class="flex items-center gap-3">
                      <svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span class="text-sm">데이터베이스</span>
                    </div>
                    <span class="text-sm text-gray-600">5.3 GB</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-green-50 rounded">
                    <div class="flex items-center gap-3">
                      <svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span class="text-sm">시험 데이터</span>
                    </div>
                    <span class="text-sm text-gray-600">4.8 GB</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-blue-50 rounded">
                    <div class="flex items-center gap-3">
                      <div class="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                      <span class="text-sm">보고서 파일</span>
                    </div>
                    <span class="text-sm text-gray-600">1.1 GB / 2.5 GB</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div class="flex items-center gap-3">
                      <div class="h-5 w-5 border-2 border-gray-400 rounded-full"></div>
                      <span class="text-sm text-gray-500">시스템 설정</span>
                    </div>
                    <span class="text-sm text-gray-500">대기중</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div class="flex items-center gap-3">
                      <div class="h-5 w-5 border-2 border-gray-400 rounded-full"></div>
                      <span class="text-sm text-gray-500">로그 파일</span>
                    </div>
                    <span class="text-sm text-gray-500">대기중</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="font-semibold mb-3">백업 로그</h3>
                <div class="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-xs h-48 overflow-y-auto">
                  <pre>[2024-03-17 02:00:00] 백업 프로세스 시작
[2024-03-17 02:00:01] 백업 디렉토리 생성: /backup/coontec/20240317_020000
[2024-03-17 02:00:02] 데이터베이스 백업 시작
[2024-03-17 02:05:15] 데이터베이스 백업 완료 (5.3 GB)
[2024-03-17 02:05:16] 시험 데이터 백업 시작
[2024-03-17 02:09:32] 시험 데이터 백업 완료 (4.8 GB)
[2024-03-17 02:09:33] 보고서 파일 백업 시작
[2024-03-17 02:11:45] 처리 중: report_20240315.pdf
[2024-03-17 02:11:48] 처리 중: report_20240314.pdf
...</pre>
                </div>
              </div>

              <div class="flex justify-between items-center pt-4 border-t">
                <button class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                  백그라운드 실행
                </button>
                <button class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
                  백업 중단
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  '8-7_복구실행.html': {
    title: '복구 실행',
    subtitle: '시스템 데이터 복구',
    content: `
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b">
            <h2 class="text-lg font-semibold">복구 실행</h2>
          </div>
          <div class="p-6">
            <div class="space-y-6">
              <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div class="flex items-start gap-3">
                  <svg class="h-5 w-5 text-yellow-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div class="text-sm text-yellow-800">
                    <p class="font-semibold mb-1">복구 전 주의사항</p>
                    <ul class="list-disc list-inside space-y-1">
                      <li>복구 작업은 현재 데이터를 덮어쓸 수 있습니다</li>
                      <li>복구 중에는 시스템 사용이 제한됩니다</li>
                      <li>복구 전 현재 상태의 백업을 권장합니다</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="font-semibold mb-3">복구할 백업 선택</h3>
                <div class="border rounded-lg p-4">
                  <div class="flex items-center justify-between mb-3">
                    <div>
                      <div class="font-medium">backup_20240316_0200.tar.gz</div>
                      <div class="text-sm text-gray-500">2024-03-16 02:00 | 15.3 GB</div>
                    </div>
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded text-sm">검증 완료</span>
                  </div>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span class="text-gray-600">백업 유형:</span>
                      <span class="ml-2 font-medium">전체 백업</span>
                    </div>
                    <div>
                      <span class="text-gray-600">포함 항목:</span>
                      <span class="ml-2 font-medium">데이터, 설정, 로그</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="font-semibold mb-3">복구 옵션</h3>
                <div class="space-y-3">
                  <label class="flex items-start gap-3">
                    <input type="checkbox" checked class="mt-1">
                    <div>
                      <div class="font-medium text-sm">데이터베이스</div>
                      <div class="text-xs text-gray-500">모든 데이터베이스 테이블 및 레코드</div>
                    </div>
                  </label>
                  <label class="flex items-start gap-3">
                    <input type="checkbox" checked class="mt-1">
                    <div>
                      <div class="font-medium text-sm">시험 데이터</div>
                      <div class="text-xs text-gray-500">스캔, 부하, 침투 시험 결과 파일</div>
                    </div>
                  </label>
                  <label class="flex items-start gap-3">
                    <input type="checkbox" checked class="mt-1">
                    <div>
                      <div class="font-medium text-sm">보고서</div>
                      <div class="text-xs text-gray-500">생성된 모든 보고서 파일</div>
                    </div>
                  </label>
                  <label class="flex items-start gap-3">
                    <input type="checkbox" class="mt-1">
                    <div>
                      <div class="font-medium text-sm">시스템 설정</div>
                      <div class="text-xs text-gray-500">설정 파일 및 환경 변수</div>
                    </div>
                  </label>
                  <label class="flex items-start gap-3">
                    <input type="checkbox" class="mt-1">
                    <div>
                      <div class="font-medium text-sm">로그 파일</div>
                      <div class="text-xs text-gray-500">시스템 및 감사 로그</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <h3 class="font-semibold mb-3">복구 전 확인</h3>
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="space-y-2 text-sm">
                    <div class="flex items-center gap-2">
                      <svg class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>백업 파일 무결성 검증 완료</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <svg class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>충분한 디스크 공간 확인 (필요: 15.3 GB, 가용: 245 GB)</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <svg class="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>현재 상태 자동 백업 완료</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end gap-3 pt-4 border-t">
                <button class="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  취소
                </button>
                <button class="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                  복구 시작
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
};

// HTML 템플릿
function generateHTML(pageKey, pageData) {
  return `<!DOCTYPE html>
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
}

// 파일 생성
Object.entries(pageContents).forEach(([filename, pageData]) => {
  const filePath = path.join(__dirname, filename);
  const html = generateHTML(filename, pageData);
  
  try {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ 생성 완료: ${filename}`);
  } catch (error) {
    console.error(`❌ 생성 실패 (${filename}):`, error.message);
  }
});

console.log('\n✅ 모든 페이지 재생성 완료!');