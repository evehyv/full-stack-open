const Person = ({ name, number, removePerson }) => (
    <div>{name} {number} <button onClick={removePerson}>delete</button></div>
)

export default Person