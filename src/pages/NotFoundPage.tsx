import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-main flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center font-display font-bold text-2xl mb-4">
        404
      </div>
      <h1 className="text-2xl font-bold font-display text-content-primary">
        Page Not Found
      </h1>
      <p className="text-xs text-content-secondary max-w-sm mt-2 mb-6">
        The requested automation endpoint or subaccount view does not exist in this demonstration instance.
      </p>
      <div className="flex items-center gap-3">
        <Link to="/">
          <Button variant="outline" size="sm" icon={<Home className="w-4 h-4" />}>
            Public Site
          </Button>
        </Link>
        <Link to="/app">
          <Button variant="primary" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
            Return to Command Center
          </Button>
        </Link>
      </div>
    </div>
  );
};

