import { supabase, isConfigured } from "./supabase";

async function safe(fn, fallback) {
  if (!isConfigured) return fallback;
  try {
    return await fn();
  } catch (e) {
    console.warn("[poster-card] 네트워크 오류:", e?.message || e);
    return fallback;
  }
}

function isLocalhost() {
  const h = window.location.hostname;
  return h === "localhost" || h === "127.0.0.1" || h === "[::1]";
}

export async function registerCard(card) {
  if (isLocalhost()) return { error: null, skipped: "local" };

  return safe(
    async () => {
      const { error } = await supabase.from("cards").upsert(
        {
          id: card.id,
          number: card.number,
          title: card.title,
          description: card.description,
          url: window.location.origin, // ← 배포 주소를 스스로 기록
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
      return { error };
    },
    { error: null }
  );
}

export async function fetchReactionCounts(cardId) {
  return safe(async () => {
    const { data, error } = await supabase
      .from("reactions")
      .select("emoji")
      .eq("card_id", cardId);

    if (error || !data) return {};
    return data.reduce((acc, row) => {
      acc[row.emoji] = (acc[row.emoji] || 0) + 1;
      return acc;
    }, {});
  }, {});
}

export async function addReaction(cardId, emoji) {
  return safe(
    async () => {
      const { error } = await supabase
        .from("reactions")
        .insert({ card_id: cardId, emoji });
      return { error };
    },
    { error: null }
  );
}

export async function fetchSecretDigit(number) {
  return safe(async () => {
    const { data, error } = await supabase
      .from("secrets")
      .select("digit")
      .eq("number", number)
      .maybeSingle();
    if (error || !data) return null;
    return data.digit;
  }, null);
}

export async function fetchOtherCards(myId) {
  return safe(async () => {
    const { data, error } = await supabase
      .from("cards")
      .select("id, number, title, description, url")
      .neq("id", myId)
      .order("number");

    if (error || !data) return [];
    return data;
  }, []);
}
