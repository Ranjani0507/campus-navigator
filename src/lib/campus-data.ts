import academicImg from "@/assets/bldg-academic.jpg";
import libraryImg from "@/assets/bldg-library.jpg";
import auditoriumImg from "@/assets/bldg-auditorium.jpg";
import cafeteriaImg from "@/assets/bldg-cafeteria.jpg";
import hostelImg from "@/assets/bldg-hostel.jpg";
import sportsImg from "@/assets/bldg-sports.jpg";
import labImg from "@/assets/bldg-lab.jpg";
import {
  BookOpen,
  Building2,
  Coffee,
  Cpu,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  MicVocal,
  ParkingSquare,
  Bus,
  Briefcase,
  Wifi,
  ShoppingBag,
  Banknote,
  type LucideIcon,
} from "lucide-react";

export type Building = {
  id: string;
  name: string;
  category: string;
  short: string;
  description: string;
  image: string;
  openingHours: string;
  floors: string[];
  departments: string[];
  nearby: string[];
  // Position on 100x100 map grid
  x: number;
  y: number;
  icon: LucideIcon;
  color: string;
};

export const buildings: Building[] = [
  {
    id: "academic-a",
    name: "Academic Block A",
    category: "Academic",
    short: "Home of CSE, IT and ECE departments",
    description:
      "The flagship academic block houses classrooms, staff rooms and specialized labs for engineering departments. Modern lecture halls with projectors and hybrid learning setup.",
    image: academicImg,
    openingHours: "Mon–Sat · 8:00 AM – 8:00 PM",
    floors: ["Ground: Reception, Notice board", "1st: CSE classrooms", "2nd: IT department", "3rd: ECE labs"],
    departments: ["CSE", "IT", "ECE"],
    nearby: ["library", "cafeteria", "lab"],
    x: 32, y: 40,
    icon: Building2,
    color: "oklch(0.55 0.19 258)",
  },
  {
    id: "academic-b",
    name: "Academic Block B",
    category: "Academic",
    short: "Mechanical, Civil and EEE",
    description:
      "Dedicated to core engineering branches with heavy workshop equipment, drafting rooms and specialized survey labs.",
    image: academicImg,
    openingHours: "Mon–Sat · 8:00 AM – 6:00 PM",
    floors: ["Ground: Workshops", "1st: Mechanical", "2nd: Civil", "3rd: EEE"],
    departments: ["Mechanical", "Civil", "EEE"],
    nearby: ["academic-a", "sports"],
    x: 55, y: 32,
    icon: Building2,
    color: "oklch(0.55 0.19 258)",
  },
  {
    id: "library",
    name: "Central Library",
    category: "Facility",
    short: "80,000+ books, quiet study zones and e-resources",
    description:
      "Three-floor library with reference section, digital catalog, IEEE/ACM access, group study rooms and 24×7 reading hall during exams.",
    image: libraryImg,
    openingHours: "Daily · 8:00 AM – 10:00 PM",
    floors: ["Ground: Circulation & journals", "1st: Reference & digital library", "2nd: Quiet study & discussion pods"],
    departments: ["All Departments"],
    nearby: ["academic-a", "cafeteria"],
    x: 45, y: 55,
    icon: BookOpen,
    color: "oklch(0.55 0.15 220)",
  },
  {
    id: "auditorium",
    name: "Main Auditorium",
    category: "Facility",
    short: "1,200-seat hall for events and convocations",
    description:
      "State-of-the-art auditorium with Dolby sound, LED backdrop and green rooms. Hosts symposiums, cultural fests and guest lectures.",
    image: auditoriumImg,
    openingHours: "Bookings via Cultural Office",
    floors: ["Ground: Main hall & stage", "1st: Balcony seating & control room"],
    departments: ["Cultural Committee"],
    nearby: ["administrative", "placement"],
    x: 68, y: 55,
    icon: MicVocal,
    color: "oklch(0.6 0.2 30)",
  },
  {
    id: "cafeteria",
    name: "Central Cafeteria",
    category: "Facility",
    short: "Multi-cuisine food court and coffee bar",
    description:
      "Serves South-Indian, North-Indian, Chinese and continental. Includes a coffee bar, juice counter and outdoor seating deck.",
    image: cafeteriaImg,
    openingHours: "Daily · 7:30 AM – 10:00 PM",
    floors: ["Ground: Food court", "1st: Café lounge & terrace"],
    departments: ["Hospitality Services"],
    nearby: ["library", "hostel"],
    x: 40, y: 72,
    icon: Coffee,
    color: "oklch(0.65 0.15 60)",
  },
  {
    id: "hostel",
    name: "Student Hostels",
    category: "Residential",
    short: "Boys and Girls hostels with 1,500 rooms",
    description:
      "Separate blocks for boys and girls, each with mess, common room, gym, laundromat and 24×7 security. High-speed Wi-Fi throughout.",
    image: hostelImg,
    openingHours: "Access · 24×7 (residents)",
    floors: ["Blocks A–D: Boys", "Blocks E–F: Girls", "Common: Mess & recreation"],
    departments: ["Hostel Office"],
    nearby: ["cafeteria", "medical"],
    x: 22, y: 78,
    icon: Home,
    color: "oklch(0.58 0.14 160)",
  },
  {
    id: "sports",
    name: "Sports Complex",
    category: "Facility",
    short: "Track, football field, indoor courts, gym",
    description:
      "400m synthetic track, football & cricket fields, indoor stadium for basketball, badminton, table-tennis and a modern gymnasium.",
    image: sportsImg,
    openingHours: "Daily · 6:00 AM – 9:00 PM",
    floors: ["Outdoor: Track & fields", "Indoor: Courts", "Upper: Gym & yoga"],
    departments: ["Physical Education"],
    nearby: ["hostel", "academic-b"],
    x: 78, y: 78,
    icon: Dumbbell,
    color: "oklch(0.6 0.18 140)",
  },
  {
    id: "medical",
    name: "Medical Center",
    category: "Facility",
    short: "Round-the-clock clinic and ambulance",
    description:
      "In-house doctors, pharmacy, minor OT and 24×7 ambulance. Tie-up with two multi-specialty hospitals nearby.",
    image: academicImg,
    openingHours: "24×7",
    floors: ["Ground: OPD & pharmacy", "1st: Observation rooms"],
    departments: ["Health Services"],
    nearby: ["hostel", "administrative"],
    x: 15, y: 55,
    icon: HeartPulse,
    color: "oklch(0.6 0.22 25)",
  },
  {
    id: "administrative",
    name: "Administrative Office",
    category: "Admin",
    short: "Registrar, accounts and academic office",
    description:
      "Single-window facility for admissions, transcripts, hostel allotment, scholarships and fee payments.",
    image: academicImg,
    openingHours: "Mon–Fri · 9:30 AM – 5:00 PM",
    floors: ["Ground: Reception & fees", "1st: Registrar", "2nd: Dean's offices"],
    departments: ["Administration"],
    nearby: ["auditorium", "placement"],
    x: 68, y: 40,
    icon: Landmark,
    color: "oklch(0.5 0.06 258)",
  },
  {
    id: "placement",
    name: "Placement Cell",
    category: "Admin",
    short: "Recruitment drives and career services",
    description:
      "Interview rooms, GD hall, pre-placement talk theatre and career counselling desks. 200+ companies visit annually.",
    image: academicImg,
    openingHours: "Mon–Sat · 9:00 AM – 6:00 PM",
    floors: ["Ground: Reception & GD rooms", "1st: Interview suites"],
    departments: ["Career Services"],
    nearby: ["administrative", "auditorium"],
    x: 82, y: 48,
    icon: Briefcase,
    color: "oklch(0.55 0.16 285)",
  },
  {
    id: "parking",
    name: "Central Parking",
    category: "Facility",
    short: "Two-wheeler & four-wheeler parking",
    description:
      "Covered parking for 800 two-wheelers and 200 cars. RFID entry for staff and residents.",
    image: academicImg,
    openingHours: "24×7",
    floors: ["Level 1: Two-wheelers", "Level 2: Cars"],
    departments: ["Security"],
    nearby: ["bus", "administrative"],
    x: 88, y: 25,
    icon: ParkingSquare,
    color: "oklch(0.5 0.04 258)",
  },
  {
    id: "bus",
    name: "Campus Bus Stop",
    category: "Facility",
    short: "City buses and campus shuttle",
    description:
      "Sheltered stop with real-time display. Campus shuttle every 15 minutes to metro and railway station.",
    image: academicImg,
    openingHours: "Daily · 6:00 AM – 11:00 PM",
    floors: ["Open air stop"],
    departments: ["Transport"],
    nearby: ["parking", "administrative"],
    x: 92, y: 15,
    icon: Bus,
    color: "oklch(0.6 0.14 200)",
  },
  {
    id: "lab",
    name: "Research & Innovation Lab",
    category: "Academic",
    short: "AI, IoT and robotics research center",
    description:
      "High-performance compute cluster, robotics arena, IoT prototyping bench and startup incubator space.",
    image: labImg,
    openingHours: "Mon–Sat · 9:00 AM – 9:00 PM",
    floors: ["Ground: HPC cluster", "1st: Robotics arena", "2nd: Incubator"],
    departments: ["CSE", "ECE", "Innovation Cell"],
    nearby: ["academic-a", "library"],
    x: 25, y: 25,
    icon: Cpu,
    color: "oklch(0.6 0.2 285)",
  },
];

