import {
  Bath,
  BedDouble,
  CalendarCheck,
  CircleHelp,
  Compass,
  Drama,
  Landmark,
  MapPin,
  Moon,
  Navigation,
  Palmtree,
  Sun,
  Sunrise,
  Trees,
  Waves,
  Users,
  Utensils,
  Flame,
  ShieldCheck,
  Leaf,
} from 'lucide-react';

/** Icons that can be referenced by name from src/data/resortConfig.js */
const ICONS = {
  Users,
  Utensils,
  Flame,
  ShieldCheck,
  Leaf,
  Bath,
  BedDouble,
  CalendarCheck,
  HelpCircle: CircleHelp,
  CircleHelp,
  Compass,
  Drama,
  Landmark,
  MapPin,
  Moon,
  Navigation,
  Palmtree,
  Sun,
  Sunrise,
  Trees,
  Waves,
};

export default function Icon({ name, ...props }) {
  const Component = ICONS[name] || Waves;
  return <Component aria-hidden="true" {...props} />;
}
