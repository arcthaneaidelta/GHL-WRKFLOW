import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Terminal,
  ArrowRight,
  Code,
  Copy,
  CheckCircle2,
  Clock,
  Layers,
  Activity,
  Send,
} from 'lucide-react';
import { initialApiRequests } from '../data/integrations';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ApiRequestItem } from '../types';

export const ApiInspectorPage: React.FC = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<ApiRequestItem[]>(initialApiRequests);
  const [selectedReq, setSelectedReq] = useState<ApiRequestItem>(initialApiRequests[0]);
  const [copied, setCopied] = useState(false);

  const handleCopyCurl = () => {
    const curl = `curl -X ${selectedReq.method} "${selectedReq.endpoint}" \\\n  -H "Authorization: Bearer [REDACTED]" \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(selectedReq.requestBody)}'`;
    navigator.clipboard.writeText(curl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
            API Request & Response Inspector
          </h2>
          <p className="text-xs text-content-secondary mt-1">
            Deep packet inspection of outbound cURL requests, auth tokens, JSON payloads, and response codes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/app/webhooks')}
            icon={<Activity className="w-4 h-4 text-accent" />}
          >
            Switch to Webhook Monitor
          </Button>
        </div>
      </div>

      {/* Main Inspector Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Request List (4 cols) */}
        <Card className="lg:col-span-4 p-0 overflow-hidden">
          <div className="p-3.5 border-b border-border bg-bg-main/60 flex items-center justify-between">
            <span className="text-xs font-semibold text-content-primary">
              Captured API Calls
            </span>
            <span className="font-mono text-[11px] text-content-muted">
              Live Stream
            </span>
          </div>

          <div className="divide-y divide-border/60">
            {requests.map((req) => {
              const isSelected = selectedReq.id === req.id;
              const isSuccess = req.status >= 200 && req.status < 300;

              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedReq(req)}
                  className={`p-3.5 transition-colors cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-accent-light/30 border-l-4 border-l-accent'
                      : 'hover:bg-bg-main/60'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        req.method === 'POST'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {req.method}
                    </span>
                    <span
                      className={`text-[11px] font-bold ${
                        isSuccess ? 'text-status-success' : 'text-status-error'
                      }`}
                    >
                      HTTP {req.status}
                    </span>
                  </div>

                  <div className="text-xs font-mono font-medium text-content-primary truncate">
                    {req.endpoint}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-content-muted">
                    <span>{req.timestamp}</span>
                    <span>{req.durationMs}ms</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right JSON Packet Inspector (8 cols) */}
        <Card className="lg:col-span-8 p-6 space-y-5 bg-sidebar-bg text-white border-sidebar-border">
          {/* Action Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-accent text-white font-mono font-bold text-xs">
                {selectedReq.method}
              </span>
              <span className="font-mono text-sm font-semibold text-white truncate">
                {selectedReq.endpoint}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`font-mono text-xs px-2 py-0.5 rounded ${
                  selectedReq.status >= 200 && selectedReq.status < 300
                    ? 'bg-status-success/20 text-status-success'
                    : 'bg-status-error/20 text-status-error'
                }`}
              >
                {selectedReq.status} {selectedReq.statusText}
              </span>
              <button
                onClick={handleCopyCurl}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'cURL'}</span>
              </button>
            </div>
          </div>

          {/* Headers Block */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono text-accent uppercase tracking-wider">
              HTTP Request Headers
            </div>
            <pre className="p-3 rounded-xl bg-black/40 border border-white/10 text-emerald-300 font-mono text-[11px] overflow-x-auto">
              {JSON.stringify(selectedReq.headers, null, 2)}
            </pre>
          </div>

          {/* Payload Block */}
          {selectedReq.requestBody && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-accent uppercase tracking-wider">
                Outbound JSON Body
              </div>
              <pre className="p-3 rounded-xl bg-black/40 border border-white/10 text-emerald-300 font-mono text-[11px] overflow-x-auto">
                {JSON.stringify(selectedReq.requestBody, null, 2)}
              </pre>
            </div>
          )}

          {/* Response Block */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono text-accent uppercase tracking-wider">
              Server Response Body ({selectedReq.durationMs}ms latency)
            </div>
            <pre
              className={`p-3 rounded-xl bg-black/40 border font-mono text-[11px] overflow-x-auto ${
                selectedReq.status >= 400
                  ? 'border-status-error/40 text-rose-300'
                  : 'border-white/10 text-emerald-300'
              }`}
            >
              {JSON.stringify(selectedReq.responseBody, null, 2)}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  );
};