export function getBuilding(id: string) {
  return buildings.find((b) => b.id === id);
}

export type Department = {
  id: string;
  name: string;
  short: string;
  head: string;
  buildingId: string;
  icon: LucideIcon;
};

export const departments: Department[] = [
  { id: "cse", name: "Computer Science & Engineering", short: "Programming, AI, systems", head: "Dr. R. Menon", buildingId: "academic-a", icon: Cpu },
  { id: "it", name: "Information Technology", short: "Software, data & cloud", head: "Dr. S. Iyer", buildingId: "academic-a", icon: Cpu },
  { id: "ece", name: "Electronics & Communication", short: "VLSI, signals, comms", head: "Dr. A. Patel", buildingId: "academic-a", icon: Cpu },
  { id: "eee", name: "Electrical & Electronics", short: "Power, machines, control", head: "Dr. K. Rao", buildingId: "academic-b", icon: Cpu },
  { id: "mech", name: "Mechanical Engineering", short: "Design, thermal, mfg", head: "Dr. P. Sharma", buildingId: "academic-b", icon: Building2 },
  { id: "civil", name: "Civil Engineering", short: "Structures, transport", head: "Dr. V. Nair", buildingId: "academic-b", icon: Building2 },
  { id: "mba", name: "Business Administration", short: "Strategy, finance, ops", head: "Dr. N. Kapoor", buildingId: "administrative", icon: Briefcase },
  { id: "sci", name: "School of Sciences", short: "Physics, chem, maths", head: "Dr. L. Bose", buildingId: "academic-a", icon: GraduationCap },
  { id: "arts", name: "School of Arts", short: "Languages & humanities", head: "Dr. M. Fernandes", buildingId: "auditorium", icon: GraduationCap },
];

