import React from "react";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaGift,
  FaPrint,
  FaBox,
  FaPen,
  FaTags,
  FaCubes,
  FaUtensils,
  FaLayerGroup,
  FaFolder,
} from "react-icons/fa";

export const ICON_OPTIONS = [
  { key: "briefcase", label: "Briefcase", Icon: FaBriefcase },
  { key: "calendar", label: "Calendar", Icon: FaCalendarAlt },
  { key: "gift", label: "Gift", Icon: FaGift },
  { key: "print", label: "Print", Icon: FaPrint },
  { key: "box", label: "Box", Icon: FaBox },
  { key: "pen", label: "Pen", Icon: FaPen },
  { key: "tags", label: "Tags", Icon: FaTags },
  { key: "cubes", label: "Cubes", Icon: FaCubes },
  { key: "utensils", label: "Utensils", Icon: FaUtensils },
  { key: "layer-group", label: "Layers", Icon: FaLayerGroup },
  { key: "folder", label: "Folder", Icon: FaFolder },
];

const ICON_MAP = ICON_OPTIONS.reduce((acc, { key, Icon }) => {
  acc[key] = Icon;
  return acc;
}, {});

export const CategoryIcon = ({ iconKey, className = "text-[#18140F]", size = 24 }) => {
  const Icon = ICON_MAP[iconKey] || FaFolder;
  return <Icon className={className} size={size} />;
};
