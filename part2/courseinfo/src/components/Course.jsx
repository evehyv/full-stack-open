const Header = ({ courseName }) => <h2>{courseName}</h2>

const Total = ({ sum }) => <p><b>Total of {sum} exercises</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}    
  </>

const Course = ({ course }) => 
  <>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((accumulator, currentPart) => accumulator + currentPart.exercises, 0)} />
  </>

export default Course