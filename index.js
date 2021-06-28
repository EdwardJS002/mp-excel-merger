const xlsx = require('xlsx');
const fs = require('fs');
const { Parser } = require('json2csv')

const dir = './files/';
let file = undefined;
let sheets = [];

// Open data.json file

// try {
	// file = fs.readFileSync('./data.json');
//} catch (error) {
	fs.writeFileSync('./data.json', '[]');
	file = fs.readFileSync('./data.json');
//}

let data = JSON.parse(file);

// Get list of files

fs.readdirSync(dir).forEach((file) => {
	sheets.push(file);
});


// get data from files

const jsonify = (document) => {
	const wb = xlsx.readFile(`${dir}${document}`);

	const ws = wb.Sheets[wb.SheetNames[0]];

	const newData = xlsx.utils.sheet_to_json(ws, { raw: false });

	data = [...data, ...newData];
};

sheets.forEach((document) => {
	jsonify(document);
});

// write data in data.json

fs.writeFileSync('data.json', JSON.stringify(data));

// write data in excel

try {
	const parser = new Parser()
	const csv = parser.parse(data)
	fs.writeFileSync('data.csv', csv)
} catch (error) {
	console.error(err)
}
