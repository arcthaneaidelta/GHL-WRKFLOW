import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Headphones,
  Send,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  GitBranch,
  Bot,
  User,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { SupportTicket } from '../types';

export const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    supportTickets,
    simulateSupportRequest,
    resolveTicket,
    activeBusiness,
  } = useAppStore();

  const [selectedTicket, setSelectedTicket] = useState<SupportTicket>(supportTickets[0]);
  const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);
  const [newInquirySubject, setNewInquirySubject] = useState('');
  const [newInquiryDept, setNewInquiryDept] = useState<SupportTicket['department']>(
    'Billing & Automation'
  );

  const filteredTickets = supportTickets.filter(
    (t) => activeBusiness === 'all' || t.businessId === activeBusiness
  );

  const handleCreateSimulatedInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInquirySubject) return;
    simulateSupportRequest(newInquirySubject, newInquiryDept);
    setIsSimulateModalOpen(false);
    setNewInquirySubject('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
            Customer Support Triage & SLA Sentinel
          </h2>
          <p className="text-xs text-content-secondary mt-1">
            Automated ticket classification, priority evaluation, emergency SLA escalation, and multi-channel conversational threads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/app/workflows/wf-supp-escalate-08?tab=builder')}
            icon={<GitBranch className="w-4 h-4 text-accent" />}
          >
            Inspect SLA Sentinel
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsSimulateModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Simulate Support Inquiry
          </Button>
        </div>
      </div>

      {/* Main Inbox & Conversation Thread Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Tickets Inbox (5 cols) */}
        <Card className="lg:col-span-5 p-0 overflow-hidden flex flex-col max-h-[75vh]">
          <div className="p-3.5 border-b border-border bg-bg-main/60 flex items-center justify-between">
            <span className="text-xs font-semibold text-content-primary">
              Active Inquiries ({filteredTickets.length})
            </span>
            <span className="font-mono text-[11px] text-content-muted">
              Auto-Triage Active
            </span>
          </div>

          <div className="divide-y divide-border/60 overflow-y-auto flex-1">
            {filteredTickets.map((ticket) => {
              const isSelected = selectedTicket?.id === ticket.id;
              return (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-4 transition-colors cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-accent-light/30 border-l-4 border-l-accent'
                      : 'hover:bg-bg-main/60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-xs text-content-primary line-clamp-1">
                        {ticket.subject}
                      </div>
                      <div className="text-[11px] text-content-muted mt-0.5">
                        {ticket.customerName} • {ticket.department}
                      </div>
                    </div>
                    <Badge status={ticket.priority} size="sm" />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-content-muted pt-1">
                    <span>{ticket.id}</span>
                    <span>{ticket.lastActivity}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right Conversation & Automation Timeline (7 cols) */}
        <Card className="lg:col-span-7 p-6 space-y-5">
          {selectedTicket ? (
            <>
              {/* Ticket Header */}
              <div className="flex items-start justify-between border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-content-muted">
                      {selectedTicket.id}
                    </span>
                    <Badge status={selectedTicket.status} size="sm" />
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-secondary text-content-secondary">
                      {selectedTicket.department}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-content-primary font-display mt-1">
                    {selectedTicket.subject}
                  </h3>
                  <div className="text-xs text-content-secondary mt-0.5">
                    From {selectedTicket.customerName} ({selectedTicket.customerEmail})
                  </div>
                </div>

                {selectedTicket.status !== 'resolved' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => resolveTicket(selectedTicket.id)}
                    className="text-status-success hover:bg-status-success-bg"
                  >
                    Mark Resolved
                  </Button>
                )}
              </div>

              {/* AI Triage Banner */}
              <div className="p-3 rounded-xl bg-accent-light/40 border border-accent/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-sidebar-bg font-medium">
                  <Bot className="w-4 h-4 text-accent" />
                  <span>AI Classification: {selectedTicket.aiClassification}</span>
                </div>
                <span className="text-status-success font-mono text-[11px] font-semibold">
                  ✓ SLA: 15m Met
                </span>
              </div>

              {/* Chat Thread Messages */}
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {selectedTicket.messages.map((msg, idx) => {
                  const isCustomer = msg.sender === 'customer';
                  const isSystem = msg.sender === 'system';

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl text-xs space-y-1 ${
                        isCustomer
                          ? 'bg-bg-main border border-border ml-0 mr-8'
                          : isSystem
                          ? 'bg-sidebar-secondary/90 text-white border border-white/10 font-mono text-[11px]'
                          : 'bg-accent text-white ml-8 mr-0'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-[11px]">
                        <span>{msg.senderName}</span>
                        <span className="opacity-70 font-mono text-[10px]">
                          {msg.timestamp}
                        </span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="py-16 text-center text-xs text-content-muted">
              Select a support ticket from the inbox to review the conversation and SLA trace.
            </div>
          )}
        </Card>
      </div>

      {/* Simulate Support Inquiry Modal */}
      <Modal
        isOpen={isSimulateModalOpen}
        onClose={() => setIsSimulateModalOpen(false)}
        title="Simulate Inbound Support Inquiry"
        subtitle="Tests natural language AI triage and automatic priority escalation"
        maxWidth="md"
      >
        <form onSubmit={handleCreateSimulatedInquiry} className="space-y-4 text-xs">
          <div>
            <label className="block text-content-secondary font-medium mb-1">
              Customer Message / Subject *
            </label>
            <input
              type="text"
              required
              value={newInquirySubject}
              onChange={(e) => setNewInquirySubject(e.target.value)}
              placeholder="e.g. Urgent: Payment declined, my membership course access is locked"
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-main focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-content-secondary font-medium mb-1">
              Inquiry Department
            </label>
            <select
              value={newInquiryDept}
              onChange={(e: any) => setNewInquiryDept(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-main focus:outline-none focus:border-accent"
            >
              <option value="Billing & Automation">Billing & Automation</option>
              <option value="Course Access">Course Access</option>
              <option value="Technical Integration">Technical Integration</option>
              <option value="Client Success">Client Success</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsSimulateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              Simulate Inbound Dispatch
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

