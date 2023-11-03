const { EventEmitter } = require("events");

class Database {

	instance;
	emitter = new EventEmitter();

	constructor() {
		this.emitter.on("log", (e) => {
			if (process.env.NODE_ENV !== "production") {
				console.log("Event: ", e);
			}
		})
	}

	setInstance(dbInstance) {
		this.instance = dbInstance;
	} 

	async create(key, value) {
		const res = await this.instance.create(key, value);
		this.log();
		return res;
	}

	async delete(key) {
		const res = await this.instance.delete(key);
		this.log();
		return res;
	}

	async update(key, value) {
		const res = await this.instance.update(key, value);
		this.log();
		return res;
	}

	async load(key) {
		const res = await this.instance.load(key);
		this.log();
		return res;
	}

	async loadAll() {
		return this.instance.db;
	}

	log() {
		this.emitter.emit("log", this.instance.db);
	}
}

module.exports = new Database();