export type Facility = {
  id: string;
  name: string;
  description: string;
  buildingId: string;
  icon: LucideIcon;
};

export const facilities: Facility[] = [
  { id: "f-library", name: "Library", description: "80k+ books, digital resources, quiet zones", buildingId: "library", icon: BookOpen },
  { id: "f-cafeteria", name: "Cafeteria", description: "Multi-cuisine food court and coffee bar", buildingId: "cafeteria", icon: Coffee },
  { id: "f-atm", name: "ATM", description: "Two on-campus ATMs near admin block", buildingId: "administrative", icon: Banknote },
  { id: "f-medical", name: "Medical Center", description: "24×7 clinic with in-house doctors", buildingId: "medical", icon: HeartPulse },
  { id: "f-wifi", name: "Wi-Fi Zones", description: "Campus-wide gigabit Wi-Fi", buildingId: "library", icon: Wifi },
  { id: "f-parking", name: "Parking", description: "Covered parking for 1,000+ vehicles", buildingId: "parking", icon: ParkingSquare },
  { id: "f-sports", name: "Sports Complex", description: "Track, courts, gym and yoga", buildingId: "sports", icon: Dumbbell },
  { id: "f-hostel", name: "Hostel", description: "1,500 rooms with mess and recreation", buildingId: "hostel", icon: Home },
  { id: "f-store", name: "Stationery Store", description: "Books, supplies and printing", buildingId: "cafeteria", icon: ShoppingBag },
];
