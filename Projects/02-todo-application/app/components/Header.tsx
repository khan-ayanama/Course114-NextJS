import { GrNotes } from "react-icons/gr";

export default function Header() {
  return (
    <div className="flex gap-8 justify-center">
      <GrNotes className="text-green-500 text-2xl font-bold " />

      <h2 className="text-2xl font-bold uppercase">Todo Next + Typescript</h2>
      <GrNotes className="text-green-500 text-2xl font-bold " />
    </div>
  );
}
