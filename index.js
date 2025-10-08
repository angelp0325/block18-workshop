/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

function getRandomFreelancer() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const occupation =
    OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  const rate =
    Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) +
    PRICE_RANGE.min;

  return { name, occupation, rate };
}

const state = {
  freelancers: Array.from({ length: NUM_FREELANCERS }, getRandomFreelancer),
};

function getAverageRate(freelancers) {
  if (!freelancers.length) return 0;
  const total = freelancers.reduce(
    (sum, freelancer) => sum + freelancer.rate,
    0
  );
  return total / freelancers.length;
}

state.averageRate = getAverageRate(state.freelancers);

function FreelancerRow(freelancer) {
  const tr = document.createElement("tr");

  const nameTd = document.createElement("td");
  nameTd.textContent = freelancer.name;

  const occupationTd = document.createElement("td");
  occupationTd.textContent = freelancer.occupation;

  const rateTd = document.createElement("td");
  rateTd.textContent = `$${freelancer.rate}`;

  tr.append(nameTd, occupationTd, rateTd);
  return tr;
}

function FreelancerRows(freelancers) {
  const fragment = document.createDocumentFragment();
  freelancers.forEach((freelancer) => {
    fragment.appendChild(FreelancerRow(freelancer));
  });
  return fragment;
}

function AverageRate(rate) {
  const p = document.createElement("p");
  p.textContent = `The average rate is $${rate.toFixed(2)}.`;
  return p;
}

function render() {
  const app = document.querySelector("#app");
  app.innerHTML = "";

  const title = document.createElement("h1");
  title.textContent = "Freelancer Forum";

  const averageRate = AverageRate(state.averageRate);

  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>NAME</th>
        <th>OCCUPATION</th>
        <th>RATE</th>
      </tr>
    </thead>
    <tbody id="freelancer-rows"></tbody>
  `;

  const tbody = table.querySelector("#freelancer-rows");
  tbody.replaceWith(FreelancerRows(state.freelancers));

  app.append(title, averageRate, table);
}

render();
