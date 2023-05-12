import { ExerciseComponent } from "../components/Exercise";
import exerciseData from "../exercisedata/focus.json";

const ExercisePage: React.FC = () => {
  return (
    <div>
      <ExerciseComponent exerciseData={exerciseData} />
    </div>
  );
};

export default ExercisePage;
