// 활동지 주차 목록과 머리말의 활동지 고르기 상자를 만드는 파일입니다. 새 활동지는 맨 위에 한 줄 추가합니다.
const WEEKS = [
  {date: "2026-11-29", title: "화복의 징조를 깨달아라"},
  {date: "2026-11-22", title: "내게 배워라, 달고 오묘한 말씀"},
];

if (typeof document !== "undefined") {
  const sel = document.querySelector("#weekSel");
  if (sel) {
    const here = location.pathname.split("/").pop().replace(".html", "");
    WEEKS.forEach(w => {
      const [y, m, d] = w.date.split("-");
      sel.add(new Option(+m + "월 " + +d + "일 · " + w.title, w.date, false, w.date === here));
    });
    sel.addEventListener("change", () => { location.href = sel.value + ".html"; });
  }
}
