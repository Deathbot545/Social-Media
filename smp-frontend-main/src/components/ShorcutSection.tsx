import React from "react";

const ShorcutSection: React.FC = () => {
  return (
    <section className="h-full flex flex-col items-center justify-start gap-2">
      {shortcuts.map((shortcut) => (
        <Shortcut key={shortcut.id} shortcut={shortcut} />
      ))}
    </section>
  );
};

const shortcuts: ShortcutData[] = [
  {
    id: 1,
    name: "Friends",
    imgURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5QywqLcyIxr9WZjLiI5YtfuoAU4vspmd2Ug&usqp=CAU",
    link: "",
  },
  {
    id: 2,
    name: "Memories",
    imgURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5QywqLcyIxr9WZjLiI5YtfuoAU4vspmd2Ug&usqp=CAU",
    link: "",
  },
  {
    id: 3,
    name: "Saved",
    imgURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5QywqLcyIxr9WZjLiI5YtfuoAU4vspmd2Ug&usqp=CAU",
    link: "",
  },
  {
    id: 4,
    name: "Groups",
    imgURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5QywqLcyIxr9WZjLiI5YtfuoAU4vspmd2Ug&usqp=CAU",
    link: "",
  },
];

type ShortcutData = {
  id: number;
  imgURL: string;
  name: string;
  link: string;
};

type ShortcutProps = {
  shortcut: ShortcutData;
};

const Shortcut: React.FC<ShortcutProps> = ({ shortcut }) => {
  return (
    <div className="px-4 py-4 hover:scale-125 duration-200">
      <a
        key={shortcut.id}
        href={shortcut.link}
        className="flex items-center space-x-2"
      >
        <img
          src={shortcut.imgURL}
          alt={shortcut.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-3xl font-bold">{shortcut.name}</span>
      </a>
    </div>
  );
};

export default ShorcutSection;
