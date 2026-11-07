import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Video,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Plus,
  ArrowRight,
  GitBranch,
  X,
  List,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Appointment } from '../types';

export const AppointmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    appointments,
    simulateNoShow,
    rescheduleAppointment,
    simulateReminderDelivery,
  } = useAppStore();

  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [rescheduleTime, setRescheduleTime] = useState('Tomorrow, 3:30 PM');

  const handleNoShow = (id: string) => {
    simulateNoShow(id);
    if (selectedAppointment?.id === id) {
      setSelectedAppointment((prev) => (prev ? { ...prev, status: 'no_show' } : null));
    }
  };

  const handleDeliverReminder = (id: string) => {
    simulateReminderDelivery(id);
    if (selectedAppointment?.id === id) {
      setSelectedAppointment((prev) => (prev ? { ...prev, reminderStatus: 'delivered' } : null));
    }
  };

  const handleSaveReschedule = () => {
    if (selectedAppointment) {
      rescheduleAppointment(selectedAppointment.id, rescheduleTime);
      setSelectedAppointment({ ...selectedAppointment, scheduledAt: rescheduleTime, status: 'confirmed' });
      setIsRescheduleOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
            Calendar & High-Ticket Appointment Operations
          </h2>
          <p className="text-xs text-content-secondary mt-1">
            Round-robin calendar scheduling, multi-channel reminder cascades, and automatic no-show rescue sequences.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center bg-bg-secondary rounded-lg p-0.5 border border-border text-xs">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded font-medium ${
                viewMode === 'list'
                  ? 'bg-white text-content-primary shadow-subtle'
                  : 'text-content-secondary'
              }`}
            >
              <List className="w-3.5 h-3.5" /> List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded font-medium ${
                viewMode === 'calendar'
                  ? 'bg-white text-content-primary shadow-subtle'
                  : 'text-content-secondary'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" /> Calendar
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/app/workflows/wf-appt-remind-04?tab=builder')}
            icon={<GitBranch className="w-4 h-4 text-accent" />}
          >
            Inspect No-Show Shield
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Scheduled Consultations</span>
            <CalendarIcon className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-bold font-display text-content-primary mt-1">
            {appointments.length}
          </div>
          <div className="text-[11px] text-content-muted mt-0.5">
            B2B Enterprise Strategy Sessions
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Show-Up Attendance Rate</span>
            <CheckCircle2 className="w-4 h-4 text-status-success" />
          </div>
          <div className="text-2xl font-bold font-display text-status-success mt-1">
            92.4%
          </div>
          <div className="text-[11px] text-status-success font-medium mt-0.5">
            Protected by multi-tier SMS alerts
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">No-Show Recovery Rate</span>
            <RotateCcw className="w-4 h-4 text-status-warning" />
          </div>
          <div className="text-2xl font-bold font-display text-content-primary mt-1">
            64.8%
          </div>
          <div className="text-[11px] text-accent font-medium mt-0.5">
            Rescheduled within 24 hours
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Calendar Sync Engine</span>
            <Video className="w-4 h-4 text-content-muted" />
          </div>
          <div className="text-sm font-bold font-display text-content-primary mt-1">
            GHL ⇄ Zoom ⇄ Google
          </div>
          <div className="text-[11px] text-status-success font-mono mt-0.5">
            ✓ Double-booking firewall active
          </div>
        </Card>
      </div>

      {/* List / Calendar View */}
      {viewMode === 'list' ? (
        <Card className="p-0 overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-content-primary font-display">
                Executive Consultation Roster
              </h3>
              <p className="text-xs text-content-muted">
                Click any appointment to inspect reminder logs or simulate client no-show protocol
              </p>
            </div>
            <span className="font-mono text-xs text-content-muted">
              Subaccount: Vanguard Enterprise Advisory
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-bg-main border-b border-border text-content-secondary uppercase font-mono text-[11px]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Client Name</th>
                  <th className="py-3 px-3 font-semibold">Consultation Type</th>
                  <th className="py-3 px-3 font-semibold">Assigned Advisor</th>
                  <th className="py-3 px-3 font-semibold">Scheduled Date & Time</th>
                  <th className="py-3 px-3 font-semibold">Reminder State</th>
                  <th className="py-3 px-3 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {appointments.map((apt) => (
                  <tr
                    key={apt.id}
                    onClick={() => setSelectedAppointment(apt)}
                    className="hover:bg-bg-main/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-content-primary group-hover:text-accent">
                        {apt.customerName}
                      </div>
                      <div className="text-[10px] font-mono text-content-muted">
                        {apt.customerEmail} • {apt.customerPhone}
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="font-medium text-content-primary">
                        {apt.appointmentType}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-content-secondary">
                      {apt.assignedStaff}
                    </td>

                    <td className="py-3.5 px-3 font-mono font-medium text-content-primary">
                      {apt.scheduledAt}
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-bg-secondary text-content-secondary border border-border">
                        {apt.reminderStatus}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <Badge status={apt.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {apt.status !== 'no_show' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleNoShow(apt.id)}
                            className="py-1 px-2 text-[11px] text-status-warning hover:bg-status-warning-bg"
                            title="Simulate No-Show"
                          >
                            Mark No-Show
                          </Button>
                        ) : (
                          <span className="text-[11px] font-mono text-status-error font-semibold">
                            Rescue SMS Sent
                          </span>
                        )}
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setSelectedAppointment(apt)}
                          className="py-1 px-2 text-[11px]"
                        >
                          Details
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        /* Calendar Grid View */
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-sm font-semibold text-content-primary font-display">
              Weekly Consultation Slot Calendar
            </h3>
            <span className="text-xs font-mono text-content-muted">Current Week View</span>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, idx) => (
              <div key={day} className="p-3 rounded-xl bg-bg-main border border-border min-h-[220px] space-y-2">
                <div className="font-semibold text-xs text-content-primary font-display pb-2 border-b border-border">
                  {day}
                </div>
                {appointments
                  .filter((_, i) => i % 5 === idx)
                  .map((apt) => (
                    <div
                      key={apt.id}
                      onClick={() => setSelectedAppointment(apt)}
                      className="p-2.5 rounded-lg bg-white border border-border shadow-subtle hover:border-accent cursor-pointer transition-colors space-y-1"
                    >
                      <div className="font-semibold text-[11px] text-content-primary truncate">
                        {apt.customerName}
                      </div>
                      <div className="text-[10px] text-content-muted font-mono truncate">
                        {apt.scheduledAt}
                      </div>
                      <Badge status={apt.status} size="sm" />
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Appointment Detail & Rescue Modal */}
      <Modal
        isOpen={!!selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        title={selectedAppointment ? `Appointment: ${selectedAppointment.customerName}` : ''}
        subtitle={selectedAppointment?.appointmentType}
        maxWidth="lg"
      >
        {selectedAppointment && (
          <div className="space-y-5 text-xs">
            {/* Summary */}
            <div className="p-3.5 rounded-xl bg-bg-main border border-border grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] text-content-muted uppercase font-mono">Date & Time</span>
                <div className="font-bold text-content-primary mt-0.5">
                  {selectedAppointment.scheduledAt}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-content-muted uppercase font-mono">Advisor</span>
                <div className="font-medium text-content-primary mt-0.5">
                  {selectedAppointment.assignedStaff}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-content-muted uppercase font-mono">Status</span>
                <div className="mt-0.5">
                  <Badge status={selectedAppointment.status} size="sm" />
                </div>
              </div>
            </div>

            {/* Automation timeline */}
            <div>
              <h4 className="text-xs font-semibold text-content-primary font-display uppercase tracking-wider mb-3">
                Automated Reminder & Cascade Sequence
              </h4>
              <div className="relative pl-6 space-y-3.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                {selectedAppointment.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    <span
                      className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full ring-4 ring-white ${
                        step.status === 'done'
                          ? 'bg-status-success'
                          : 'bg-status-warning'
                      }`}
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-content-primary text-xs">
                        {step.action}
                      </span>
                      <span className="font-mono text-[10px] text-content-muted">
                        {step.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rescue actions */}
            <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeliverReminder(selectedAppointment.id)}
                icon={<Clock className="w-3.5 h-3.5" />}
              >
                Send Reminder Now (SMS)
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsRescheduleOpen(true)}
                >
                  Reschedule Slot
                </Button>
                {selectedAppointment.status !== 'no_show' && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleNoShow(selectedAppointment.id)}
                  >
                    Mark No-Show
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Reschedule Sub-Modal */}
      <Modal
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        title="Reschedule Consultation Slot"
        subtitle="Automatic update to calendar ICS, advisor calendar, and confirmation SMS"
        maxWidth="sm"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-content-secondary font-medium mb-1">
              Select New Date & Time
            </label>
            <input
              type="text"
              value={rescheduleTime}
              onChange={(e) => setRescheduleTime(e.target.value)}
              placeholder="e.g. Tomorrow, 3:30 PM"
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-main focus:outline-none focus:border-accent"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsRescheduleOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveReschedule}
            >
              Confirm Reschedule
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

