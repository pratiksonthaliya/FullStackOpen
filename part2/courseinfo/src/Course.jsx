import React from "react";

export default function Course({ course }) {
  const sum = course.parts.reduce(
    (accumulator, part) => part.exercises + accumulator,
    0
  );
  return (
    <div>
      <h2>{course.name}</h2>
      <div>
        {course.parts.map((part, id) => {
          return (
            <div>
              <h3>
                {part.name} {part.exercises}
              </h3>
            </div>
          );
        })}
        <h3>Total of {sum} exercises</h3>
      </div>
    </div>
  );
}

// export default Course;
