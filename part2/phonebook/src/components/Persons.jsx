import Person from "./Person"

const Persons = ({ personsList }) => (
    personsList.map(person => <Person key={person.name} name={person.name} number={person.number} />)
)

export default Persons