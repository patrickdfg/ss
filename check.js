// 페이지의 ANSWERS와 답을 비교해 칸마다 완료 표시를 하고, 모두 맞으면 완료 칸을 보여 주는 파일입니다.
(() => {
  const norm = v => String(v || "").replace(/\s+/g, "");
  const valueOf = k => {
    const el = document.getElementById(k);
    if (el) return el.value;
    const r = document.querySelector('input[name="' + k + '"]:checked');
    return r ? r.value : "";
  };
  const sectionOf = k => (document.getElementById(k) || document.querySelector('[name="' + k + '"]')).closest("section");

  const groups = new Map();
  Object.keys(ANSWERS).forEach(k => {
    const s = sectionOf(k);
    if (!groups.has(s)) groups.set(s, []);
    groups.get(s).push(k);
  });
  groups.forEach((_, s) => s.querySelector("h2").insertAdjacentHTML("beforeend", '<span class="ok" hidden>✓ 완료</span>'));

  const done = document.createElement("div");
  done.id = "allDone";
  done.hidden = true;
  done.innerHTML = "🎉 정답을 모두 맞혔어요!<br><b>✓ 활동지 완료</b>";
  document.querySelector("footer").before(done);

  function check() {
    let all = true;
    groups.forEach((keys, s) => {
      const ok = keys.every(k => norm(valueOf(k)) === norm(ANSWERS[k]));
      s.querySelector(".ok").hidden = !ok;
      s.classList.toggle("solved", ok);
      all = all && ok;
    });
    done.hidden = !all;
  }
  ["input", "change", "click", "pointerup"].forEach(t => document.addEventListener(t, () => setTimeout(check)));
  check();
})();
