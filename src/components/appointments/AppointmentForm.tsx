import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, X, Bell, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Appointment,
  AppointmentType,
  appointmentTypeLabels,
  appointmentTypeIcons,
  reminderOptions,
  generateAppointmentId,
} from "@/data/appointmentContent";
import { cn } from "@/lib/utils";

interface AppointmentFormProps {
  appointment?: Appointment;
  onSave: (appointment: Appointment) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const AppointmentForm = ({ appointment, onSave, onCancel, onDelete }: AppointmentFormProps) => {
  const isEditing = !!appointment;
  
  const [title, setTitle] = useState(appointment?.title || "");
  const [type, setType] = useState<AppointmentType>(appointment?.type || "general-checkup");
  const [doctorName, setDoctorName] = useState(appointment?.doctorName || "");
  const [location, setLocation] = useState(appointment?.location || "");
  const [date, setDate] = useState<Date>(appointment?.date || new Date());
  const [time, setTime] = useState(appointment?.time || "09:00 AM");
  const [reminderEnabled, setReminderEnabled] = useState(appointment?.reminderEnabled ?? true);
  const [reminderMinutesBefore, setReminderMinutesBefore] = useState(appointment?.reminderMinutesBefore || 60);
  const [notes, setNotes] = useState(appointment?.notes || "");
  const [pointsToDiscuss, setPointsToDiscuss] = useState<string[]>(appointment?.pointsToDiscuss || []);
  const [newPoint, setNewPoint] = useState("");

  const handleAddPoint = () => {
    if (newPoint.trim()) {
      setPointsToDiscuss([...pointsToDiscuss, newPoint.trim()]);
      setNewPoint("");
    }
  };

  const handleRemovePoint = (index: number) => {
    setPointsToDiscuss(pointsToDiscuss.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const apt: Appointment = {
      id: appointment?.id || generateAppointmentId(),
      title: title || `${appointmentTypeLabels[type]} Appointment`,
      type,
      doctorName,
      location: location || undefined,
      date,
      time,
      reminderEnabled,
      reminderMinutesBefore,
      notes,
      pointsToDiscuss,
      completed: appointment?.completed || false,
      postAppointmentNotes: appointment?.postAppointmentNotes,
    };
    onSave(apt);
  };

  const isValid = doctorName.trim().length > 0;

  // Time options
  const timeOptions = [];
  for (let hour = 6; hour <= 20; hour++) {
    for (const minute of ["00", "30"]) {
      const h = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const ampm = hour >= 12 ? "PM" : "AM";
      timeOptions.push(`${h}:${minute} ${ampm}`);
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <button onClick={onCancel} className="text-muted-foreground">
          Cancel
        </button>
        <h2 className="text-lg font-semibold text-foreground">
          {isEditing ? "Edit Appointment" : "New Appointment"}
        </h2>
        <button
          onClick={handleSave}
          disabled={!isValid}
          className={cn(
            "font-semibold",
            isValid ? "text-accent" : "text-muted-foreground"
          )}
        >
          Save
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Type Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Type of Appointment</label>
          <Select value={type} onValueChange={(v) => setType(v as AppointmentType)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(appointmentTypeLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  <span className="flex items-center gap-2">
                    <span>{appointmentTypeIcons[key as AppointmentType]}</span>
                    <span>{label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Title (optional)</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`${appointmentTypeLabels[type]} Appointment`}
          />
        </div>

        {/* Doctor Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Doctor / Provider Name *</label>
          <Input
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            placeholder="Dr. Smith"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Clinic address"
              className="pl-10"
            />
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "MMM d, yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Time</label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reminder */}
        <div className="glass-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-accent" />
              <span className="font-medium text-foreground">Reminder</span>
            </div>
            <Switch checked={reminderEnabled} onCheckedChange={setReminderEnabled} />
          </div>
          {reminderEnabled && (
            <Select
              value={reminderMinutesBefore.toString()}
              onValueChange={(v) => setReminderMinutesBefore(parseInt(v))}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reminderOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value.toString()}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Points to Discuss */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-muted-foreground">Points to Discuss</label>
          
          {/* Existing points */}
          {pointsToDiscuss.length > 0 && (
            <div className="space-y-2">
              {pointsToDiscuss.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-muted/50"
                >
                  <span className="flex-1 text-sm text-foreground">{point}</span>
                  <button
                    onClick={() => handleRemovePoint(index)}
                    className="p-1 rounded-full hover:bg-muted"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Add new point */}
          <div className="flex gap-2">
            <Input
              value={newPoint}
              onChange={(e) => setNewPoint(e.target.value)}
              placeholder="Add a point to discuss..."
              onKeyDown={(e) => e.key === "Enter" && handleAddPoint()}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddPoint}
              disabled={!newPoint.trim()}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Notes</label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional notes for this appointment..."
            rows={3}
          />
        </div>

        {/* Delete button for existing appointments */}
        {isEditing && onDelete && (
          <Button
            variant="destructive"
            className="w-full"
            onClick={onDelete}
          >
            Delete Appointment
          </Button>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;
