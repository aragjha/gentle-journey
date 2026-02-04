import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Calendar, Clock } from "lucide-react";
import { format, isToday, isTomorrow, isThisWeek, isAfter, isBefore, startOfToday } from "date-fns";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import AppointmentCard from "@/components/appointments/AppointmentCard";
import AppointmentForm from "@/components/appointments/AppointmentForm";
import { Appointment, sampleAppointments } from "@/data/appointmentContent";

interface AppointmentsHubProps {
  appointments: Appointment[];
  onUpdateAppointments: (appointments: Appointment[]) => void;
  onBack: () => void;
}

type TabType = "upcoming" | "past";

const AppointmentsHub = ({ appointments, onUpdateAppointments, onBack }: AppointmentsHubProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | undefined>();

  const today = startOfToday();
  
  // Split appointments into upcoming and past
  const upcomingAppointments = appointments
    .filter((apt) => isAfter(apt.date, today) || isToday(apt.date))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  
  const pastAppointments = appointments
    .filter((apt) => isBefore(apt.date, today) && !isToday(apt.date))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  // Group upcoming by sections
  const todayAppointments = upcomingAppointments.filter((apt) => isToday(apt.date));
  const tomorrowAppointments = upcomingAppointments.filter((apt) => isTomorrow(apt.date));
  const thisWeekAppointments = upcomingAppointments.filter(
    (apt) => isThisWeek(apt.date) && !isToday(apt.date) && !isTomorrow(apt.date)
  );
  const laterAppointments = upcomingAppointments.filter(
    (apt) => !isThisWeek(apt.date)
  );

  const handleOpenForm = (appointment?: Appointment) => {
    setEditingAppointment(appointment);
    setIsFormOpen(true);
  };

  const handleSaveAppointment = (appointment: Appointment) => {
    if (editingAppointment) {
      // Update existing
      onUpdateAppointments(
        appointments.map((apt) => (apt.id === appointment.id ? appointment : apt))
      );
    } else {
      // Add new
      onUpdateAppointments([...appointments, appointment]);
    }
    setIsFormOpen(false);
    setEditingAppointment(undefined);
  };

  const handleDeleteAppointment = () => {
    if (editingAppointment) {
      onUpdateAppointments(appointments.filter((apt) => apt.id !== editingAppointment.id));
      setIsFormOpen(false);
      setEditingAppointment(undefined);
    }
  };

  const renderAppointmentSection = (title: string, apts: Appointment[], showIcon?: React.ReactNode) => {
    if (apts.length === 0) return null;
    
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          {showIcon}
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            {title}
          </h3>
        </div>
        {apts.map((apt, index) => (
          <AppointmentCard
            key={apt.id}
            appointment={apt}
            onClick={() => handleOpenForm(apt)}
            delay={index * 0.05}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 pt-safe-top pb-4 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-muted">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-h1-lg text-foreground flex-1">Appointments 📅</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              activeTab === "upcoming"
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Upcoming ({upcomingAppointments.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              activeTab === "past"
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Past ({pastAppointments.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          {activeTab === "upcoming" ? (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No upcoming appointments
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Schedule your next doctor visit to stay on track
                  </p>
                  <Button onClick={() => handleOpenForm()} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Appointment
                  </Button>
                </div>
              ) : (
                <>
                  {renderAppointmentSection(
                    "Today",
                    todayAppointments,
                    <Clock className="w-4 h-4 text-accent" />
                  )}
                  {renderAppointmentSection("Tomorrow", tomorrowAppointments)}
                  {renderAppointmentSection("This Week", thisWeekAppointments)}
                  {renderAppointmentSection("Later", laterAppointments)}
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="past"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {pastAppointments.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No past appointments yet</p>
                </div>
              ) : (
                pastAppointments.map((apt, index) => (
                  <AppointmentCard
                    key={apt.id}
                    appointment={apt}
                    onClick={() => handleOpenForm(apt)}
                    delay={index * 0.05}
                  />
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FAB to add appointment */}
      <motion.button
        onClick={() => handleOpenForm()}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Form Sheet */}
      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-3xl">
          <AppointmentForm
            appointment={editingAppointment}
            onSave={handleSaveAppointment}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingAppointment(undefined);
            }}
            onDelete={editingAppointment ? handleDeleteAppointment : undefined}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AppointmentsHub;
