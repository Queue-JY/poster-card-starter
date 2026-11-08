-- ══════════════════════════════════════════════
-- 운영용 쿼리 모음
-- ══════════════════════════════════════════════

-- ① 테스트용 가짜 카드 넣기 (혼자 테스트할 때)
insert into cards (id, number, title, description, url) values
  ('test-a', 1, '테스트 A', '가짜 카드입니다', 'https://example.com'),
  ('test-b', 2, '테스트 B', '가짜 카드입니다', 'https://example.com'),
  ('test-c', 3, '테스트 C', '가짜 카드입니다', 'https://example.com'),
  ('test-d', 4, '테스트 D', '가짜 카드입니다', 'https://example.com'),
  ('test-e', 5, '테스트 E', '가짜 카드입니다', 'https://example.com'),
  ('test-f', 6, '테스트 F', '가짜 카드입니다', 'https://example.com')
on conflict (id) do nothing;

-- ② 세션 전날 초기화 (secrets 는 절대 지우지 말 것!)
-- delete from reactions;
-- delete from cards;

-- ③ 현재 등록된 카드 목록
select number, id, title, url, updated_at
from cards order by number;

-- ④ 반응 랭킹 (마무리 이벤트용)
select c.number, c.title, count(r.id) as 반응수
from cards c left join reactions r on r.card_id = c.id
group by c.number, c.title
order by 반응수 desc, c.number;

-- ⑤ 미션 정답 확인용 숫자표
select number, digit from secrets order by number;
