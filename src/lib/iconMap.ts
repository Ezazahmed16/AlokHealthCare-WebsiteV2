import {
    Droplet, Scan, Heart, Bug, Brain, Bone, Eye, Baby,
    Stethoscope, Pill, Syringe, Thermometer, Activity,
    Microscope, Radiation, Shield, Zap, Flame, Wind, Leaf,
    type LucideIcon,
} from "lucide-react";
export const AVAILABLE_ICONS: { name: string; icon: LucideIcon }[] = [
    { name: "Droplet", icon: Droplet },
    { name: "Scan", icon: Scan },
    { name: "Heart", icon: Heart },
    { name: "Bug", icon: Bug },
    { name: "Brain", icon: Brain },
    { name: "Bone", icon: Bone },
    { name: "Eye", icon: Eye },
    { name: "Baby", icon: Baby },
    { name: "Stethoscope", icon: Stethoscope },
    { name: "Pill", icon: Pill },
    { name: "Syringe", icon: Syringe },
    { name: "Thermometer", icon: Thermometer },
    { name: "Activity", icon: Activity },
    { name: "Microscope", icon: Microscope },
    { name: "Radiation", icon: Radiation },
    { name: "Shield", icon: Shield },
    { name: "Zap", icon: Zap },
    { name: "Flame", icon: Flame },
    { name: "Wind", icon: Wind },
    { name: "Leaf", icon: Leaf },
];
export const ICON_COLORS = [
    { bg: "bg-red-100", icon: "text-red-500", label: "লাল" },
    { bg: "bg-blue-100", icon: "text-blue-500", label: "নীল" },
    { bg: "bg-pink-100", icon: "text-pink-500", label: "গোলাপী" },
    { bg: "bg-amber-100", icon: "text-amber-500", label: "হলুদ" },
    { bg: "bg-green-100", icon: "text-green-500", label: "সবুজ" },
    { bg: "bg-purple-100", icon: "text-purple-500", label: "বেগুনি" },
    { bg: "bg-cyan-100", icon: "text-cyan-500", label: "সায়ান" },
    { bg: "bg-orange-100", icon: "text-orange-500", label: "কমলা" },
];
export const getIconComponent = (name: string): LucideIcon => {
    return AVAILABLE_ICONS.find((i) => i.name === name)?.icon || Droplet;
};