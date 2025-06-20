"use client";

import React from "react";

interface JsonLdProps {
  data: Record<string, any> | Record<string, any>[];
}

// Component to inject JSON-LD structured data into the page
export default function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
