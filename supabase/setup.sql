-- ══════════════════════════════════════════════
-- 포스터 카드 · Supabase 초기 설정
-- SQL Editor 에 통째로 붙여넣고 Run 하세요.
-- ══════════════════════════════════════════════

-- ── 테이블 ──────────────────────────────────
create table if not exists cards (
  id          text primary key,
  number      int  not null,
  title       text,
  description text,
  url         text,
  updated_at  timestamptz default now()
);

create table if not exists reactions (
  id         bigserial primary key,
  card_id    text references cards(id) on delete cascade,
  emoji      text not null,
  created_at timestamptz default now()
);

create table if not exists secrets (
  number int primary key,
  digit  int not null
);

-- ── RLS (이걸 빼먹으면 아무것도 안 됩니다) ──
alter table cards     enable row level security;
alter table reactions enable row level security;
alter table secrets   enable row level security;

drop policy if exists "read cards"   on cards;
drop policy if exists "write cards"  on cards;
drop policy if exists "update cards" on cards;
create policy "read cards"   on cards for select using (true);
create policy "write cards"  on cards for insert with check (true);
create policy "update cards" on cards for update using (true) with check (true);

drop policy if exists "read reactions"  on reactions;
drop policy if exists "write reactions" on reactions;
create policy "read reactions"  on reactions for select using (true);
create policy "write reactions" on reactions for insert with check (true);

drop policy if exists "read secrets" on secrets;
create policy "read secrets" on secrets for select using (true);

-- ── 미션 숫자 (미션카드 문서의 숫자표와 일치해야 함) ──
insert into secrets (number, digit) values
  (1,4),(2,7),(3,1),(4,9),(5,3),(6,8),(7,2),
  (8,6),(9,5),(10,0),(11,7),(12,3),(13,9)
on conflict (number) do update set digit = excluded.digit;
