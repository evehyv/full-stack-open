import Person from "./Person"

const Persons = ({ personsList, removePerson }) => (
    personsList.map(person => 
        <Person
            key={person.name}
            name={person.name}
            number={person.number}
            removePerson={() => removePerson(person.id)}
        />)
)

export default Persons