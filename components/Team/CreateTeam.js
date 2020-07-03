export default function CreateTeam() {
  if (new.target !== CreateTeam) {
    return new CreateTeam()
  }
}
