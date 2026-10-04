export const saves = {
  save(turns) {
    let records = this.getSave();
    if (!records) records = [];
    const date = new Date();
    records.push({ turns, date });
    localStorage.setItem("records", JSON.stringify(records));
  },
  getSave() {
    return JSON.parse(localStorage.getItem("records"));
  },
  formatDate(dateObj) {
    const date = new Date(dateObj);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = date.getFullYear();

    return `${dd}.${mm}.${yyyy}`;
  },
};

saves.save(30);
saves.save(30);
saves.save(30);
saves.save(30);
saves.save(30);
saves.save(30);
saves.save(30);
saves.save(30);
saves.save(30);
