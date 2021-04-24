class Team {
	constructor({ id, name, members }) {
		this._id = id;
		this._name = name;
		this._members = members;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	set name(name) {
		this._name = name;
	}

	get members() {
		return this._members;
	}

	set members(members) {
		this._members = members;
	}
}

export default Team;
