// Pricing data (from official price list)
const pricing = [
  {
    depth: "30m",
    drilling: "R9,000",
    pvc: "R4,200",
    pump: "R7,000",
    total: "R19,300",
  },
  {
    depth: "40m",
    drilling: "R12,000",
    pvc: "R5,600",
    pump: "R8,500",
    total: "R24,900",
  },
  {
    depth: "50m",
    drilling: "R15,000",
    pvc: "R7,000",
    pump: "R9,000",
    total: "R29,500",
  },
  {
    depth: "60m",
    drilling: "R18,000",
    pvc: "R8,400",
    pump: "R10,000",
    total: "R34,600",
  },
  {
    depth: "70m",
    drilling: "R21,000",
    pvc: "R9,800",
    pump: "R11,225",
    total: "R39,925",
  },
  {
    depth: "80m",
    drilling: "R24,000",
    pvc: "R11,200",
    pump: "R12,800",
    total: "R45,600",
  },
  {
    depth: "90m",
    drilling: "R27,000",
    pvc: "R12,600",
    pump: "R14,500",
    total: "R51,400",
  },
  {
    depth: "100m",
    drilling: "R30,000",
    pvc: "R14,000",
    pump: "R16,350",
    total: "R59,350",
  },
];

const tbody = document.getElementById("priceBody");
tbody.innerHTML = pricing
  .map(
    (r) => `
<tr>
<td>${r.depth}</td>
<td>${r.drilling}</td>
<td>${r.pvc}</td>
<td>${r.pump}</td>
<td>${r.total}</td>
</tr>
`
  )
  .join("");

// Build the signature depth-rig ticks from the same data
const shaft = document.getElementById("rigShaft");
const depths = pricing.map((r) => parseInt(r.depth));
const maxD = Math.max(...depths);
pricing.forEach((r) => {
  const d = parseInt(r.depth);
  const pct = (d / maxD) * 92; // leave headroom at bottom
  const tick = document.createElement("div");
  tick.className = "rig-tick";
  tick.style.top = pct + "%";
  tick.innerHTML = `<span class="dash"></span><span class="m">${r.depth}</span><span class="price">${r.total}</span>`;
  shaft.appendChild(tick);
});

// Background rod lines in hero
const rods = document.getElementById("rods");
for (let i = 0; i < 14; i++) {
  const s = document.createElement("span");
  s.style.left = i * 7.5 + "%";
  s.style.opacity = (0.3 + Math.random() * 0.5).toFixed(2);
  rods.appendChild(s);
}

// Mobile nav toggle
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks
  .querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );

// Scroll reveal
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("in");
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
