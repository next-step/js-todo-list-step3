export default function TeamList() {
  if (new.target !== TeamList) {
    return new TeamList()
  }
}
