class MemoryDatabase {
	
	// String
	name;
	
	// Empty Object (key/value)
	db;
	
	// string or object
	valueType;

	// object keys
	objectKeys;

	// objectKeysLength
	objectKeysLength;
	
	constructor(_name = "default", _valueType = "object", _objectKeys = {}) {
		this.name = _name;
		this.valueType = _valueType;
		this.objectKeys = _objectKeys;
		this.objectKeysLength = Object.keys(_objectKeys).length;
		this.db = {};
	}

	async create(key, value) {
		if (this.db[key]) {
			throw new Error("MemoryDB::Create:Key Already Exists in Memory Datastore");
		}

		if (this.valueType === "string" && typeof value !== "string") throw new Error("MemoryDB::Create:Expected String");
		if (this.valueType === "object") {
			if (typeof value !== "object") throw new Error("MemoryDB::Create:Expected Object");
			const newValueKeys = Object.keys(value);
			if (newValueKeys.length !== this.objectKeysLength) throw new Error("MemoryDB::Create:Invalid Object Keys");
			
			for (let i = 0; i < newValueKeys.length; i++) {
				if (!this.objectKeys[newValueKeys[i]]) throw new Error("MemoryDB::Create:Invalid Value Key Passed")
			}
		}

		this.db[key] = value;

		return {
			message: "Created Successfully",
			data: this.db[key]
		}
	}

	async delete(key) {
		if (!this.db[key]) throw new Error("MemoryDB::Delete:Key Does Not Exist");

		delete this.db[key];

		return {
			message: "Delete Successfully",
			data: null
		}
	}

	async load(key) {
		if (!this.db[key]) throw new Error("MemoryDB::Load:Key Does Not Exist");

		return this.db[key];
	}

	async update(key, value) {
		if (!this.db[key]) throw new Error("MemoryDB::Update:Key Does Not Exist");

		if (this.valueType === "string" && typeof value !== "string") throw new Error("MemoryDB::Update:Expected String");
		if (this.valueType === "object") {
			if (typeof value !== "object") throw new Error("MemoryDB::Load:Expected Object");
			
			let orginalState = this.db[key];
			for (let i = 0; i < newValueKeys.length; i++) {
				if (!this.objectKeys[newValueKeys[i]]) throw new Error("MemoryDB::Create:Invalid Value Key Passed")
			}
		}

		this.db[key] = {
			...this.db[key],
			...value
		};

		return {
			message: "Updated Successfully",
			data: this.db[key]
		};
	}
}

module.exports = MemoryDatabase;