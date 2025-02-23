import { Rabbit } from "lucide-react";

type PropsType = {
  where: string;
};

function EmptyState({ where }: PropsType) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center my-auto gap-4 px-18">
      <Rabbit
        size={60}
        strokeWidth={3}
        absoluteStrokeWidth
        className="text-rose-950"
      />
      <h1 className="text-xl font-light text-center text-rose-950">
        This bunny appears when {where} is empty...
      </h1>
    </div>
  );
}

export default EmptyState;
