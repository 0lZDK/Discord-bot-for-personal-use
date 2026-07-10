const fs = require("fs");
const path = require("path");

const counterPath = path.join(__dirname, "..", "counter.json");

function getNextTicketNumber() {

    const counter = JSON.parse(fs.readFileSync(counterPath));

    counter.lastTicket++;

    fs.writeFileSync(counterPath, JSON.stringify(counter, null, 4));

    return String(counter.lastTicket).padStart(4, "0");
}

module.exports = {
    getNextTicketNumber
};