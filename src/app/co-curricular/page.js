'use client';
import React from 'react';
import PageShell from '@/components/landing/PageShell';

export default function CoCurricularPage() {
  return (
    <PageShell>
      <section className="relative flex min-h-[70svh] flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/25 via-transparent to-transparent pointer-events-none z-0" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="mb-6 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-900 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl">
            CO-CURRICULAR
          </h1>
          <p className="mx-auto text-lg leading-relaxed text-blue-200/70 md:text-xl">
            This is placeholder content for the co-curricular page. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Detailed information
            about our clubs, sports, arts, and activity programs will appear
            here soon.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
