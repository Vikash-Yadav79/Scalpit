import React from 'react';
import { View, ViewStyle } from 'react-native';
import {
  Home,
  TrendingUp,
  TrendingDown,
  LineChart,
  BarChart2,
  PieChart,
  Activity,
  Search,
  Bell,
  User,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldCheck,
  Lock,
  Smartphone,
  Mail,
  Wallet,
  Briefcase,
  RefreshCw,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Star,
  Plus,
  Filter,
  SlidersHorizontal,
  LogOut,
  Moon,
  Sun,
  Settings,
  Clock,
  Compass,
  FileText,
  Layers,
  Delete,
  Pin,
  Pencil,
  Bookmark,
  HelpCircle,
  Landmark,
  Building2,
  Calendar,
  Share2,
  Percent,
  CreditCard,
  Send,
  LucideIcon,
} from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';

export const iconMap = {
  home: Home,
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,
  stocks: LineChart,
  'mutual-funds': PieChart,
  orders: FileText,
  profile: User,
  activity: Activity,
  chart: BarChart2,
  search: Search,
  bell: Bell,
  user: User,
  check: Check,
  close: X,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'arrow-up-right': ArrowUpRight,
  'arrow-down-right': ArrowDownRight,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  eye: Eye,
  'eye-off': EyeOff,
  shield: ShieldCheck,
  lock: Lock,
  phone: Smartphone,
  mail: Mail,
  wallet: Wallet,
  briefcase: Briefcase,
  refresh: RefreshCw,
  alert: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  'check-circle': CheckCircle2,
  star: Star,
  plus: Plus,
  filter: Filter,
  sliders: SlidersHorizontal,
  logout: LogOut,
  moon: Moon,
  sun: Sun,
  settings: Settings,
  clock: Clock,
  explore: Compass,
  layers: Layers,
  backspace: Delete,
  pin: Pin,
  edit: Pencil,
  bookmark: Bookmark,
  'help-circle': HelpCircle,
  bank: Landmark,
  building: Building2,
  calendar: Calendar,
  share: Share2,
  percent: Percent,
  'credit-card': CreditCard,
  send: Send,
} as const;

export type IconName = keyof typeof iconMap;

export interface AppIconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: ViewStyle;
}

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 22,
  color,
  strokeWidth = 2,
  style,
}) => {
  const { colors } = useTheme();
  const IconComponent: LucideIcon = iconMap[name] || Activity;
  const iconColor = color || colors.textPrimary;

  return (
    <View style={style}>
      <IconComponent
        size={size}
        color={iconColor}
        strokeWidth={strokeWidth}
      />
    </View>
  );
};

export default React.memo(AppIcon);
