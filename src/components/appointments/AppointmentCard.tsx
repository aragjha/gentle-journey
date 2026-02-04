import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Bell, ChevronRight, Check } from "lucide-react";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import { Appointment, appointmentTypeIcons } from "@/data/appointmentContent";
import { cn } from "@/lib/utils";

interface AppointmentCardProps {
  appointment: Appointment;
  onClick: () => void;
  delay?: number;
}

const AppointmentCard = ({ appointment, onClick, delay = 0 }: AppointmentCardProps) => {
  const { title, type, doctorName, location, date, time, reminderEnabled, completed, pointsToDiscuss } = appointment;
  
  const icon = appointmentTypeIcons[type];
  const isPastAppointment = isPast(date) && !isToday(date);
  
  const getDateLabel = () => {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEE, MMM d");
  };

  return (
    <motion.button
      className={cn(
        "w-full glass-card p-4 text-left relative overflow-hidden",
        completed && "opacity-60",
        isPastAppointment && !completed && "border-l-4 border-l-destructive"
      )}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0",
          completed ? "bg-muted" : "bg-accent/10"
        )}>
          {completed ? <Check className="w-6 h-6 text-accent" /> : icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className={cn(
                "font-semibold text-foreground truncate",
                completed && "line-through"
              )}>
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{doctorName}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
          </div>

          {/* Date & Time */}
          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className={cn(
                isToday(date) && "text-accent font-medium"
              )}>
                {getDateLabel()}
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>
            {reminderEnabled && (
              <Bell className="w-4 h-4 text-accent" />
            )}
          </div>

          {/* Location */}
          {location && (
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          )}

          {/* Points to discuss badge */}
          {pointsToDiscuss.length > 0 && !completed && (
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-accent/10 text-accent">
                {pointsToDiscuss.length} point{pointsToDiscuss.length > 1 ? "s" : ""} to discuss
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
};

export default AppointmentCard;
